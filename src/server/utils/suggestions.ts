import { PaginationConfig, Suggestion } from '@/server/model/types';
import { db } from '@/server/utils/db';

export type GetSuggestionsArgs = {
  userId?: string | null;
} & PaginationConfig;

export const getSuggestions = async (args: GetSuggestionsArgs = {}) => {
  const { userId, page: _page, pageSize: _pageSize } = args;

  const page = Math.max(1, Number(_page || 1));

  const requestedPageSize = Number(_pageSize || 9);
  const pageSize = Math.min(Math.max(requestedPageSize, 1), 50);

  const offset = (page - 1) * pageSize;

  const values: (string | number | null)[] = [];
  const conditions: string[] = [];

  if (userId) {
    values.push(userId);
    conditions.push(`s.user_id = $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  values.push(pageSize);
  const pageSizeParam = `$${values.length}`;

  values.push(offset);
  const offsetParam = `$${values.length}`;

  const [suggestionsResult, countResult] = await Promise.all([
    db.query<Suggestion>(
      `
        SELECT
          s.id,
          s.credit_name AS "creditName",
          s.question as "suggestedQuestion",
          s.status,
          s.reason,
          s.created_at AS "createdAt",
          CASE
            WHEN q.id IS NOT NULL THEN
              json_build_object(
                'id', q.id,
                'question', q.question,
                'date', q.date
              )
            ELSE NULL
            END AS "scheduledQuestion"
        FROM question_suggestions s
               LEFT JOIN questions q ON s.question_id = q.id
          ${whereClause}
        ORDER BY s.created_at DESC, s.id DESC
          LIMIT ${pageSizeParam}
        OFFSET ${offsetParam}
      `,
      values,
    ),

    db.query<{ count: string }>(
      `
        SELECT COUNT(*) AS count
        FROM question_suggestions s
          ${whereClause}
      `,
      values.slice(0, conditions.length),
    ),
  ]);

  const suggestions = suggestionsResult.rows;
  const totalRows = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(totalRows / pageSize);

  return {
    suggestions,
    pagination: {
      page,
      pageSize,
      totalRows,
      totalPages,
    },
  };
};
