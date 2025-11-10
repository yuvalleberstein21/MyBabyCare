import { useState } from 'react';
import { deleteBaby } from '../api/babies';

export const useDeleteBaby = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDeleteBaby = async (babyId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await deleteBaby(babyId);
      setSuccess(true);
    } catch (err: any) {
      console.error('❌ שגיאה במחיקת תינוק:', err);
      setError(err.message || 'שגיאה במחיקת תינוק');
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteBaby, loading, error, success };
};
