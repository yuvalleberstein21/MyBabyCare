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
import { useSleeping } from '../hooks/useSleeping';

export const BabyDetails = () => {
  const { babyId } = useParams();
  const navigate = useNavigate();

  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [isSleepActive, setIsSleepActive] = useState(false);

  const [sleepStartTime, setSleepStartTime] = useState<Date | null>(null);
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(0);
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

  const { startSleeping, endSleeping, loading } = useSleeping(babyId!);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isSleepActive && sleepStartTime) {
      interval = setInterval(() => {
        const diff = Math.floor(
          (Date.now() - sleepStartTime.getTime()) / 60000
        );
        setElapsedMinutes(diff);
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isSleepActive, sleepStartTime]);

  const handleActivitySelect = async (key: string) => {
    if (key !== 'sleep') {
      setActiveActivity(key);
      return;
    }

    // אם שינה פעילה → עוצרים
    if (isSleepActive) {
      try {
        const now = new Date();
        await endSleeping({
          endTime: now.toISOString(),
        });
        setIsSleepActive(false);
        setSleepStartTime(null);
        handleCloseActivity();
      } catch (e) {
        console.log('Error stopping sleep', e);
      }
      return;
    }

    // אם אין שינה פעילה → מתחילים
    try {
      const now = new Date();
      const result = await startSleeping({
        startTime: now.toISOString(),
        notes: 'התחלת שינה',
      });
      setIsSleepActive(true);
      setSleepStartTime(result.sleep.startTime);
    } catch (e: any) {
      // אם חוזרת שגיאה שהשינה כבר פעילה
      if (e?.response?.data?.error === 'SLEEP_ALREADY_ACTIVE') {
        setIsSleepActive(true);
        setSleepStartTime(e.response.data.sleep.startTime);
      }
    }
  };

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
        <ActivityGrid
          activities={activities}
          onSelect={handleActivitySelect}
          isSleepActive={isSleepActive}
          sleepDuration={elapsedMinutes}
          loading={loading}
        />
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
