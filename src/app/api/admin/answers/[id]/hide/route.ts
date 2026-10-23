import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { checkAdminAccess } from '@/server/utils/admin';
import { z } from 'zod';
import { hideAnswerSchema } from '@/features/admin/answers/model/schema';
import { getSession } from '@/server/utils/session';
import { db } from '@/server/utils/db';

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await checkAdminAccess();

    const answerId = (await params).id;

    const body = await request.json();
    const parseResult = hideAnswerSchema.safeParse(body);

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
    const session = (await getSession())!;

    await db.query(
      `
      UPDATE answers
      SET
        status = 'hidden',
        moderation_reason = $1,
        moderated_by = $2,
        moderated_at = NOW()
      WHERE id = $3;
    `,
      [parsedData.reason, session.user_id, answerId],
    );

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Answer hidden successfully',
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
