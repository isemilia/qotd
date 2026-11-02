import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAccess } from '@/server/utils/admin';
import { db } from '@/server/utils/db';
import { RequestStatus } from '@/server/model/types';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const accessError = await checkAdminAccess();
    if (accessError) return accessError;

    const answerId = (await params).id;

    const answer = (
      await db.query(
        `
          SELECT
            a.id,
            a.answer,
            a.color,
            a.status,
            a.created_at AS "createdAt",
            a.updated_at AS "updatedAt",

            json_build_object(
              'reason', a.moderation_reason,
              'moderatedAt', a.moderated_at,
              'moderatedBy', CASE
              WHEN moderator.id IS NOT NULL THEN json_build_object(
               'id', moderator.id,
               'name', moderator.name,
               'email', moderator.email,
               'role', moderator.role,
               'status', moderator.status,
               'createdAt', moderator.created_at)
              ELSE NULL
              END
            ) AS moderation,

            json_build_object(
              'id', u.id,
              'name', u.name,
              'email', u.email,
              'role', u.role,
              'status', u.status,
              'createdAt', u.created_at,
              'totalAnswers', (
                SELECT COUNT(*)::int
                FROM answers ua
                WHERE ua.user_id = u.id
              ),
              'hiddenAnswers', (
                SELECT COUNT(*)::int
                FROM answers ua
                WHERE ua.user_id = u.id
                  AND ua.status = 'hidden'
              )
            ) AS "user",

            json_build_object(
              'id', q.id,
              'question', q.question,
              'date', q.date::text,
              'creditName', q.credit_name
            ) AS "question"
          FROM answers a
            JOIN users u ON u.id = a.user_id
            JOIN questions q ON q.id = a.question_id
            LEFT JOIN users moderator ON moderator.id = a.moderated_by
          WHERE a.id = $1
        `,
        [answerId],
      )
    ).rows[0];

    if (!answer) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Answer not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched answer successfully',
      data: answer,
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
