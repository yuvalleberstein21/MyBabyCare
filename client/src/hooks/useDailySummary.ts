import { useState, useCallback } from 'react';
import { getDailySummary } from '../api/dailySummary';

export const useDailySummary = () => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async (babyId: string, date: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDailySummary(babyId, date);
      setSummary(data);
      return data;
    } catch (err: any) {
      const message =
        err?.response?.data?.error ||
        err?.message ||
        'שגיאה בטעינת הסיכום היומי';

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    summary,
    loading,
    error,
    fetchSummary,
  };
};
