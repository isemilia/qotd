import { NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
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

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched current question successfully',
      data: currentQuestion,
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
