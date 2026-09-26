import { getCurrentUser } from '@/server/utils/session';
import { db } from '@/server/utils/db';
import { PublicUserShort } from '@/server/model/types';

export const changePersonalDetails = async ({ name }: { name: string }) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('UNAUTHORIZED');
  }

  const result = await db.query<PublicUserShort>(
    `
    UPDATE users
    SET name = $1
    WHERE id = $2
    RETURNING
      id,
      name,
      email,
      role,
      status,
      created_at AS "createdAt";
  `,
    [name, user.id],
  );

  return result.rows[0];
};
