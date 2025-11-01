import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>טוען...</div>;

  if (!user) return <Navigate to="/auth" replace />;

  return children;
};
