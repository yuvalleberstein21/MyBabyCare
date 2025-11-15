import { useMemo, useState } from 'react';
import { Title } from '../ui/Title';
import { Filters } from './Filters';
import { ActivityCard } from './ActivityCard';
import { Loader } from '../ui/Loader';

const DayActivities = ({ summary, loading, error }) => {
  const [filter, setFilter] = useState('all');

  //  Aggregate activities
  const allActivities = useMemo(() => {
    if (!summary || !summary.data) return [];

    const feedings = summary.data.summary.feedings.map((f) => ({
      ...f,
      type: 'feeding',
    }));

    const sleep = summary.data.summary.sleepSessions.map((s) => ({
      ...s,
      type: 'sleep',
    }));

    const diapers = summary.data.summary.diaperChanges.map((d) => ({
      ...d,
      type: 'diaper',
    }));

    return [...feedings, ...sleep, ...diapers];
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

  if (!summary)
    return (
      <div className="text-center py-6 text-gray-500">אין מידע ליום זה</div>
    );

  return (
    <div dir="rtl" className="container mx-auto px-4 py-6">
      <Title className="text-xl mb-2">מעקב יומי</Title>
      <Title className="text-lg mb-4">{summary?.data.date}</Title>

      <Filters filter={filter} setFilter={setFilter} />

      {filtered.length === 0 && (
        <div className="text-center text-gray-500 py-6">
          אין פעילויות לתאריך זה ✨
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((act) => (
          <ActivityCard key={act._id} act={act} />
        ))}
      </div>
    </div>
  );
};

export default DayActivities;
