import { NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { getCurrentAnswers } from '@/server/utils/answers';

export const GET = async () => {
  try {
    const answers = await getCurrentAnswers();

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched answers successfully',
      data: answers,
    });
  } catch (e) {
    console.error(e);

    if (e instanceof Error && e.message === 'NO_CURRENT_QUESTION') {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: "There's no question for today",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: RequestStatus.ERROR,
        message: 'Something went wrong',
      },
      { status: 500 },
    );
  }
};
