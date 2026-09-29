import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { getCurrentUser } from '@/server/utils/session';
import { suggestQuestionSchema } from '@/features/question-suggestions/model/schemas';
import { z } from 'zod';
import { db } from '@/server/utils/db';
import { UserRole } from '@/features/auth/model/types';

export const GET = async () => {
  try {
    const user = await getCurrentUser();

    const allowedRoles = [UserRole.ADMIN, UserRole.MODERATOR];
    if (!user || !allowedRoles.includes(user.role)) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    const questions = (
      await db.query(`
      SELECT
        id,
        user_id AS "userId",
        question_id AS "questionId",
        credit_name AS "creditName",
        question,
        status,
        created_at AS "createdAt"
      FROM question_suggestions;
    `)
    ).rows;

    return NextResponse.json(
      {
        status: RequestStatus.SUCCESS,
        message: 'Fetched question suggestions successfully',
        data: questions,
      },
      { status: 201 },
    );
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
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const parseResult = suggestQuestionSchema.safeParse(body);

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
      INSERT INTO question_suggestions (
        user_id,
        question,
        credit_name
      )
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
        [user.id, parsedData.question, parsedData.creditName],
      )
    ).rows[0];

    return NextResponse.json(
      {
        status: RequestStatus.SUCCESS,
        message: 'Question suggestion submitted successfully',
        data: createdQuestion,
      },
      { status: 201 },
    );
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
