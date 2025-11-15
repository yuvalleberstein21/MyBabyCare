import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../components/ui/Loader';
import NotFoundBaby from '../components/babyDetails/NotFoundBaby';
import { AddFeedingDialog } from '../components/babyDetails/AddFeedingDialog';
import { SleepTracker } from '../components/babyDetails/SleepTracker';
import { AddDiaperModal } from '../components/babyDetails/AddDiaperDialog';
import Header from '../components/ui/Header';
import ActivityGrid from '../components/babyDetails/ActivityGrid';
import { activities } from '../mock/ActivitiesData';
import { useBabies } from '../hooks/useBabies';
import { useDailySummary } from '../hooks/useDailySummary';
import DayActivities from '../components/DayActivities/Index';

export const BabyDetails = () => {
  const { babyId } = useParams<{ babyId: string }>();
  const navigate = useNavigate();
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  // GET SINGLE BABY
  const {
    singleBaby: baby,
    loadingSingle: loading,
    errorSingle: error,
    fetchSingleBaby,
  } = useBabies();

  // GET DAILY SUMMARY
  const {
    summary,
    loading: loadingSummary,
    error: errSummary,
    fetchSummary,
  } = useDailySummary();

  useEffect(() => {
    if (babyId) fetchSingleBaby(babyId);
  }, [babyId]);

  useEffect(() => {
    if (babyId) fetchSummary(babyId, selectedDate);
  }, [babyId, selectedDate]);

  const refreshSummary = useCallback(() => {
    if (babyId) fetchSummary(babyId, selectedDate);
  }, [babyId, selectedDate]);

  const handleCloseActivity = useCallback(() => {
    setActiveActivity(null);
    refreshSummary();
  }, [refreshSummary]);

  const handleBackClick = () => {
    if (activeActivity) setActiveActivity(null);
    else navigate('/dashboard');
  };

  const renderActiveActivity = useCallback(() => {
    switch (activeActivity) {
      case 'feeding':
        return (
          <AddFeedingDialog
            babyId={babyId}
            open
            onClose={handleCloseActivity}
          />
        );
      case 'diaper':
        return (
          <AddDiaperModal
            babyId={babyId!}
            onClose={() => {
              setActiveActivity(null);
              refreshSummary();
            }}
          />
        );
      case 'sleep':
        return (
          <SleepTracker
            onClose={() => {
              setActiveActivity(null);
              refreshSummary();
            }}
          />
        );
    }
  }, [activeActivity, babyId, refreshSummary]);

  if (loading) return <Loader />;
  if (error || !baby) return <NotFoundBaby />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* 🧭 Header */}
      <Header
        baby={baby}
        activeActivity={activeActivity}
        onBack={handleBackClick}
      />

      {/* ⚙️ Activities Grid */}
      <main className="container mx-auto px-4 py-8">
        <ActivityGrid activities={activities} onSelect={setActiveActivity} />
      </main>

      {/* 💤 Active Modal */}
      {activeActivity && renderActiveActivity()}

      {/* 📅 Day summary */}
      <section className="container mx-auto px-4 py-6">
        <DayActivities
          summary={summary}
          loading={loadingSummary}
          error={errSummary}
        />
      </section>
    </div>
  );
};
export default BabyDetails;
