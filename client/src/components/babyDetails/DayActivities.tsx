import { useState } from 'react';
import { Title } from '../ui/Title';
import { Moon, Milk, Baby, Heart } from 'lucide-react';

interface Activity {
  id: string;
  type: 'feeding' | 'sleep' | 'diaper' | 'health';
  time: string;
  amount?: number;
  notes?: string;
  duration?: number;
  side?: string;
}

const sampleData: Activity[] = [
  {
    id: '1',
    type: 'feeding',
    time: '08:30',
    amount: 220,
    notes: 'שתה כמעט הכל',
  },
  {
    id: '2',
    type: 'sleep',
    startTime: '09:00',
    endTime: '10:00',
    duration: 60,
  },
  { id: '3', type: 'diaper', time: '10:15', notes: 'רענן' },
  { id: '4', type: 'feeding', time: '12:00', amount: 180 },
];

const activityColors = {
  feeding: 'from-green-400 to-green-600',
  sleep: 'from-blue-400 to-blue-600',
  diaper: 'from-yellow-400 to-yellow-600',
  health: 'from-pink-400 to-pink-600',
};

const activityIcons = {
  feeding: <Milk className="w-5 h-5 text-white" />,
  sleep: <Moon className="w-5 h-5 text-white" />,
  diaper: <Baby className="w-5 h-5 text-white" />,
  health: <Heart className="w-5 h-5 text-white" />,
};

const DayActivities = () => {
  const [filter, setFilter] = useState<
    'all' | 'feeding' | 'sleep' | 'diaper' | 'health'
  >('all');

  const filteredData =
    filter === 'all' ? sampleData : sampleData.filter((a) => a.type === filter);

  return (
    <div dir="rtl" className="container mx-auto px-4 py-6">
      <Title className="text-xl mb-4">מעקב יומי</Title>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'feeding', 'sleep', 'diaper', 'health'].map((f) => (
          <button
            key={f}
            className={`px-3 py-1 rounded-full border ${
              filter === f
                ? 'bg-blue-400 text-white'
                : 'bg-white text-gray-700 border-gray-300'
            } transition`}
            onClick={() => setFilter(f as any)}
          >
            {f === 'all'
              ? 'הכל'
              : f === 'feeding'
              ? 'האכלה'
              : f === 'sleep'
              ? 'שינה'
              : f === 'diaper'
              ? 'חיתולים'
              : 'בריאות'}
          </button>
        ))}
      </div>

      {/* Activities List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((act) => (
          <div
            key={act.id}
            className={`p-4 rounded-2xl shadow-md bg-gradient-to-br ${
              activityColors[act.type]
            } text-white flex flex-col gap-2`}
          >
            <div className="flex items-center gap-2">
              {activityIcons[act.type]}
              <span className="font-semibold">
                {act.type === 'feeding'
                  ? 'האכלה'
                  : act.type === 'sleep'
                  ? 'שינה'
                  : act.type === 'diaper'
                  ? 'חיתולים'
                  : 'בריאות'}
              </span>
            </div>
            <div className="text-sm">
              <span className="font-semibold">התחלה:</span> {act.startTime}
            </div>
            {act.amount && (
              <div className="text-sm">
                <span className="font-semibold">כמות:</span> {act.amount}ml
              </div>
            )}
            {act.endTime && (
              <div className="text-sm">
                <span className="font-semibold">הסתיים:</span> {act.endTime}
              </div>
            )}
            {act.duration && (
              <div className="text-sm">
                <span className="font-semibold">משך:</span> {act.duration} דקות
              </div>
            )}

            {act.side && (
              <div className="text-sm">
                <span className="font-semibold">צד:</span> {act.side}
              </div>
            )}
            {act.notes && (
              <div className="text-sm italic text-white/80">
                הערות: {act.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayActivities;
