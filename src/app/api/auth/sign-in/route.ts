import { NextRequest, NextResponse } from 'next/server';
import { signInSchema } from '@/features/auth/model/schemas';
import { RequestStatus } from '@/server/model/types';
import { z } from 'zod';
import { db } from '@/server/utils/db';
import { comparePasswords } from '@/server/utils/password';
import { createSession } from '@/server/utils/session';

const invalidCredentialsResponse = () => {
  return NextResponse.json(
    {
      status: RequestStatus.ERROR,
      message: 'Invalid email or password',
    },
    { status: 401 },
  );
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const parseResult = signInSchema.safeParse(body);

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

    const parsedData = parseResult.data;

    const user = (
      await db.query(`SELECT * FROM users WHERE email = $1`, [parsedData.email])
    ).rows[0] as unknown as {
      salt: string;
      password: string;
      id: string;
      role: string;
    } | null;

    if (!user) {
      return invalidCredentialsResponse();
    }

    const isCorrectPassword = await comparePasswords({
      password: parsedData.password,
      salt: user.salt,
      hashedPassword: user.password,
    });

    if (!isCorrectPassword) {
      return invalidCredentialsResponse();
    }

    await createSession(user);

    const { password, salt, ...safeUser } = user;

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Signed in successfully',
      data: safeUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: RequestStatus.ERROR,
        message: 'Unable to sign in',
      },
      { status: 500 },
    );
  }
};
