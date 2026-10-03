import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { getPreviousQuestions } from '@/server/utils/questions';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;

    const page = Math.max(1, Number(searchParams.get('page')) || 1);

    const requestedPageSize = Number(searchParams.get('pageSize')) || 9;
    const pageSize = Math.min(Math.max(requestedPageSize, 1), 50);

    const { questions, pagination } = await getPreviousQuestions({
      page,
      pageSize,
    });

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched previous questions successfully',
      data: {
        questions,
        pagination,
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
