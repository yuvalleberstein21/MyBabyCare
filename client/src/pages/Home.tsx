import { Heart, Milk, Moon } from 'lucide-react';
import Button from '../components/ui/Button';
import { SubTitle } from '../components/ui/SubTitle';
import { Title } from '../components/ui/Title';
import { StaticCard } from '../components/ui/StaticCard';
import { Link } from 'react-router-dom';
import { BabyLogo } from '../components/ui/BabyLogo';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-flex w-20 h-20 rounded-full bg-gradient-primary items-center justify-center mb-6 animate-scale-in">
            <BabyLogo size={80} iconColor="text-white" />
          </div>

          <Title className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            מעקב תינוק
          </Title>

          <SubTitle className="text-xl text-muted-foreground mb-8 animate-fade-in">
            עקוב אחר שינה, האכלה והחלפת חיתולים — הכול במקום אחד, בעיצוב יפהפה
            ופשוט לשימוש. מושלם להורים מודרניים.
          </SubTitle>

          <div className="flex gap-4 justify-center mb-12 animate-fade-in">
            <Link to={'/dashboard'}>
              <Button size="lg" variant="primary" disabled={false}>
                עבור לדף הניהול
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up">
            <StaticCard
              icon={Moon}
              title="מעקב שינה"
              description="עקוב אחר דפוסי שינה וזמן שינה באמצעות התחלה/עצירה פשוטה."
            />

            <StaticCard
              icon={Milk}
              title="יומן האכלה"
              description="תעד הנקות, בקבוקים ומזון מוצק בקלות, כולל הערות חשובות."
            />

            <StaticCard
              icon={Heart}
              title="החלפות חיתולים"
              description="עקוב אחר החלפות ונתח דפוסים לשיפור שגרת הטיפול בתינוק."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
