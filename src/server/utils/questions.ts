import { db } from '@/server/utils/db';
import { CurrentQuestion } from '@/server/model/types';

export const getCurrentQuestion = async () => {
  return (
    await db.query<CurrentQuestion>(
      `
        SELECT
          id,
          question,
          date::text AS date,
          created_at AS "createdAt",
        (
          SELECT COUNT(*)::int
          FROM answers a
          WHERE a.question_id = q.id
        ) AS "answerCount"
        FROM questions q
        WHERE date = (NOW() AT TIME ZONE 'UTC')::date;
      `,
    )
  ).rows[0];
};

export const getQuestionById = async (id: string) => {
  return (
    await db.query<{
      id: string;
      question: string;
      date: string;
      createdAt: string;
    }>(
      `
    SELECT 
      id, question, date::text AS date, created_at AS "createdAt"
    FROM questions
    WHERE id = $1
  `,
      [id],
    )
  ).rows[0];
};

// Returns null if the question doesn't exist,
// true if the question has expired,
// and false if the question is still answerable
export const isExpiredQuestion = async (id: string) => {
  const question = await getQuestionById(id);

  if (!question) {
    return null;
  }

  const questionDate = new Date(question.date);
  const expiresAt = new Date(
    questionDate.getTime() + 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000,
  );
  const now = new Date();
  const isExpired = now.getTime() > expiresAt.getTime();

  return isExpired;
};
