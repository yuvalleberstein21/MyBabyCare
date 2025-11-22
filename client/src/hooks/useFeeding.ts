import { useState } from 'react';
import { createFeeding, updateFeeding, deleteFeeding } from '../api/feeding';
import type { FeedingPayload } from '../types';

export const useFeedingActions = (babyId: string) => {
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
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: FeedingPayload) => {
    await run(() => createFeeding(babyId, data));
  };

  const update = async (feedingId: string, data: Partial<FeedingPayload>) => {
    await run(() => updateFeeding(feedingId, data));
  };

  const remove = async (feedingId: string) => {
    await run(() => deleteFeeding(feedingId));
  };

  return { create, update, remove, loading, error, success };
};
