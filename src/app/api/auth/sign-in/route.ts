import { UserStatus } from '@/features/admin/users/model/types';
import { signInSchema } from '@/features/auth/model/schemas';
import { UserRole } from '@/features/auth/model/types';
import { RequestStatus } from '@/server/model/types';
import { db } from '@/server/utils/db';
import { comparePasswords } from '@/server/utils/password';
import { createSession } from '@/server/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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
      await db.query<{
        salt: string;
        password: string;
        id: string;
        role: UserRole;
        status: UserStatus;
      }>(
        `SELECT 
          id, 
          password, 
          salt, 
          role, 
          status 
        FROM users 
        WHERE email = $1`,
        [parsedData.email],
      )
    ).rows[0];

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

    if (user.status !== 'active') {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message:
            user.status === 'suspended'
              ? 'Your account has been suspended. Please contact support if you believe this is a mistake'
              : 'Your account is not active',
        },
        { status: 403 },
      );
    }

    await db.query(
      `
      UPDATE users
      SET last_login_at = NOW()
      WHERE id = $1
    `,
      [user.id],
    );

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
