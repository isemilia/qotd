import { signUpSchema } from '@/features/auth/model/schemas';
import { UserRole } from '@/features/auth/model/types';
import { RequestStatus } from '@/server/model/types';
import { db } from '@/server/utils/db';
import { generateSalt, hashPassword } from '@/server/utils/password';
import { createSession } from '@/server/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const parseResult = signUpSchema.safeParse(body);

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

    const salt = generateSalt();
    const hashedPassword = await hashPassword(parsedData.password, salt);

    const createdUser = await db.query<{
      id: string;
      role: UserRole;
    }>(
      `
      INSERT INTO users (name, email, password, salt, terms_and_guidelines_accepted) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role`,
      [
        parsedData.name,
        parsedData.email,
        hashedPassword,
        salt,
        parsedData.termsAndGuidelinesAccepted,
      ],
    );

    const user = createdUser.rows[0];

    await createSession({ id: user.id, role: user.role });

    await db.query(
      `
      UPDATE users
      SET last_login_at = NOW()
      WHERE id = $1
    `,
      [user.id],
    );

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Account created successfully',
      data: user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: RequestStatus.ERROR,
        message: 'Unable to create account',
      },
      { status: 500 },
    );
  }
};
