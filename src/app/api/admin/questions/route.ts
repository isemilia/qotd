import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/utils/db';
import { RequestStatus } from '@/server/model/types';
import {
  QuestionStatus,
  questionStatuses,
} from '@/features/admin/questions/model/types';
import {
  createAdminQuestionSchema,
  editAdminQuestionSchema,
} from '@/features/admin/questions/model/schema';
import { z } from 'zod';
import { checkAdminAccess } from '@/server/utils/admin';

export const GET = async (request: NextRequest) => {
  try {
    await checkAdminAccess();

    const searchParams = request.nextUrl.searchParams;

    const status = searchParams.get('status');
    const search = searchParams.get('search')?.trim() || null;

    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const requestedPageSize = Number(searchParams.get('pageSize')) || 10;
    const pageSize = Math.min(Math.max(requestedPageSize, 1), 50);
    const offset = (page - 1) * pageSize;

    if (status && !questionStatuses.includes(status as QuestionStatus)) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Invalid question status',
        },
        { status: 400 },
      );
    }

    const filterParams = [status || null, search];

    const [questionsResult, countResult] = await Promise.all([
      db.query(
        `
          SELECT
            id,
            question,
            credit_name AS "creditName",
            date::text AS date,
            CASE
              WHEN date < (NOW() AT TIME ZONE 'UTC')::date
                THEN 'previous'
              WHEN date = (NOW() AT TIME ZONE 'UTC')::date
                THEN 'active'
              WHEN date = (NOW() AT TIME ZONE 'UTC')::date + 1
                THEN 'next'
              ELSE 'scheduled'
            END AS status
          FROM questions
          WHERE (
            $1::text IS NULL
            OR CASE
              WHEN date < (NOW() AT TIME ZONE 'UTC')::date
                THEN 'previous'
              WHEN date = (NOW() AT TIME ZONE 'UTC')::date
                THEN 'active'
              WHEN date = (NOW() AT TIME ZONE 'UTC')::date + 1
                THEN 'next'
              ELSE 'scheduled'
            END = $1
          )
          AND (
            $2::text IS NULL
            OR question ILIKE '%' || $2 || '%'
          )
          ORDER BY date DESC
          LIMIT $3
          OFFSET $4;
        `,
        [...filterParams, pageSize, offset],
      ),

      db.query<{ count: string }>(
        `
          SELECT COUNT(*) AS count
          FROM questions
          WHERE (
            $1::text IS NULL
            OR CASE
              WHEN date < (NOW() AT TIME ZONE 'UTC')::date
                THEN 'previous'
              WHEN date = (NOW() AT TIME ZONE 'UTC')::date
                THEN 'active'
              WHEN date = (NOW() AT TIME ZONE 'UTC')::date + 1
                THEN 'next'
              ELSE 'scheduled'
            END = $1
          )
          AND (
            $2::text IS NULL
            OR question ILIKE '%' || $2 || '%'
          );
        `,
        filterParams,
      ),
    ]);

    const totalRows = Number(countResult.rows[0].count);
    const totalPages = Math.ceil(totalRows / pageSize);

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched questions successfully',
      data: {
        questions: questionsResult.rows,
        pagination: {
          page,
          pageSize,
          totalRows,
          totalPages,
        },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        status: RequestStatus.ERROR,
        message: 'Something went wrong',
      },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await checkAdminAccess();

    const body = await request.json();

    const parseResult = createAdminQuestionSchema.safeParse(body);

    if (parseResult.error) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Invalid input',
          errors: z.flattenError(parseResult.error),
        },
        { status: 400 },
      );
    }

    const parsedData = parseResult.data;

    const createdQuestion = (
      await db.query(
        `
        INSERT INTO questions (question, date, credit_name)
        VALUES ($1, $2, $3)
        RETURNING id, question, date, credit_name
      `,
        [parsedData.question, parsedData.date, parsedData.creditName],
      )
    ).rows[0];

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Question created successfully',
      data: createdQuestion,
    });
  } catch (e) {
    if (
      e instanceof Error &&
      'constraint' in e &&
      e.constraint === 'questions_date_key'
    ) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Question for this date already exists',
        },
        { status: 409 },
      );
    }

    console.error(e);
    return NextResponse.json(
      {
        status: RequestStatus.ERROR,
        message: 'Something went wrong',
      },
      { status: 500 },
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    await checkAdminAccess();

    const body = await request.json();

    const parseResult = editAdminQuestionSchema.safeParse(body);

    if (parseResult.error) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Invalid input',
          errors: z.flattenError(parseResult.error),
        },
        { status: 400 },
      );
    }

    const parsedData = parseResult.data;

    // allow editing only questions after today's date
    const updatedQuestion = (
      await db.query(
        `
           UPDATE questions
           SET question = $2,
               date = $3,
               credit_name = $4
           WHERE id = $1
           AND date > (NOW() AT TIME ZONE 'UTC')::date
           RETURNING id, question, date::text as date, credit_name
         `,
        [
          parsedData.id,
          parsedData.question,
          parsedData.date,
          parsedData.creditName,
        ],
      )
    ).rows[0];

    if (!updatedQuestion) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Question not found or cannot be edited',
        },
        { status: 409 },
      );
    }

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Question updated successfully',
      data: updatedQuestion,
    });
  } catch (e) {
    if (
      e instanceof Error &&
      'constraint' in e &&
      e.constraint === 'questions_date_key'
    ) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Question for this date already exists',
        },
        { status: 409 },
      );
    }

    console.error(e);
    return NextResponse.json(
      {
        status: RequestStatus.ERROR,
        message: 'Something went wrong',
      },
      { status: 500 },
    );
  }
};
