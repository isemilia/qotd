import { db } from '@/server/utils/db';
import { Answer } from '@/server/model/types';
import { getCurrentQuestion } from '@/server/utils/questions';
import { getCurrentUser } from '@/server/utils/session';

export const getCurrentAnswers = async () => {
  const currentQuestion = await getCurrentQuestion();

  if (!currentQuestion) {
    throw new Error('NO_CURRENT_QUESTION');
  }

  const currentUser = await getCurrentUser();

  const answers = await db.query<Answer>(
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
          a.created_at as "createdAt",
        COUNT(l.answer_id)::int as "likeCount",
        EXISTS (
          SELECT 1
          FROM answer_likes al
          WHERE al.answer_id = a.id
            AND al.user_id = $2
        ) AS "isLiked"
        FROM answers a
        LEFT JOIN questions q ON a.question_id = q.id
        LEFT JOIN answer_likes l ON a.id = l.answer_id
        WHERE question_id = $1
        GROUP BY
          a.id,
          a.answer,
          q.id,
          q.question,
          q.date,
          a.created_at
        ORDER BY a.created_at DESC;
        `,
    [currentQuestion.id, currentUser?.id],
  );

  return answers.rows;
};
