import { useEffect, useState } from 'react';
import { getSingleBaby } from '../api/babies';

export const useSingleBaby = (babyId: string | undefined) => {
  const [baby, setBaby] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBaby = async () => {
    if (!babyId) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getSingleBaby(babyId);
      setBaby(data.baby || data);
    } catch (err: any) {
      console.error('❌ שגיאה בטעינת תינוק יחיד:', err);
      setError(err?.response?.data?.error || 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBaby();
  }, [babyId]);

  return {
    baby,
    loading,
    error,
    refetch: fetchBaby,
    setBaby,
  };
};
