import { RequestStatus } from '@/server/model/types';
import { checkAdminAccess } from '@/server/utils/admin';
import { db } from '@/server/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const accessError = await checkAdminAccess();
    if (accessError) return accessError;

    const userId = (await params).id;

    const user = (
      await db.query(
        `
          SELECT
            u.id,
            u.name,
            u.email,
            u.role,
            u.status,
            u.terms_and_guidelines_accepted AS "termsAndGuidelinesAccepted",
            u.created_at AS "createdAt",

            (
              SELECT COUNT(*)::int
              FROM answers a
              WHERE a.user_id = u.id
            ) AS "totalAnswers",

            (
              SELECT COUNT(*)::int
              FROM answers a
              WHERE a.user_id = u.id
                AND a.status = 'hidden'
            ) AS "hiddenAnswers",

            (
              SELECT COUNT(*)::int
              FROM question_suggestions qs
              WHERE qs.user_id = u.id
            ) AS "suggestedQuestions",

            (
              SELECT MAX(a.created_at)
              FROM answers a
              WHERE a.user_id = u.id
            ) AS "lastAnswerAt",

            (
              SELECT MAX(qs.created_at)
              FROM question_suggestions qs
              WHERE qs.user_id = u.id
            ) AS "lastSuggestionAt"

          FROM users u
          WHERE u.id = $1
        `,
        [userId],
      )
    ).rows[0];

    if (!user) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'User not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched user successfully',
      data: user,
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
