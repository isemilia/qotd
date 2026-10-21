import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAccess } from '@/server/utils/admin';
import { db } from '@/server/utils/db';
import { RequestStatus } from '@/server/model/types';

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await checkAdminAccess();

    const answerId = (await params).id;

    const answer = (
      await db.query(
        `
          SELECT
            a.id,
            a.answer,
            a.color,
            a.status,
            a.moderation_reason AS "moderationReason",
            a.moderated_at AS "moderatedAt",
            a.created_at AS "createdAt",
            a.updated_at AS "updatedAt",

            CASE
              WHEN moderator.id IS NOT NULL THEN json_build_object(
                'id', moderator.id,
                'email', moderator.email,
                'role', moderator.role,
                'status', moderator.status,
                'createdAt', moderator.created_at
                                                 )
              ELSE NULL
              END AS "moderatedBy",

            json_build_object(
              'id', u.id,
              'email', u.email,
              'role', u.role,
              'status', u.status,
              'createdAt', u.created_at
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
