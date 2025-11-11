import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSingleBaby } from '../hooks/useSingleBaby';
import { Loader } from '../components/ui/Loader';
import NotFoundBaby from '../components/babyDetails/NotFoundBaby';
import { AddFeedingDialog } from '../components/babyDetails/AddFeedingDialog';
import { SleepTracker } from '../components/babyDetails/SleepTracker';
import { AddDiaperModal } from '../components/babyDetails/AddDiaperDialog';
import Header from '../components/ui/Header';
import ActivityGrid from '../components/babyDetails/ActivityGrid';
import { activities } from '../mock/ActivitiesData';
import { Title } from '../components/ui/Title';
import DayActivities from '../components/babyDetails/DayActivities';
import { useBabies } from '../hooks/useBabies';

export const BabyDetails = () => {
  const { babyId } = useParams<{ babyId: string }>();
  const {
    singleBaby: baby,
    loadingSingle: loading,
    errorSingle: error,
    fetchSingleBaby,
  } = useBabies();
  const navigate = useNavigate();
  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  useEffect(() => {
    if (babyId) fetchSingleBaby(babyId);
  }, [babyId]);

  console.log(baby);
  if (loading) return <Loader />;
  if (error || !baby) return <NotFoundBaby />;

  const renderActiveActivity = () => {
    switch (activeActivity) {
      case 'feeding':
        return (
          <AddFeedingDialog
            babyId={babyId}
            open={true}
            onClose={() => setActiveActivity(null)}
          />
        );
      case 'diaper':
        return (
          <AddDiaperModal
            babyId={babyId!}
            onClose={() => setActiveActivity(null)}
          />
        );
      case 'sleep':
        return <SleepTracker onClose={() => setActiveActivity(null)} />;
      default:
        return null;
    }
  };

  const handleBackClick = () => {
    if (activeActivity) setActiveActivity(null);
    else navigate('/dashboard');
  };
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
        <DayActivities />
      </section>
    </div>
  );
};
export default BabyDetails;
