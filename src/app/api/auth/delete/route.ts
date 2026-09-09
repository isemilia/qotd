import { NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { cookies } from 'next/headers';
import {
  COOKIE_SESSION_KEY,
  deleteAllSessionsByUserId,
} from '@/server/utils/session';
import { db } from '@/server/utils/db';

export const POST = async () => {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_SESSION_KEY)?.value;

    if (!sessionId) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    // get current session
    const sessionRes = await db.query(`SELECT * FROM sessions WHERE id = $1`, [
      sessionId,
    ]);
    const session = sessionRes.rows[0] as unknown as
      { user_id: string } | undefined;

    if (!session) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Unauthorized',
        },
        { status: 401 },
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
