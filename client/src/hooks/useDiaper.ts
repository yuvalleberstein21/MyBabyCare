import { useState } from 'react';
import { createDiaper, updateDiaper, deleteDiaper } from '../api/diaper';
import type { DiaperPayload } from '../types';

export const useDiaperActions = (babyId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const run = async (callback: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await callback();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'שגיאה בביצוע פעולה');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: DiaperPayload) => {
    await run(() => createDiaper(babyId, data));
  };

  const update = async (diaperId: string, data: Partial<DiaperPayload>) => {
    await run(() => updateDiaper(diaperId, data));
  };

  const remove = async (diaperId: string) => {
    await run(() => deleteDiaper(diaperId));
  };

  return { create, update, remove, loading, error, success };
};
