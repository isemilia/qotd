import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { changePasswordSchema } from '@/features/auth/model/schemas';
import z from 'zod';
import {
  createSession,
  deleteAllSessionsByUserId,
  getSession,
} from '@/server/utils/session';
import { db } from '@/server/utils/db';
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from '@/server/utils/password';

export const PATCH = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const parseResult = changePasswordSchema.safeParse(body);

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

    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    const user = (
      await db.query<{
        salt: string;
        password: string;
        role: string;
        id: string;
      }>(`SELECT salt, password, id, role FROM users WHERE id = $1`, [
        session.user_id,
      ])
    ).rows[0];

    const submittedCurrentPassword = parsedData.currentPassword;
    const newPassword = parsedData.newPassword;

    // compare submitted current password to already saved current password
    const isCorrectCurrentPassword = await comparePasswords({
      password: submittedCurrentPassword,
      salt: user.salt,
      hashedPassword: user.password,
    });

    if (!isCorrectCurrentPassword) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Invalid current password',
        },
        { status: 401 },
      );
    }

    const newSalt = generateSalt();
    const hashedNewPassword = await hashPassword(newPassword, newSalt);

    const changedUser = (
      await db.query(
        `
      UPDATE users
      SET
        password = $1,
        salt = $2
      WHERE id = $3
      RETURNING id, name;
    `,
        [hashedNewPassword, newSalt, user.id],
      )
    ).rows[0];

    await deleteAllSessionsByUserId(user.id);

    await createSession({ id: user.id, role: user.role });

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Password changed successfully',
      data: changedUser,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        status: RequestStatus.ERROR,
        message: 'Unable to change password',
      },
      { status: 500 },
    );
  }
};
