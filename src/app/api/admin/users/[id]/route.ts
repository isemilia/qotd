import { adminUpdateUserBody } from '@/features/admin/users/model/schema';
import { RequestStatus } from '@/server/model/types';
import { checkAdminAccess } from '@/server/utils/admin';
import { db } from '@/server/utils/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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
            u.last_login_at AS "lastLoginAt",
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

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const accessError = await checkAdminAccess({ adminOnly: true });
    if (accessError) return accessError;

    const body = await request.json();

    const parseResult = adminUpdateUserBody.safeParse(body);

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
    const userId = (await params).id;

    const result = await db.transaction(async (client) => {
      const updates: string[] = [];
      const values: unknown[] = [];

      if (parsedData.role !== undefined) {
        values.push(parsedData.role);
        updates.push(`role = $${values.length}`);
      }

      if (parsedData.status !== undefined) {
        values.push(parsedData.status);
        updates.push(`status = $${values.length}`);
      }

      values.push(userId);

      const userResult = await client.query(
        `
          UPDATE users
          SET ${updates.join(', ')}
          WHERE id = $${values.length}
          RETURNING id, name, email, role, status
        `,
        values,
      );

      if (userResult.rowCount === 0) {
        throw new Error('USER_NOT_FOUND');
      }

      await client.query('DELETE FROM sessions WHERE user_id = $1', [userId]);

      return userResult.rows[0];
    });

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Updated user successfully',
      data: result,
    });
  } catch (e) {
    if (e instanceof Error && e.message === 'USER_NOT_FOUND') {
      return NextResponse.json(
        { status: RequestStatus.ERROR, message: 'User not found' },
        { status: 404 },
      );
    }

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
