import { createContext, useState } from 'react';
import { login } from '../api/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // בדיקה אם יש משתמש מחובר בהתחלה
  //   useEffect(() => {
  //     getCurrentUser()
  //       .then(setUser)
  //       .catch(() => setUser(null))
  //       .finally(() => setLoading(false));
  //   }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const userData = await login(email, password);
      setUser(userData);
    } catch (error: any) {
      console.error('Login error:', error);
      // אפשר גם להחזיר הודעת שגיאה למעלה (ל־AuthPage)
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
