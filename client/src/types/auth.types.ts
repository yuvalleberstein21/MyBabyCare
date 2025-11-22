import type { ReactNode } from 'react';

export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
