import { useState } from 'react';

import { createDiaper } from '../api/diaper';
import type { DiaperPayload } from '../types';

export const useCreateDiaper = (babyId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateDiaper = async (diaperData: DiaperPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createDiaper(babyId, diaperData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'שגיאה ביצירת האכלה');
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateDiaper, loading, error, success };
};
