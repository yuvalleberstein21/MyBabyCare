import { Baby } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export const PageNotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-background via-secondary/10 to-accent/10"
      dir="rtl"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-[90%]">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <Baby className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">העמוד לא נמצא</h1>
        <p className="text-muted-foreground mb-8">
          נראה שהדף שחיפשת לא קיים או הוסר.
        </p>

        <Link to="/">
          <Button className="bg-gradient-primary hover:opacity-90 transition">
            חזרה לדף הבית
          </Button>
        </Link>
      </div>
    </div>
  );
};
