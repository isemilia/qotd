import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { checkAdminAccess } from '@/server/utils/admin';
import { db } from '@/server/utils/db';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await checkAdminAccess();

    const questionId = (await params).id;

    const question = (
      await db.query(
        `
          SELECT
            id,
            question,
            credit_name AS "creditName",
            date::text AS date,
            CASE
              WHEN date < (NOW() AT TIME ZONE 'UTC')::date
                THEN 'previous'
              WHEN date = (NOW() AT TIME ZONE 'UTC')::date
                THEN 'active'
              WHEN date = (NOW() AT TIME ZONE 'UTC')::date + 1
                THEN 'next'
              ELSE 'scheduled'
            END AS status
          FROM questions
          WHERE id = $1
        `,
        [questionId],
      )
    ).rows[0];

    if (!question) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Question not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched question successfully',
      data: question,
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
