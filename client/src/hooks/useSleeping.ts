import { useCallback, useState } from 'react';
import {
  createStartSleeping,
  createEndSleeping,
  updateSleeping,
  deleteSleep,
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
      action: 'start' | 'end' | 'update' | 'remove',
      data?:
        | StartSleepingData
        | EndSleepingData
        | { sleepId: string; payload?: Partial<UpdateSleepSession> }
        | string
    ) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        switch (action) {
          case 'start':
            await createStartSleeping(babyId, data as StartSleepingData);
            break;

          case 'end':
            await createEndSleeping(babyId, data as EndSleepingData);
            break;

          case 'update': {
            const { sleepId, payload } = data as {
              sleepId: string;
              payload: Partial<UpdateSleepSession>;
            };
            await updateSleeping(sleepId, payload);
            break;
          }

          case 'remove':
            await deleteSleep(data as string);
            break;
        }

        setSuccess(true);
      } catch (err: any) {
        setError(err?.message || 'שגיאה בפעולת שינה');
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
    updateSleeping: (sleepId: string, payload: Partial<UpdateSleepSession>) =>
      run('update', { sleepId, payload }),
    remove: (sleepId: string) => run('remove', sleepId),
    loading,
    error,
    success,
  };
};
