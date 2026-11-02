import { RequestStatus } from '@/server/model/types';
import { checkAdminAccess } from '@/server/utils/admin';
import { db } from '@/server/utils/db';
import { getSession } from '@/server/utils/session';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const accessError = await checkAdminAccess();
    if (accessError) return accessError;

    const answerId = (await params).id;

    const session = (await getSession())!;

    await db.query(
      `
      UPDATE answers
      SET
        status = 'published',
        moderated_by = $1,
        moderated_at = NOW()
      WHERE id = $2;
    `,
      [session.user_id, answerId],
    );

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Answer restored successfully',
    });
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
