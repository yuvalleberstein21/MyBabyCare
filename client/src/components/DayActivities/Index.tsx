// @ts-nocheck
import { useMemo, useState } from 'react';
import { Title } from '../ui/Title';
import { Filters } from './Filters';
import { ActivityCard } from './ActivityCard';
import { RefreshCw } from 'lucide-react';
import { DatePicker } from './DatePicker';
import type { DaySummaryResponse } from '../../types';

interface DayActivitiesProps {
  summary: DaySummaryResponse | null;
  isFetching: boolean;
  error: string | null;
  refreshSummary: () => void;
  selectedDate: string;
  onChange: (newDate: string) => void;
}

const DayActivities: React.FC<DayActivitiesProps> = ({
  summary,
  isFetching,
  error,
  refreshSummary,
  selectedDate,
  onChange,
}) => {
  const [filter, setFilter] = useState('all');

  const allActivities = useMemo(() => {
    if (!summary?.data) return [];

    const {
      feedings = [],
      sleepSessions = [],
      diaperChanges = [],
      healthRecords = [],
    } = summary.data.summary;

    return [
      ...feedings.map((f) => ({ ...f, type: 'feeding', feedingType: f.type })),
      ...sleepSessions.map((s) => ({ ...s, type: 'sleep' })),
      ...diaperChanges.map((d) => ({
        ...d,
        type: 'diaper',
        diaperType: d.type,
      })),
      ...healthRecords.map((h) => ({
        ...h,
        type: 'health',
        healthType: h.type,
      })),
    ];
  }, [summary]);

  const filteredActivities = useMemo(
    () =>
      filter === 'all'
        ? allActivities
        : allActivities.filter((a) => a.type === filter),
    [allActivities, filter]
  );

  return (
    <div dir="rtl" className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Title className="text-2xl">מעקב יומי</Title>
          {/* אינדיקטור קטן במקום loader מלא */}
          {isFetching && (
            <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
          )}
        </div>

        <DatePicker
          className="text-lg text-gray-500 font-playful bg-slate-100 p-1 rounded-md"
          selectedDate={selectedDate}
          onChange={onChange}
        />
      </div>

      <Filters filter={filter} setFilter={setFilter} />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600 text-sm mb-2">{error}</p>
          <button
            onClick={refreshSummary}
            className="text-sm text-red-700 hover:text-red-800 underline"
          >
            נסה שוב
          </button>
        </div>
      )}

      {filteredActivities.length > 0 ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-200 ${
            isFetching ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {filteredActivities.map((act) => (
            <ActivityCard
              key={act._id}
              act={act}
              refreshSummary={refreshSummary}
              selectedDate={selectedDate}
            />
          ))}
        </div>
      ) : (
        <div
          className={`text-center py-12 transition-opacity ${
            isFetching ? 'opacity-60' : 'opacity-100'
          }`}
        >
          <Title className="text-gray-500">
            {isFetching ? 'טוען...' : 'אין פעילויות לתאריך זה ✨'}
          </Title>
        </div>
      )}
    </div>
  );
};

export default DayActivities;
