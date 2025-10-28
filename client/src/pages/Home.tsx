import { Baby, Heart, Milk, Moon } from 'lucide-react';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <div className="inline-flex w-20 h-20 rounded-full bg-gradient-primary items-center justify-center mb-6 animate-scale-in">
            <Baby className="h-10 w-10 text-primary-foreground" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            מעקב תינוק
          </h1>

          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            עקוב אחר שינה, האכלה והחלפת חיתולים — הכול במקום אחד, בעיצוב יפהפה
            ופשוט לשימוש. מושלם להורים מודרניים.
          </p>

          <div className="flex gap-4 justify-center mb-12 animate-fade-in">
            <Button
              size="lg"
              variant="primary"
              onClick={() => console.log('clicked')}
              disabled={false}
            >
              עבור לדף הניהול
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up">
            <div className="p-6 rounded-2xl bg-card shadow-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Moon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">מעקב שינה</h3>
              <p className="text-sm text-muted-foreground">
                עקוב אחר דפוסי שינה וזמן שינה באמצעות התחלה/עצירה פשוטה.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card shadow-card">
              <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mb-4 mx-auto">
                <Milk className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">יומן האכלה</h3>
              <p className="text-sm text-muted-foreground">
                תעד הנקות, בקבוקים ומזון מוצק בקלות, כולל הערות חשובות.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card shadow-card">
              <div className="w-12 h-12 rounded-full bg-accent/50 flex items-center justify-center mb-4 mx-auto">
                <Heart className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">החלפות חיתולים</h3>
              <p className="text-sm text-muted-foreground">
                עקוב אחר החלפות ונתח דפוסים לשיפור שגרת הטיפול בתינוק.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
