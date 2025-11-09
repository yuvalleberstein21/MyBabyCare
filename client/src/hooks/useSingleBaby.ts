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

      // אם ה-baby לא קיים בנתונים
      if (!data.baby) {
        setError('NOT_FOUND');
        setBaby(null);
      } else {
        setBaby(data.baby);
      }
    } catch (err: any) {
      setError(err.message || 'שגיאה בנתונים');
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
