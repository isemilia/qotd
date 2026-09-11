import { NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { getCurrentUser } from '@/server/utils/session';

export const GET = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched current user successfully',
      data: user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Something went wrong',
      },
      { status: 500 },
    );
  }
};
