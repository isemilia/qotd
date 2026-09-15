import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { db } from '@/server/utils/db';

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
            a.created_at as "createdAt"
          FROM answers a
          LEFT JOIN questions q ON a.question_id = q.id
          ${where.clause}
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
