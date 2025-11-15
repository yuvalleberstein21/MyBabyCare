import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../ui/Loader';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  // בדיקת תקינות Context
  if (!authContext) {
    console.error('ProtectedRoute must be used within AuthProvider');
    return <Navigate to="/auth" replace />;
  }

  const { user, loading } = authContext;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <div className="mt-4 text-gray-600">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};
