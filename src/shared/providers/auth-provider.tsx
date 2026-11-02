'use client';

import { useMe } from '@/features/auth/api/queries';
import { PublicUser } from '@/server/model/types';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

type AuthContextValue = {
  user: PublicUser | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const getMe = useMe();

  const user = getMe.data?.data ?? null;
  const isAuthenticated = Boolean(user?.id);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
