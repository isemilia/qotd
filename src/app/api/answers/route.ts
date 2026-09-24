import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { db } from '@/server/utils/db';
import { isExpiredQuestion } from '@/server/utils/questions';
import { postAnswerBodySchema } from '@/features/answers/model/schemas';
import { z } from 'zod';
import { getCurrentUser } from '@/server/utils/session';
import { AnswerCardColor } from '@/features/answers/components/answer-card';

const buildWhereClause = (params: URLSearchParams) => {
  const questionId = params.get('questionId');
  const userId = params.get('userId');

  const values: string[] = [];
  const conditions: string[] = [];

  if (questionId) {
    values.push(questionId);
    conditions.push(`a.question_id = $${values.length}`);
  }

  if (userId) {
    values.push(userId);
    conditions.push(`a.user_id = $${values.length}`);
  }

  return {
    values,
    clause: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '',
  };
};

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const where = buildWhereClause(searchParams);

    const answers = (
      await db.query<{
        id: string;
        answer: string;
        question: {
          id: string;
          question: string;
          date: string;
        };
        createdAt: string;
        likeCount: number;
      }>(
        `
          SELECT
            a.id,
            a.answer,
            json_build_object(
              'id', q.id,
              'question', q.question,
              'date', q.date
            ) AS question,
            a.created_at as "createdAt",
            COUNT(l.answer_id) as "likeCount"
          FROM answers a
          LEFT JOIN questions q ON a.question_id = q.id
          LEFT JOIN answer_likes l ON a.id = l.answer_id
          ${where.clause}
          GROUP BY
            a.id,
            a.answer,
            q.id,
            q.question,
            q.date,
            a.created_at
          ORDER BY a.created_at DESC
    `,
        where.values,
      )
    ).rows;

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched answers successfully',
      data: answers,
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
    const parseResult = postAnswerBodySchema.safeParse(body);

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

    const isExpired = await isExpiredQuestion(parsedData.questionId);

    if (isExpired === null) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Question not found',
        },
        { status: 404 },
      );
    }

    if (isExpired) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Question has expired',
        },
        { status: 400 },
      );
    }

    // if all checks passed, create answer
    const createdAnswer = (
      await db.query<{ id: string; answer: string; color: AnswerCardColor }>(
        `
      INSERT INTO answers (user_id, question_id, answer, color) 
      VALUES ($1, $2, $3, $4)
      RETURNING id, answer, color
    `,
        [user.id, parsedData.questionId, parsedData.answer, parsedData.color],
      )
    ).rows[0];

    return NextResponse.json(
      {
        status: RequestStatus.SUCCESS,
        message: 'Answer submitted successfully',
        data: createdAnswer,
      },
      { status: 201 },
    );
  } catch (e) {
    if (
      e instanceof Error &&
      'constraint' in e &&
      e.constraint === 'answers_question_id_user_id_key'
    ) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'You have already answered this question',
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
