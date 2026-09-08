import { db } from '@/server/utils/db';
import { cookies } from 'next/headers';

export const COOKIE_SESSION_KEY = 'sessionId';

export const setSessionCookie = async (session: {
  id: string;
  expires_at: string;
}) => {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_SESSION_KEY, session.id, {
    expires: new Date(session.expires_at),
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
};

export const createSession = async (user: { id: string; role: string }) => {
  const res = await db.query(
    `
        INSERT INTO sessions (user_id, user_role)
        VALUES ($1, $2)
        RETURNING id, expires_at
    `,
    [user.id, user.role],
  );
  const session = res.rows[0] as unknown as {
    id: string;
    expires_at: string;
  };

  await setSessionCookie({
    id: session.id,
    expires_at: session.expires_at,
  });
};
