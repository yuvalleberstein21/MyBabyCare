import { useCallback, useState } from 'react';
import {
  createEndSleeping,
  createStartSleeping,
  updateSleeping,
} from '../api/sleeping';
import type {
  StartSleepingData,
  EndSleepingData,
  UpdateSleepSession,
} from '../types/sleep.types';

export const useSleeping = (babyId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const run = useCallback(
    async (
      action: 'start' | 'end' | 'update',
      data:
        | StartSleepingData
        | EndSleepingData
        | { sleepId: string; payload: Partial<UpdateSleepSession> }
    ) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      try {
        if (action === 'start') {
          await createStartSleeping(babyId, data as StartSleepingData);
        } else if (action === 'end') {
          await createEndSleeping(babyId, data as EndSleepingData);
        } else if (action === 'update') {
          const { sleepId, payload } = data as {
            sleepId: string;
            payload: Partial<UpdateSleepSession>;
          };
          await updateSleeping(sleepId, payload);
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
    update: (sleepId: string, payload: Partial<UpdateSleepSession>) =>
      run('update', { sleepId, payload }),
    loading,
    error,
    success,
  };
};
