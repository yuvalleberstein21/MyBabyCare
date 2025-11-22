import { createContext, useEffect, useState } from 'react';
import { getCurrentUser, login, logout, register } from '../api/auth';
import type { AuthContextType, AuthProviderProps, AuthUser } from '../types';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await login(email, password);
      setUser(res.user);
    } catch (error: any) {
      const errorMessage = error.message || 'התחברות נכשלה';
      throw new Error(errorMessage);
    }
  };

  const handleRegister = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    try {
      const userData = await register(fullName, email, password);
      setUser(userData);
    } catch (error: any) {
      const errorMessage = error.message || 'הרשמה נכשלה';
      throw new Error(errorMessage);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
