import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../components/ui/Loader';
import NotFoundBaby from '../components/babyDetails/NotFoundBaby';
import Header from '../components/ui/Header';
import ActivityGrid from '../components/babyDetails/ActivityGrid';
import { activities } from '../mock/ActivitiesData';
import DayActivities from '../components/DayActivities/Index';
import { ActivityModalManager } from '../components/babyDetails/ActivityModalManager';
import { useBabyDetailsData } from '../hooks/useBabyDetailsData';

export const BabyDetails = () => {
  const { babyId } = useParams();
  const navigate = useNavigate();

  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [selectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  const { baby, loading, error, summary, refreshSummary } = useBabyDetailsData(
    babyId!,
    selectedDate
  );

  const handleCloseActivity = () => {
    setActiveActivity(null);
    refreshSummary();
  };

  const handleBackClick = () => {
    if (activeActivity) setActiveActivity(null);
    else navigate('/dashboard');
  };

  if (loading) return <Loader />;
  if (error || !baby) return <NotFoundBaby />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      <Header
        baby={baby}
        activeActivity={activeActivity}
        onBack={handleBackClick}
      />

      <main className="container mx-auto px-4 py-8">
        <ActivityGrid activities={activities} onSelect={setActiveActivity} />
      </main>

      <ActivityModalManager
        activeActivity={activeActivity}
        babyId={babyId!}
        onClose={handleCloseActivity}
      />

      <section className="container mx-auto px-4 py-6">
        <DayActivities summary={summary} loading={false} error={null} />
      </section>
    </div>
  );
};
