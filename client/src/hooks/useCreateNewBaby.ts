import { useState } from 'react';
import { createNewBaby } from '../api/babies';

interface BabyData {
  name: string;
  gender: string;
  birthDate: string;
  weight: number;
  height: number;
  notes?: string;
  image?: string;
}

export const useCreateNewBaby = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateNewBaby = async (babyData: BabyData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createNewBaby(babyData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'שגיאה ביצירת תינוק');
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateNewBaby, loading, error, success };
};
