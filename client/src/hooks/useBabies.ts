import { useEffect, useState } from 'react';
import {
  createNewBaby,
  deleteBabyApi,
  getBabies,
  getSingleBaby,
  updateBabyApi,
} from '../api/babies';

export const useBabies = () => {
  const [babies, setBabies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [singleBaby, setSingleBaby] = useState<any>(null);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [errorSingle, setErrorSingle] = useState<string | null>(null);

  const fetchBabies = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBabies();
      setBabies(data);
    } catch (err: any) {
      setError(err?.message || 'שגיאה בטעינה');
    } finally {
      setLoading(false);
    }
  };

  // ---- Fetch single baby ----
  const fetchSingleBaby = async (babyId?: string) => {
    if (!babyId) return;
    setLoadingSingle(true);
    setErrorSingle(null);

    try {
      const data = await getSingleBaby(babyId);
      if (!data.baby) {
        setErrorSingle('NOT_FOUND');
        setSingleBaby(null);
      } else {
        setSingleBaby(data.baby);
      }
    } catch (err: any) {
      setErrorSingle(err.message || 'שגיאה בטעינת תינוק');
    } finally {
      setLoadingSingle(false);
    }
  };

  const addBaby = async (newBabyData: any) => {
    try {
      const newBaby = await createNewBaby(newBabyData);
      setBabies((prev) => [...prev, newBaby]);
      fetchBabies();
      return newBaby;
    } catch (err: any) {
      setError(err.message || 'שגיאה בהוספה');
      throw err;
    }
  };

  // ---- Update baby ----
  const updateBaby = async (babyId: string, babyData: any) => {
    try {
      const updated = await updateBabyApi(babyId, babyData);
      setBabies((prev) => prev.map((b) => (b._id === babyId ? updated : b)));
      if (singleBaby?._id === babyId) setSingleBaby(updated);
      fetchBabies();
      return updated;
    } catch (err: any) {
      setError(err.message || 'שגיאה בעדכון');
      throw err;
    }
  };

  const deleteBaby = async (babyId: string) => {
    try {
      await deleteBabyApi(babyId);
      setBabies((prev) => prev.filter((b) => b._id !== babyId));
    } catch (err: any) {
      setError(err.message || 'שגיאה במחיקה');
    }
  };

  useEffect(() => {
    fetchBabies();
  }, []);

  return {
    babies,
    loading,
    error,
    singleBaby,
    loadingSingle,
    errorSingle,
    fetchBabies,
    fetchSingleBaby,
    addBaby,
    updateBaby,
    deleteBaby,
    setBabies,
    setSingleBaby,
  };
};
