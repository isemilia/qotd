import { userStatuses } from '@/features/admin/users/model/types';
import { RequestStatus } from '@/server/model/types';
import { checkAdminAccess } from '@/server/utils/admin';
import { db } from '@/server/utils/db';
import { NextRequest, NextResponse } from 'next/server';

const userRoles = ['user', 'moderator', 'admin'] as const;

export const GET = async (request: NextRequest) => {
  try {
    const accessError = await checkAdminAccess();
    if (accessError) return accessError;

    const searchParams = request.nextUrl.searchParams;

    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.trim() || null;

    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const requestedPageSize = Number(searchParams.get('pageSize')) || 10;
    const pageSize = Math.min(Math.max(requestedPageSize, 1), 50);
    const offset = (page - 1) * pageSize;

    if (role && !userRoles.includes(role as (typeof userRoles)[number])) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Invalid user role',
        },
        { status: 400 },
      );
    }

    if (
      status &&
      !userStatuses.includes(status as (typeof userStatuses)[number])
    ) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Invalid user status',
        },
        { status: 400 },
      );
    }

    const filterParams = [role || null, status || null, search];

    const [usersResult, countResult] = await Promise.all([
      db.query(
        `
          SELECT
            u.id,
            u.name,
            u.email,
            u.role,
            u.status,
            u.terms_and_guidelines_accepted AS "termsAndGuidelinesAccepted",
            u.last_login_at AS "lastLoginAt",
            u.created_at AS "createdAt"
          FROM users u
          WHERE (
            $1::text IS NULL
            OR u.role::text = $1
          )
            AND (
            $2::text IS NULL
            OR u.status::text = $2
          )
            AND (
            $3::text IS NULL
            OR u.name ILIKE '%' || $3 || '%'
            OR u.email ILIKE '%' || $3 || '%'
          )
          ORDER BY u.created_at DESC, u.id DESC
          LIMIT $4
          OFFSET $5;
        `,
        [...filterParams, pageSize, offset],
      ),

      db.query<{ count: string }>(
        `
          SELECT COUNT(*) AS count
          FROM users u
          WHERE (
            $1::text IS NULL
            OR u.role::text = $1
          )
            AND (
            $2::text IS NULL
            OR u.status::text = $2
          )
            AND (
            $3::text IS NULL
            OR u.name ILIKE '%' || $3 || '%'
            OR u.email ILIKE '%' || $3 || '%'
          );
        `,
        filterParams,
      ),
    ]);

    const totalRows = Number(countResult.rows[0].count);
    const totalPages = Math.ceil(totalRows / pageSize);

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched users successfully',
      data: {
        users: usersResult.rows,
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
