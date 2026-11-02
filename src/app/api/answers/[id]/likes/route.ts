import { RequestStatus } from '@/server/model/types';
import { db } from '@/server/utils/db';
import { getCurrentUser } from '@/server/utils/session';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    const answerId = (await params).id;
    const userId = user.id;

    const existingLike = (
      await db.query(
        `SELECT 1 FROM answer_likes 
        WHERE answer_id = $1 AND user_id = $2`,
        [answerId, userId],
      )
    ).rows[0];

    if (existingLike) {
      await db.query(
        `DELETE FROM answer_likes 
        WHERE answer_id = $1 AND user_id = $2`,
        [answerId, userId],
      );

      return NextResponse.json({
        status: RequestStatus.SUCCESS,
        message: 'Removed like successfully',
      });
    } else {
      await db.query(
        `INSERT INTO answer_likes (answer_id, user_id) 
        VALUES ($1, $2)`,
        [answerId, userId],
      );

      return NextResponse.json({
        status: RequestStatus.SUCCESS,
        message: 'Answer liked successfully',
      });
    }
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
