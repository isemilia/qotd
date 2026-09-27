import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { deleteAllSessionsByUserId, getSession } from '@/server/utils/session';
import { db } from '@/server/utils/db';
import { accountDeletionSchema } from '@/features/auth/model/schemas';
import { z } from 'zod';

export const POST = async (request: NextRequest) => {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const parseResult = accountDeletionSchema.safeParse(body);

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

    if (parseResult.data?.reason) {
      await db.query(
        `
        INSERT INTO account_deletion_reasons (user_id, reason)
        VALUES ($1, $2);
      `,
        [session.user_id, parseResult.data.reason],
      );
    }

    // anonymize user from current session and change status to deleted
    const userRes = await db.query(
      `
      UPDATE users
      SET
        status = 'deleted',
        name = '[DELETED]',
        email = NULL,
        password = NULL,
        salt = NULL
      WHERE id = $1
      RETURNING *;
    `,
      [session.user_id],
    );
    const deletedUser = userRes.rows[0];

    // delete all existing sessions and cookie from current browser
    await deleteAllSessionsByUserId(session.user_id);

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Account deleted successfully',
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: RequestStatus.ERROR,
        message: 'Unable to delete account',
      },
      { status: 500 },
    );
  }
};
