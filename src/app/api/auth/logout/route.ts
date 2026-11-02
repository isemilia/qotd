import { RequestStatus } from '@/server/model/types';
import { removeSession } from '@/server/utils/session';
import { NextResponse } from 'next/server';

export const POST = async () => {
  try {
    await removeSession();

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Logged out successfully',
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
