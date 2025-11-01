import { createContext, useEffect, useState } from 'react';
import { getCurrentUser, login } from '../api/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ניסיון לטעון משתמש מחיבור קיים
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
      console.error('Login error:', error);
      throw error;
    }
  };

  //   const handleRegister = async (email, password) => {
  //     const userData = await register(email, password);
  //     setUser(userData);
  //   };

  //   const handleLogout = async () => {
  //     await logout();
  //     setUser(null);
  //   };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
