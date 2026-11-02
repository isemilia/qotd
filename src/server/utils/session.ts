import { UserRole } from '@/features/auth/model/types';
import { PublicUser } from '@/server/model/types';
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
  const res = await db.query<{
    id: string;
    expires_at: string;
  }>(
    `
        INSERT INTO sessions (user_id, user_role)
        VALUES ($1, $2)
        RETURNING id, expires_at
    `,
    [user.id, user.role],
  );
  const session = res.rows[0];

  await setSessionCookie({
    id: session.id,
    expires_at: session.expires_at,
  });
};

export const removeSession = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_SESSION_KEY)?.value;

  if (!sessionId) {
    return;
  }

  await deleteSessionById(sessionId);
};

export const deleteSessionById = async (sessionId: string) => {
  const cookieStore = await cookies();
  await db.query(`DELETE FROM sessions WHERE id = $1`, [sessionId]);
  cookieStore.delete(COOKIE_SESSION_KEY);
};

export const deleteAllSessionsByUserId = async (userId: string) => {
  const cookieStore = await cookies();
  await db.query(`DELETE FROM sessions WHERE user_id = $1`, [userId]);
  cookieStore.delete(COOKIE_SESSION_KEY);
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_SESSION_KEY);

  if (!sessionId) {
    return null;
  }

  return getSessionById(sessionId.value);
};

export const getSessionById = async (sessionId: string) => {
  const res = await db.query<{
    user_id: string;
    id: string;
    expires_at: string;
    user_role: UserRole;
  }>(`SELECT * FROM sessions WHERE id = $1`, [sessionId]);
  const session = res.rows[0];

  if (!session) {
    return null;
  }

  const expiresAt = new Date(session.expires_at).getTime();
  const now = new Date().getTime();

  if (expiresAt < now) {
    await deleteSessionById(session.id);
    return null;
  }

  return session;
};

export const getCurrentUser = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = (
    await db.query<PublicUser>(
      `
        SELECT
          u.id,
          u.name,
          u.email,
          u.role,
          u.status,
          u.created_at AS "createdAt",
          (
            SELECT COUNT(*)
            FROM answers a
            WHERE a.user_id = u.id
          )::int AS "answerCount"
        FROM users u
        WHERE u.id = $1
      `,
      [session.user_id],
    )
  ).rows[0];

  if (!user) {
    return null;
  }

  return user;
};
