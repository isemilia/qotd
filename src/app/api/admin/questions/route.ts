import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/utils/db';
import { RequestStatus } from '@/server/model/types';
import {
  QuestionStatus,
  questionStatuses,
} from '@/features/admin/questions/model/types';
import { getSession } from '@/server/utils/session';
import { staffRoles } from '@/features/auth/model/types';

export const GET = async (request: NextRequest) => {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { status: RequestStatus.ERROR, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    if (!staffRoles.includes(session.user_role)) {
      return NextResponse.json(
        { status: RequestStatus.ERROR, message: 'Forbidden' },
        { status: 403 },
      );
    }

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
          ORDER BY date ASC
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
