import { getSession } from '@/server/utils/session';
import { NextResponse } from 'next/server';
import { RequestStatus } from '@/server/model/types';
import { staffRoles } from '@/features/auth/model/types';

export const checkAdminAccess = async () => {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { status: RequestStatus.ERROR, message: 'Unauthorized' },
      { status: 401 },
    );
  }

  if (!staffRoles.includes(session.user_role)) {
    return NextResponse.json(
      { status: RequestStatus.ERROR, message: 'Forbidden' },
      { status: 403 },
    );
  }

  return null;
};
