import { useCallback, useState } from 'react';
import { createEndSleeping, createStartSleeping } from '../api/sleeping';

interface SleepingData {
  startTime: string;
  endTime: string;
  notes?: string;
}
export const useSleeping = (babyId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const run = useCallback(
    async (action: 'start' | 'end', data: SleepingData) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        if (action === 'start') {
          await createStartSleeping(babyId, data);
        } else {
          await createEndSleeping(babyId, data);
        }

        setSuccess(true);
      } catch (err: any) {
        setError(err?.message || 'שגיאה בפעולת שינה');
      } finally {
        setLoading(false);
      }
    },
    [babyId]
  );

  return {
    startSleeping: (data: SleepingData) => run('start', data),
    endSleeping: (data: SleepingData) => run('end', data),
    loading,
    error,
    success,
  };
};
