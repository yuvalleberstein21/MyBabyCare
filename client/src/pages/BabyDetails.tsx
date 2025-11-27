import { useEffect, useState, useCallback } from 'react';
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

  const {
    baby,
    initialLoading,
    error,
    summary,
    isFetchingSummary,
    errorSummary,
    refreshSummary,
  } = useBabyDetailsData(babyId!, selectedDate);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCloseActivity = useCallback(() => {
    setActiveActivity(null);
    refreshSummary();
  }, [refreshSummary]);

  const handleBackClick = useCallback(() => {
    if (activeActivity) {
      setActiveActivity(null);
    } else {
      navigate('/dashboard');
    }
  }, [activeActivity, navigate]);

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !baby) {
    return <NotFoundBaby />;
  }

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
          isFetching={isFetchingSummary}
          error={errorSummary}
          refreshSummary={refreshSummary}
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
      </section>
    </div>
  );
};
