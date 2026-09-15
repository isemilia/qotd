import { db } from '@/server/utils/db';

export const getCurrentQuestion = async () => {
  return (
    await db.query<{
      id: string;
      question: string;
      date: string;
      createdAt: string;
    }>(
      `SELECT id, question, date, created_at AS "createdAt"
      FROM questions 
      WHERE date = (NOW() AT TIME ZONE 'UTC')::date`,
    )
  ).rows[0];
};
