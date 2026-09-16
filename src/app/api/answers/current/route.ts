import { NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { db } from '@/server/utils/db';
import { getCurrentQuestion } from '@/server/utils/questions';

export const GET = async () => {
  try {
    const currentQuestion = await getCurrentQuestion();

    if (!currentQuestion) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: "There's no question for today",
        },
        { status: 404 },
      );
    }

    const answers = (
      await db.query<{
        id: string;
        question: {
          id: string;
          question: string;
          date: string;
        };
        answer: string;
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
        WHERE question_id = $1
        GROUP BY
          a.id,
          a.answer,
          q.id,
          q.question,
          q.date,
          a.created_at;
        `,
        [currentQuestion.id],
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
