import { NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { db } from '@/server/utils/db';
import { getCurrentQuestion } from '@/server/utils/get-current-question';

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
        questionId: string;
        answer: string;
        createdAt: string;
      }>(
        `
      SELECT 
        id, 
        question_id as "questionId",
        answer,
        created_at as "createdAt"
      FROM answers
      WHERE question_id = $1
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
