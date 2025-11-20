import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../components/ui/Loader';
import NotFoundBaby from '../components/MainBabyActivities/NotFoundBaby';
import Header from '../components/ui/Header';
import ActivityGrid from '../components/MainBabyActivities/ActivityGrid';
import { activities } from '../mock/ActivitiesData';
import DayActivities from '../components/DayActivities/Index';
import { ActivityModalManager } from '../components/MainBabyActivities/ActivityModalManager';
import { useBabyDetailsData } from '../hooks/useBabyDetailsData';

export const BabyDetails = () => {
  const { babyId } = useParams();
  const navigate = useNavigate();

  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split('T')[0]
  );

  const { baby, loading, error, summary, loadingSummary, refreshSummary } =
    useBabyDetailsData(babyId!, selectedDate);

  const handleCloseActivity = () => {
    setActiveActivity(null);
    refreshSummary();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <section className="container mx-auto px-4 py-2">
        <DayActivities
          summary={summary}
          error={null}
          loading={false}
          refreshSummary={refreshSummary}
          selectedDate={selectedDate}
          onChange={setSelectedDate}
          loadingSummary={loadingSummary}
        />
      </section>
    </div>
  );
};
