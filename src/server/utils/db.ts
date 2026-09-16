import { Pool, QueryResultRow } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const db = {
  query: <Return extends QueryResultRow>(text: string, params?: any[]) =>
    pool.query<Return>(text, params),
};
