import { useState, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Baby, Moon, Milk, Heart } from 'lucide-react';
import { BabyLogo } from '../components/ui/BabyLogo';
import { useSingleBaby } from '../hooks/useSingleBaby';
import { Loader } from '../components/ui/Loader';
import NotFoundBaby from '../components/babyDetails/NotFoundBaby';
import { Title } from '../components/ui/Title';
import { SubTitle } from '../components/ui/SubTitle';
import { AddFeedingDialog } from '../components/babyDetails/AddFeedingDialog';
import { SleepTracker } from '../components/babyDetails/SleepTracker';
import { AddDiaperModal } from '../components/babyDetails/AddDiaperDialog';

export const BabyDetails = () => {
  const { babyId } = useParams<{ babyId: string }>();
  const { baby, loading, error } = useSingleBaby(babyId);
  const navigate = useNavigate();

  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  if (loading) return <Loader />;
  if (error || !baby) return <NotFoundBaby />;

  const activities = [
    {
      key: 'sleep',
      label: 'שינה',
      color: 'from-blue-400 to-blue-600',
      icon: <Moon className="w-10 h-10 text-white" />,
    },
    {
      key: 'feeding',
      label: 'האכלה',
      color: 'from-green-400 to-green-600',
      icon: <Milk className="w-10 h-10 text-white" />,
    },
    {
      key: 'diaper',
      label: 'חיתולים',
      color: 'from-yellow-400 to-yellow-600',
      icon: <Baby className="w-10 h-10 text-white" />,
    },
    {
      key: 'health',
      label: 'בריאות',
      color: 'from-pink-400 to-pink-600',
      icon: <Heart className="w-10 h-10 text-white" />,
    },
  ];

  const renderActiveActivity = () => {
    switch (activeActivity) {
      case 'feeding':
        return (
          <AddFeedingDialog
            open={true}
            onClose={() => setActiveActivity(null)}
            onSave={(data) => console.log('Saved Feeding:', data)}
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() =>
              activeActivity ? setActiveActivity(null) : navigate('/dashboard')
            }
            className="flex items-center text-gray-600 hover:bg-gray-100 rounded-full p-2 mb-3 transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {activeActivity ? 'חזרה לבחירה' : 'חזרה ללוח הראשי'}
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center overflow-hidden">
              {baby?.image ? (
                <img
                  src={baby.image}
                  alt={baby.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <BabyLogo bgColor="primary" size={65} iconColor="text-white" />
              )}
            </div>
            <div>
              <Title className="text-2xl font-bold">{baby.name}</Title>
              <SubTitle className="text-sm text-gray-500">
                מעקב שינה, האכלה והחלפת חיתולים
              </SubTitle>
            </div>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {activities.map((act) => (
            <button
              key={act.key}
              onClick={() => setActiveActivity(act.key)}
              className={`bg-gradient-to-br ${act.color} text-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center gap-3 transform hover:scale-105 transition duration-300`}
            >
              {act.icon}
              <span className="text-lg font-semibold">{act.label}</span>
            </button>
          ))}
        </div>
      </main>
      {activeActivity && renderActiveActivity()}
    </div>
  );
};
export default BabyDetails;
