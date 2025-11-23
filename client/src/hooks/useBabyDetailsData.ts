import { useEffect, useCallback, useState } from 'react';
import { useBabies } from './useBabies';
import { useDailySummary } from './useDailySummary';

export const useBabyDetailsData = (babyId: string, selectedDate: string) => {
  const [initialLoading, setInitialLoading] = useState(true);

  const { singleBaby, loadingSingle, errorSingle, fetchSingleBaby } =
    useBabies();
  const {
    summary,
    loading: loadingSummary,
    error: errorSummary,
    fetchSummary,
  } = useDailySummary();

  // טעינה ראשונית - רק פעם אחת
  useEffect(() => {
    if (!babyId) return;

    const loadInitialData = async () => {
      setInitialLoading(true);
      await Promise.all([
        fetchSingleBaby(babyId),
        fetchSummary(babyId, selectedDate),
      ]);
      setInitialLoading(false);
    };

    loadInitialData();
  }, [babyId]);

  useEffect(() => {
    if (!babyId || initialLoading) return;
    fetchSummary(babyId, selectedDate);
  }, [selectedDate]);

  const refreshSummary = useCallback(() => {
    if (babyId) {
      fetchSummary(babyId, selectedDate);
    }
  }, [babyId, selectedDate, fetchSummary]);

  return {
    baby: singleBaby,
    initialLoading,
    error: errorSingle,
    isFetchingSummary: loadingSummary,
    errorSummary,
    summary,
    refreshSummary,
  };
};
