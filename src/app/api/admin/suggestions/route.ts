import { checkAdminAccess } from '@/server/utils/admin';
import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { db } from '@/server/utils/db';

const suggestionStatuses = ['pending', 'approved', 'rejected'] as const;

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

    if (
      status &&
      !suggestionStatuses.includes(
        status as (typeof suggestionStatuses)[number],
      )
    ) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Invalid suggestion status',
        },
        { status: 400 },
      );
    }

    const filterParams = [status || null, search];

    const [suggestionsResult, countResult] = await Promise.all([
      db.query(
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
              END AS scheduledQuestion
          FROM question_suggestions qs
                 LEFT JOIN questions q
                           ON q.id = qs.question_id
          WHERE (
            $1::text IS NULL
            OR qs.status::text = $1
            )
            AND (
            $2::text IS NULL
            OR qs.question ILIKE '%' || $2 || '%'
            )
          ORDER BY qs.created_at DESC
            LIMIT $3
          OFFSET $4;
        `,
        [...filterParams, pageSize, offset],
      ),

      db.query<{ count: string }>(
        `
          SELECT COUNT(*) AS count
          FROM question_suggestions qs
          WHERE (
            $1::text IS NULL
             OR qs.status::text = $1
            )
            AND (
            $2::text IS NULL
             OR qs.question ILIKE '%' || $2 || '%'
            );
        `,
        filterParams,
      ),
    ]);

    const totalRows = Number(countResult.rows[0].count);
    const totalPages = Math.ceil(totalRows / pageSize);

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched suggestions successfully',
      data: {
        suggestions: suggestionsResult.rows,
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
