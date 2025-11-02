import { useEffect, useState } from 'react';
import { getBabies } from '../api/babies';

export const useBabies = () => {
  const [babies, setBabies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBabies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBabies();
      setBabies(data);
    } catch (err: any) {
      console.error('❌ שגיאה בטעינת התינוקות:', err);
      setError(err?.response?.data?.error || 'שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBabies();
  }, []);

  return {
    babies,
    loading,
    error,
    refetch: fetchBabies,
    setBabies,
  };
};
