import { NextRequest, NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { db } from '@/server/utils/db';
import { isExpiredQuestion } from '@/server/utils/questions';
import { postAnswerBodySchema } from '@/features/answers/model/schemas';
import { z } from 'zod';
import { getCurrentUser } from '@/server/utils/session';
import { AnswerCardColor } from '@/features/answers/components/answer-card';
import { getAnswers } from '@/server/utils/answers';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;

    const questionId = searchParams.get('questionId');
    const userId = searchParams.get('userId');
    const page = searchParams.get('page');

    const { answers, pagination } = await getAnswers({
      questionId,
      userId,
      page: page ? +page : null,
      pageSize: 9,
    });

    return NextResponse.json({
      status: RequestStatus.SUCCESS,
      message: 'Fetched answers successfully',
      data: { answers, pagination },
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

export const POST = async (request: NextRequest) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    const body = await request.json();
    const parseResult = postAnswerBodySchema.safeParse(body);

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

    const isExpired = await isExpiredQuestion(parsedData.questionId);

    if (isExpired === null) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Question not found',
        },
        { status: 404 },
      );
    }

    if (isExpired) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'Question has expired',
        },
        { status: 400 },
      );
    }

    // if all checks passed, create answer
    const createdAnswer = (
      await db.query<{ id: string; answer: string; color: AnswerCardColor }>(
        `
      INSERT INTO answers (user_id, question_id, answer, color) 
      VALUES ($1, $2, $3, $4)
      RETURNING id, answer, color
    `,
        [user.id, parsedData.questionId, parsedData.answer, parsedData.color],
      )
    ).rows[0];

    return NextResponse.json(
      {
        status: RequestStatus.SUCCESS,
        message: 'Answer submitted successfully',
        data: createdAnswer,
      },
      { status: 201 },
    );
  } catch (e) {
    if (
      e instanceof Error &&
      'constraint' in e &&
      e.constraint === 'answers_question_id_user_id_key'
    ) {
      return NextResponse.json(
        {
          status: RequestStatus.ERROR,
          message: 'You have already answered this question',
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
