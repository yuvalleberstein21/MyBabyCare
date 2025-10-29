import { Baby } from 'lucide-react';
import { Title } from './Title';
import { SubTitle } from './SubTitle';

export const Header = () => {
  return (
    <header
      className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <Baby className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <Title className="text-xl font-bold">מעקב תינוקות</Title>
            <SubTitle className="text-sm text-muted-foreground">
              ברוך הבא!
            </SubTitle>
          </div>
        </div>
      </div>
    </header>
  );
};
