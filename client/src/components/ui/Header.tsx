import { Title } from './Title';
import { SubTitle } from './SubTitle';
import { Link } from 'react-router-dom';
import { BabyLogo } from './BabyLogo';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Header = () => {
  const auth = useContext(AuthContext);
  const userName = auth?.user?.user?.name || 'אורח'; // ברירת מחדל אם אין משתמש מחובר
  console.log(auth);

  return (
    <header
      className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to={'/'}
            className="w-15 h-15 rounded-full bg-gradient-primary flex items-center justify-center"
          >
            <BabyLogo size={50} iconColor="text-white" />
          </Link>
          <div>
            <Title className="text-xl font-bold">מעקב תינוקות</Title>
            <SubTitle className="text-sm text-muted-foreground">
              ברוך הבא! {userName}
            </SubTitle>
          </div>
        </div>
      </div>
    </header>
  );
};
