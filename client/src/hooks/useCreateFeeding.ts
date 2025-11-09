import { useState } from 'react';
import { createFeeding } from '../api/feeding';

interface FeedingData {
  type: string;
  amount: number;
  time: string;
  notes?: string;
}

export const useCreateFeeding = (babyId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateFeeding = async (feedingData: FeedingData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createFeeding(babyId, feedingData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'שגיאה ביצירת האכלה');
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateFeeding, loading, error, success };
};
