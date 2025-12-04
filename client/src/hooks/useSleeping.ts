import { useCallback, useState } from 'react';
import {
  createEndSleeping,
  createStartSleeping,
  deleteSleep,
  updateSleeping,
} from '../api/sleeping';
import type {
  EndSleepingData,
  StartSleepingData,
  UpdateSleepSession,
} from '../types';

export const useSleeping = (babyId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const run = useCallback(
    async (
      action: 'getSleep' | 'start' | 'end' | 'update' | 'remove',
      data?: any
    ) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        let result;

        switch (action) {
          case 'start':
            result = await createStartSleeping(babyId, data);
            break;

          case 'end':
            result = await createEndSleeping(babyId, data);
            break;

          case 'update':
            result = await updateSleeping(data.sleepId, data.payload);
            break;

          case 'remove':
            result = await deleteSleep(data);
            break;
        }

        setSuccess(true);
        return result;
      } catch (err: any) {
        const serverErr = err?.response?.data?.error;
        setError(serverErr || err?.message || 'שגיאה בפעולת שינה');
        throw err;
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
    remove: (sleepId: string) => run('remove', sleepId),
    loading,
    error,
    success,
  };
};
