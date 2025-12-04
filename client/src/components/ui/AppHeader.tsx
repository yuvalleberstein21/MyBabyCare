// @ts-nocheck
import { Title } from './Title';
import { SubTitle } from './SubTitle';
import { Link } from 'react-router-dom';
import { BabyLogo } from './BabyLogo';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from './Button';
import { LogOut } from 'lucide-react';

export const Header = () => {
  const auth = useContext(AuthContext);
  const { user, loading, handleLogout } = auth || {};

  const userName = !loading && user ? user.name : 'אורח';
  return (
    <header
      className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* צד שמאל - לוגו + טקסט */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-15 h-15 rounded-full bg-gradient-primary flex items-center justify-center"
          >
            <BabyLogo size={50} iconColor="text-white" />
          </Link>
          <div>
            <Title className="text-xl font-bold">My Baby Care</Title>
            <SubTitle className="text-sm font-bold text-gray-600 font-sans">
              ברוך הבא! {userName}
            </SubTitle>
          </div>
        </div>

        {/* צד ימין - כפתור התנתקות */}
        {user && (
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-sm flex items-center gap-2 font-semibold text-red-500 border-red-300 hover:bg-red-100 transition-colors"
          >
            יציאה
            <LogOut className="w-4 h-4 rotate-180" />
          </Button>
        )}
      </div>
    </header>
  );
};
