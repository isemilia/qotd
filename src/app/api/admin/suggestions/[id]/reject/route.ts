import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/server/utils/db';
import { RequestStatus } from '@/server/model/types';
import { checkAdminAccess } from '@/server/utils/admin';
import { rejectSuggestionSchema } from '@/features/admin/suggestions/model/schema';

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const accessError = await checkAdminAccess();
    if (accessError) return accessError;

    const { id: suggestionId } = await params;
    const body = await request.json();

    const parseResult = rejectSuggestionSchema.safeParse(body);

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

    const rejectedSuggestion = (
      await db.query(
        `
          UPDATE question_suggestions
          SET status = 'rejected',
              reason = $2
          WHERE id = $1
          AND status = 'pending'
          RETURNING 
            id,
            user_id AS "userId",
            credit_name AS "creditName",
            question,
            status,
            reason,
            created_at AS "createdAt";
        `,
        [suggestionId, parsedData.reason],
      )
    ).rows[0];

    if (!rejectedSuggestion) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Suggestion not found or already reviewed',
        },
        { status: 409 },
      );
    }

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Suggestion rejected successfully',
      data: rejectedSuggestion,
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
