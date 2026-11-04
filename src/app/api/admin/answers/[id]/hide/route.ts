import { hideAnswerSchema } from '@/features/admin/answers/model/schema';
import { RequestStatus } from '@/server/model/types';
import { checkStaffAccess } from '@/server/utils/admin';
import { db } from '@/server/utils/db';
import { getSession } from '@/server/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const accessError = await checkStaffAccess();
    if (accessError) return accessError;

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
