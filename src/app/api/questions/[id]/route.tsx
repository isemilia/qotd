import { RequestStatus } from '@/server/model/types';
import { getQuestionById } from '@/server/utils/questions';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const questionId = (await params).id;

    const question = await getQuestionById(questionId);

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched question successfully',
      data: question,
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
