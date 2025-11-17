import { useState } from 'react';
import { createHealth } from '../api/health';

interface HealthData {
  babyId: string;
  type: ['temperature', 'medicine', 'vaccine', 'checkup', 'symptom'];
  value: number | string;
  time: Date;
  notes?: string;
}

export const useHealth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateHealth = async (healthData: HealthData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createHealth(healthData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'שגיאה בפעולת הבריאות');
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateHealth, loading, error, success };
};
