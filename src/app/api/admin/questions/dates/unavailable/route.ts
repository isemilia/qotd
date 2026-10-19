import { NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { db } from '@/server/utils/db';
import { checkAdminAccess } from '@/server/utils/admin';

export const GET = async () => {
  try {
    await checkAdminAccess();

    const result = await db.query<{ date: string }>(
      `
      SELECT 
        date::text as date
      FROM questions
      WHERE date > (NOW() AT TIME ZONE 'UTC')::date
      ORDER BY date ASC
    `,
    );

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched unavailable dates successfully',
      data: result.rows.map((row) => row.date),
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
