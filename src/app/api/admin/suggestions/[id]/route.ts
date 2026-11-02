import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { checkAdminAccess } from '@/server/utils/admin';
import { db } from '@/server/utils/db';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const accessError = await checkAdminAccess();
    if (accessError) return accessError;

    const suggestionId = (await params).id;

    const suggestion = (
      await db.query(
        `
          SELECT
            qs.id,
            qs.user_id AS "userId",
            qs.credit_name AS "creditName",
            qs.question AS "suggestedQuestion",
            qs.status,
            qs.reason,
            qs.created_at AS "createdAt",
            CASE
              WHEN q.id IS NOT NULL THEN
                json_build_object(
                  'id', q.id,
                  'question', q.question,
                  'date', q.date::text
                )
              ELSE NULL
              END AS "scheduledQuestion"
          FROM question_suggestions qs
                 LEFT JOIN questions q
                           ON q.id = qs.question_id
          WHERE qs.id = $1;
        `,
        [suggestionId],
      )
    ).rows[0];

    if (!suggestion) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Suggestion not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched suggestion successfully',
      data: suggestion,
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
