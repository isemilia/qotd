import { staffRoles } from '@/features/auth/model/types';
import { RequestStatus } from '@/server/model/types';
import { getSession } from '@/server/utils/session';
import { NextResponse } from 'next/server';

type CheckStaffAccessOptions = {
  adminOnly?: boolean;
};

export const checkStaffAccess = async (
  options: CheckStaffAccessOptions = {},
) => {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { status: RequestStatus.ERROR, message: 'Unauthorized' },
      { status: 401 },
    );
  }

  // only admin
  if (options.adminOnly && session.user_role !== 'admin') {
    return NextResponse.json(
      { status: RequestStatus.ERROR, message: 'Forbidden' },
      { status: 403 },
    );
  }

  // all staff roles
  if (!options.adminOnly && !staffRoles.includes(session.user_role)) {
    return NextResponse.json(
      { status: RequestStatus.ERROR, message: 'Forbidden' },
      { status: 403 },
    );
  }

  return null;
};
