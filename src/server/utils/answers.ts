import { db } from '@/server/utils/db';
import { Answer, AnswerExtended, PaginationConfig } from '@/server/model/types';
import { getCurrentQuestion } from '@/server/utils/questions';
import { getCurrentUser } from '@/server/utils/session';
import { AnswerStatus } from '@/features/admin/answers/model/types';

export const getCurrentAnswers = async ({
  page: _page,
  pageSize: _pageSize,
  status = 'published',
}: PaginationConfig & {
  status?: AnswerStatus;
} = {}) => {
  const currentQuestion = await getCurrentQuestion();

  if (!currentQuestion) {
    throw new Error('NO_CURRENT_QUESTION');
  }

  const page = Math.max(1, Number(_page || 1));

  const requestedPageSize = Number(_pageSize || 9);
  const pageSize = Math.min(Math.max(requestedPageSize, 1), 50);

  const offset = (page - 1) * pageSize;

  const currentUser = await getCurrentUser();

  const [answersResult, countResult] = await Promise.all([
    db.query<Answer>(
      `
        SELECT
          a.id,
          a.answer,
          json_build_object(
            'id', q.id,
            'question', q.question,
            'date', q.date
          ) AS question,
          a.color,
          a.created_at AS "createdAt",
          COUNT(l.answer_id)::int AS "likeCount",
          EXISTS (
            SELECT 1
            FROM answer_likes al
            WHERE al.answer_id = a.id
              AND al.user_id = $2
          ) AS "isLiked"
        FROM answers a
          LEFT JOIN questions q ON a.question_id = q.id
          LEFT JOIN answer_likes l ON a.id = l.answer_id
        WHERE a.question_id = $1
          AND a.status = $5
        GROUP BY
          a.id,
          a.answer,
          q.id,
          q.question,
          q.date,
          a.created_at,
          a.color
        ORDER BY a.created_at DESC, a.id DESC
          LIMIT $3
        OFFSET $4;
      `,
      [currentQuestion.id, currentUser?.id ?? null, pageSize, offset, status],
    ),

    db.query<{ count: string }>(
      `
        SELECT COUNT(*) AS count
        FROM answers
        WHERE question_id = $1
          AND status = $2;
      `,
      [currentQuestion.id, status],
    ),
  ]);

  const answers = answersResult.rows;
  const totalRows = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(totalRows / pageSize);

  return {
    answers,
    pagination: {
      page,
      pageSize,
      totalRows,
      totalPages,
    },
  };
};

const buildWhereClause = (
  args: {
    questionId?: string | null;
    userId?: string | null;
    likedByUserId?: string | null;
    status?: AnswerStatus;
  } = {},
) => {
  const { questionId, userId, likedByUserId, status } = args;

  const values: string[] = [];
  const conditions: string[] = [];

  if (questionId) {
    values.push(questionId);
    conditions.push(`a.question_id = $${values.length}`);
  }

  if (userId) {
    values.push(userId);
    conditions.push(`a.user_id = $${values.length}`);
  }

  if (likedByUserId) {
    values.push(likedByUserId);
    conditions.push(`
      EXISTS (
        SELECT 1
        FROM answer_likes al
        WHERE al.answer_id = a.id
          AND al.user_id = $${values.length}
      )
    `);
  }

  if (status) {
    values.push(status);
    conditions.push(`a.status = $${values.length}`);
  }

  return {
    values,
    clause: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '',
  };
};

export type GetAnswersArgs = {
  questionId?: string | null;
  userId?: string | null;
  likedByUserId?: string | null;
  status?: AnswerStatus;
} & PaginationConfig;

export const getAnswers = async (args: GetAnswersArgs = {}) => {
  const {
    questionId,
    userId,
    likedByUserId,
    status,
    page: _page,
    pageSize: _pageSize,
  } = args;

  const page = Math.max(1, Number(_page || 1));

  const requestedPageSize = Number(_pageSize || 9);
  const pageSize = Math.min(Math.max(requestedPageSize, 1), 50);

  const offset = (page - 1) * pageSize;

  const currentUser = await getCurrentUser();

  const where = buildWhereClause({
    questionId,
    userId,
    likedByUserId,
    status,
  });

  const values: (string | number | null)[] = [
    ...where.values,
    currentUser?.id ?? null,
  ];
  const currentUserParam = `$${values.length}`;

  values.push(pageSize);
  const pageSizeParam = `$${values.length}`;

  values.push(offset);
  const offsetParam = `$${values.length}`;

  const [answersResult, countResult] = await Promise.all([
    db.query<AnswerExtended>(
      `
        SELECT
          a.id,
          a.answer,
          a.status,
          a.moderation_reason as "moderationReason",
          json_build_object(
            'id', q.id,
            'question', q.question,
            'date', q.date
          ) AS question,
          a.color,
          a.created_at AS "createdAt",
          COUNT(l.answer_id)::int AS "likeCount",
          EXISTS (
            SELECT 1
            FROM answer_likes al
            WHERE al.answer_id = a.id
              AND al.user_id = ${currentUserParam}
          ) AS "isLiked"
        FROM answers a
               LEFT JOIN questions q ON a.question_id = q.id
               LEFT JOIN answer_likes l ON a.id = l.answer_id
          ${where.clause}
        GROUP BY
          a.id,
          a.answer,
          q.id,
          q.question,
          q.date,
          a.created_at,
          a.color
        ORDER BY a.created_at DESC, a.id DESC
          LIMIT ${pageSizeParam}
        OFFSET ${offsetParam}
      `,
      values,
    ),

    db.query<{ count: string }>(
      `
        SELECT COUNT(*) AS count
        FROM answers a
          ${where.clause}
      `,
      where.values,
    ),
  ]);

  const answers = answersResult.rows;
  const totalRows = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(totalRows / pageSize);

  return {
    answers,
    pagination: {
      page,
      pageSize,
      totalRows,
      totalPages,
    },
  };
};
