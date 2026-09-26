import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { getCurrentUser } from '@/server/utils/session';
import { changePersonalDetails } from '@/server/utils/account';
import { changePersonalDetailsSchema } from '@/features/auth/model/schemas';
import { z } from 'zod';

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

export const PATCH = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const parseResult = changePersonalDetailsSchema.safeParse(body);

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

    const changedUser = await changePersonalDetails({
      name: parseResult.data.name,
    });

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Modified user details successfully',
      data: changedUser,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Something went wrong',
      },
      { status: 500 },
    );
  }
};
