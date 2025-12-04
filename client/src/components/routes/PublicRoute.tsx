import { Navigate } from 'react-router-dom';
import { useContext, type JSX } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface Props {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: Props) => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useContext(AuthContext) must be used within AuthProvider');
  }
  const { user, loading } = auth;

  if (loading) return <div>טוען...</div>;

  if (user) return <Navigate to="/dashboard" replace />;

  return children;
};
