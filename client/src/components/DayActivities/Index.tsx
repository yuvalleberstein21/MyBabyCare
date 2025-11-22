import { useMemo, useState } from 'react';
import { Title } from '../ui/Title';
import { Filters } from './Filters';
import { ActivityCard } from './ActivityCard';
import { Loader } from '../ui/Loader';
import { DatePicker } from './DatePicker';
import type { DaySummaryResponse } from '../../types';

interface DayActivitiesProps {
  summary: DaySummaryResponse | null;
  loading: boolean;
  loadingSummary: boolean;
  error: string | null;
  refreshSummary: () => void;
  selectedDate: string;
  onChange: (newDate: string) => void;
}
const DayActivities: React.FC<DayActivitiesProps> = ({
  summary,
  loading,
  error,
  refreshSummary,
  selectedDate,
  onChange,
  loadingSummary,
}) => {
  const [filter, setFilter] = useState('all');

  //  Aggregate activities
  const allActivities = useMemo(() => {
    if (!summary || !summary.data) return [];

    const feedings = summary.data.summary.feedings.map((f) => ({
      ...f,
      type: 'feeding',
      feedingType: f.type,
    }));

    const sleep = summary.data.summary.sleepSessions.map((s) => ({
      ...s,
      type: 'sleep',
    }));

    const diapers = summary.data.summary.diaperChanges.map((d) => ({
      ...d,
      type: 'diaper',
      diaperType: d.type,
    }));

    const health = summary.data.summary.healthRecords.map((h) => ({
      ...h,
      type: 'health',
      healthType: h.type,
    }));

    return [...feedings, ...sleep, ...diapers, ...health];
  }, [summary]);

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? allActivities
        : allActivities.filter((a) => a.type === filter),
    [allActivities, filter]
  );

  //  Loading & Error
  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Loader />
      </div>
    );

  if (error)
    return <div className="text-center py-6 text-red-500">{error}</div>;

  return (
    <div dir="rtl" className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center text-center mb-6 from-accent-foreground">
        <Title className="text-2xl">מעקב יומי</Title>
        <DatePicker
          className="text-lg text-gray-500 font-playful bg-slate-100 p-1 rounded-md"
          selectedDate={selectedDate}
          onChange={onChange}
        />
      </div>

      <Filters filter={filter} setFilter={setFilter} />

      {loadingSummary ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-600">
          <span className="text-lg font-medium">טוען נתונים...</span>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((act) => (
            <ActivityCard
              key={act._id}
              act={act}
              refreshSummary={refreshSummary}
            />
          ))}
        </div>
      ) : (
        <Title className="text-center text-gray-500 py-6">
          אין פעילויות לתאריך זה ✨
        </Title>
      )}
    </div>
  );
};

export default DayActivities;
