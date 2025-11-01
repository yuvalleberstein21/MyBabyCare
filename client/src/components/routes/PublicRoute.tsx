import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface Props {
  children: JSX.Element;
}

export const PublicRoute = ({ children }: Props) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>טוען...</div>;

  if (user) return <Navigate to="/dashboard" replace />;

  return children;
};
