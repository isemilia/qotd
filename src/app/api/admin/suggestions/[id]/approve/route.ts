import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/server/utils/db';
import { RequestStatus } from '@/server/model/types';
import { checkAdminAccess } from '@/server/utils/admin';
import { approveSuggestionSchema } from '@/features/admin/suggestions/model/schema';

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const accessError = await checkAdminAccess();
    if (accessError) return accessError;

    const { id: suggestionId } = await params;
    const body = await request.json();

    const parseResult = approveSuggestionSchema.safeParse(body);

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

    const data = await db.transaction(async (client) => {
      const suggestionResult = await client.query(
        `
          SELECT id
          FROM question_suggestions
          WHERE id = $1
            AND status = 'pending'
            FOR UPDATE;
        `,
        [suggestionId],
      );

      if (suggestionResult.rowCount === 0) {
        throw new Error('SUGGESTION_NOT_PENDING');
      }

      const createdQuestion = (
        await client.query(
          `
            INSERT INTO questions (question, date, credit_name)
            VALUES ($1, $2, $3)
            RETURNING
              id,
              question,
              date::text AS date,
              credit_name AS "creditName";
          `,
          [
            parsedData.suggestedQuestion,
            parsedData.date,
            parsedData.creditName,
          ],
        )
      ).rows[0];

      const updatedSuggestion = (
        await client.query(
          `
            UPDATE question_suggestions
            SET question_id = $1,
                status = 'approved'
            WHERE id = $2
            AND status = 'pending'
            RETURNING *;
          `,
          [createdQuestion.id, suggestionId],
        )
      ).rows[0];

      if (!updatedSuggestion) {
        throw new Error('SUGGESTION_NOT_PENDING');
      }

      return {
        suggestion: updatedSuggestion,
        scheduledQuestion: createdQuestion,
      };
    });

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Suggestion approved successfully',
      data,
    });
  } catch (e) {
    if (
      e instanceof Error &&
      'constraint' in e &&
      e.constraint === 'questions_date_key'
    ) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Question for this date already exists',
        },
        { status: 409 },
      );
    }

    if (e instanceof Error && e.message === 'SUGGESTION_NOT_PENDING') {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Suggestion not found or already reviewed',
        },
        { status: 409 },
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
