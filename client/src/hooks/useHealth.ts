import { useState } from 'react';
import { createHealth, updateHealth, deleteHealth } from '../api/health';
import type { HealthPayload } from '../types';

export const useHealthActions = (babyId: string) => {
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

  const create = async (data: HealthPayload) => {
    await run(() => createHealth(babyId, data));
  };

  const update = async (healthId: string, data: Partial<HealthPayload>) => {
    await run(() => updateHealth(healthId, data));
  };

  const remove = async (healthId: string) => {
    await run(() => deleteHealth(healthId));
  };

  return { create, update, remove, loading, error, success };
};
