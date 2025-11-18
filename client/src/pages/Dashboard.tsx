import { useEffect, useState } from 'react';
import { AddBabyDialog } from '../components/Dialogs/AddBabyDialog';
import { useBabies } from '../hooks/useBabies';
import { Loader } from '../components/ui/Loader';

import toast from 'react-hot-toast';
import { DashboardHeader } from '../components/Dashboard/DasboardHeader';
import { DashboardGrid } from '../components/Dashboard/DashboardGrid';
import { DashboardEmptyState } from '../components/Dashboard/DashboardEmptyState';
import { Title } from '../components/ui/Title';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const { babies, loading, error, addBaby, deleteBaby, updateBaby } =
    useBabies();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // DELETE BABY
  const onDeleteBaby = async (id: string) => {
    try {
      await deleteBaby(id);
      toast.success('התינוק נמחק בהצלחה 🧸');
    } catch (err) {
      toast.error('שגיאה במחיקה');
    }
  };

  // UPDATE BABY
  const handleUpdate = async (babyId: string, updatedData: any) => {
    try {
      await updateBaby(babyId, updatedData);
      toast.success('הפרטים עודכנו בהצלחה ✨');
    } catch (err: any) {
      toast.error(err.message || 'שגיאה בעדכון');
      throw err;
    }
  };

  // CREATE BABY
  const handleAddBaby = async (data: any) => {
    try {
      await addBaby(data);
      toast.success('תינוק נוסף בהצלחה 👶');
    } catch (err: any) {
      toast.error(err.message || 'שגיאה בהוספה');
      throw err;
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) return <Loader />;
  if (error) {
    console.log(error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <Title className="font-bold mb-2">אירעה שגיאה</Title>
          <p>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            נסה שוב
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10"
      dir="rtl"
    >
      <main className="container mx-auto px-4 py-8">
        <DashboardHeader onAddClick={() => setIsAddDialogOpen(true)} />

        {babies && babies.length > 0 ? (
          <DashboardGrid
            babies={babies}
            onDelete={onDeleteBaby}
            onUpdate={handleUpdate}
          />
        ) : (
          <DashboardEmptyState onAddClick={() => setIsAddDialogOpen(true)} />
        )}
      </main>

      <AddBabyDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdded={handleAddBaby}
        addLoading={loading}
      />
    </div>
  );
};

export default Dashboard;
