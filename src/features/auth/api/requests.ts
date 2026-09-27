import { z } from 'zod';
import {
  accountDeletionClientSchema,
  signInSchema,
  signUpSchema,
} from '@/features/auth/model/schemas';
import {
  PublicUser,
  PublicUserShort,
  RequestStatus,
} from '@/server/model/types';
import { PersonalDetailsFormValues } from '@/features/auth/model/types';

export const createAccount = async (body: z.infer<typeof signUpSchema>) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const signIn = async (body: z.infer<typeof signInSchema>) => {
  const response = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch('/api/auth/logout', { method: 'POST' });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const getMe = async () => {
  const response = await fetch('/api/auth/me');

  const result: {
    message: string;
    status: RequestStatus;
    data: PublicUser | null;
  } = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      return { ...result, data: null };
    }
    throw new Error(result.message);
  }

  return result;
};

export const changePersonalDetails = async (body: {
  name: PersonalDetailsFormValues['name'];
}) => {
  const response = await fetch('/api/auth/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result: {
    message: string;
    status: RequestStatus;
    data: PublicUserShort;
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const changePassword = async (body: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await fetch('/api/auth/me/password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result: {
    message: string;
    status: RequestStatus;
    data: { id: string; name: string };
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};

export const deleteAccount = async (body: {
  reason: z.infer<typeof accountDeletionClientSchema>['reason'];
}) => {
  const response = await fetch('/api/auth/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result: {
    message: string;
    status: RequestStatus;
  } = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
};
