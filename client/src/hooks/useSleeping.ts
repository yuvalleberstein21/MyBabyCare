import { useCallback, useState } from 'react';
import { createEndSleeping, createStartSleeping } from '../api/sleeping';
import type { StartSleepingData, EndSleepingData } from '../types/sleep.types';

export const useSleeping = (babyId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const run = useCallback(
    async (
      action: 'start' | 'end',
      data: StartSleepingData | EndSleepingData
    ) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        if (action === 'start') {
          await createStartSleeping(babyId, data as StartSleepingData);
        } else {
          await createEndSleeping(babyId, data as EndSleepingData);
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
    startSleeping: (data: StartSleepingData) => run('start', data),
    endSleeping: (data: EndSleepingData) => run('end', data),
    loading,
    error,
    success,
  };
};
