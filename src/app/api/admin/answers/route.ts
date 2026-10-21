import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/utils/db';
import { RequestStatus } from '@/server/model/types';
import { checkAdminAccess } from '@/server/utils/admin';
import {
  answerStatuses,
  AnswerStatus,
} from '@/features/admin/answers/model/types';

export const GET = async (request: NextRequest) => {
  try {
    await checkAdminAccess();

    const searchParams = request.nextUrl.searchParams;

    const status = searchParams.get('status');
    const search = searchParams.get('search')?.trim() || null;

    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const requestedPageSize = Number(searchParams.get('pageSize')) || 10;
    const pageSize = Math.min(Math.max(requestedPageSize, 1), 50);
    const offset = (page - 1) * pageSize;

    if (status && !answerStatuses.includes(status as AnswerStatus)) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Invalid answer status',
        },
        { status: 400 },
      );
    }

    const filterParams = [status || null, search];

    const [answersResult, countResult] = await Promise.all([
      db.query(
        `
          SELECT
            a.id,
            a.answer,
            a.status,

            json_build_object(
              'reason', a.moderation_reason,
              'moderatedAt', a.moderated_at,
              'moderatedBy', a.moderated_by
            ) AS "moderation",

            a.created_at AS "createdAt",
            a.updated_at AS "updatedAt",

            json_build_object(
              'id', u.id,
              'name', u.name,
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

          WHERE (
            $1::answer_status IS NULL
            OR a.status = $1
            )
            AND (
            $2::text IS NULL
            OR a.answer ILIKE '%' || $2 || '%'
            OR q.question ILIKE '%' || $2 || '%'
            OR u.email ILIKE '%' || $2 || '%'
            )

          ORDER BY a.created_at DESC
            LIMIT $3
          OFFSET $4;
        `,
        [...filterParams, pageSize, offset],
      ),

      db.query<{ count: string }>(
        `
          SELECT COUNT(*) AS count
          FROM answers a
            JOIN users u ON u.id = a.user_id
            JOIN questions q ON q.id = a.question_id

          WHERE (
            $1::answer_status IS NULL
             OR a.status = $1
            )
            AND (
            $2::text IS NULL
             OR a.answer ILIKE '%' || $2 || '%'
             OR q.question ILIKE '%' || $2 || '%'
             OR u.email ILIKE '%' || $2 || '%'
            );
        `,
        filterParams,
      ),
    ]);

    const totalRows = Number(countResult.rows[0].count);
    const totalPages = Math.ceil(totalRows / pageSize);

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched answers successfully',
      data: {
        answers: answersResult.rows,
        pagination: {
          page,
          pageSize,
          totalRows,
          totalPages,
        },
      },
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
