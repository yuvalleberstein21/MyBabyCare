import { Baby, Plus } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/ui/Button';
import BabyCard from '../components/Dashboard/BabyCard';
import { AddBabyDialog } from '../components/Dashboard/AddBabyDialog';
import { Title } from '../components/ui/Title';
import { SubTitle } from '../components/ui/SubTitle';

const BabiesMockData = [
  {
    id: '1',
    name: 'Emma Rose',
    birthDate: '2024-08-15',
    gender: 'female',
    weight: 3.5,
    height: 50,
    photo: undefined,
  },
  {
    id: '2',
    name: 'Oliver James',
    birthDate: '2024-06-20',
    gender: 'male',
    weight: 4.2,
    height: 52,
    photo: undefined,
  },
  {
    id: '3',
    name: 'Sophie Grace',
    birthDate: '2024-09-10',
    gender: 'female',
    weight: 3.8,
    height: 51,
    photo: undefined,
  },
];
const Dashboard = () => {
  const [babies, setBabies] = useState(BabiesMockData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10"
      dir="rtl"
    >
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 gap-4 text-right">
          <div>
            <Title className="text-3xl font-bold mb-2">התינוקות שלך</Title>
            <SubTitle className="text-muted-foreground">
              נהל ועקוב אחר הגדילה וההתפתחות של הקטנטנים שלך
            </SubTitle>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-primary hover:opacity-90 transition-opacity flex items-center gap-1"
          >
            <Plus className="mr-2 h-4 w-4" />
            הוסף תינוק
          </Button>
        </div>

        {babies && babies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {babies.map((baby) => (
              <BabyCard key={baby.id} baby={baby} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Baby className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">עדיין אין תינוקות</h3>
            <p className="text-muted-foreground mb-6">
              הוסף את התינוק הראשון שלך כדי להתחיל במעקב
            </p>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-primary hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              הוסף תינוק ראשון
            </Button>
          </div>
        )}
      </main>

      <AddBabyDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={(newBaby) =>
          setBabies((prev) => [
            ...prev,
            { ...newBaby, id: Date.now().toString() },
          ])
        }
      />
    </div>
  );
};

export default Dashboard;
