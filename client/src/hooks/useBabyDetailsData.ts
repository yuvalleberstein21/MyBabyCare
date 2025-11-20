import { useEffect } from 'react';
import { useBabies } from './useBabies';
import { useDailySummary } from './useDailySummary';

export const useBabyDetailsData = (babyId: string, selectedDate: string) => {
  const { singleBaby, loadingSingle, errorSingle, fetchSingleBaby } =
    useBabies();
  const {
    summary,
    loading: loadingSummary,
    error,
    fetchSummary,
  } = useDailySummary();

  useEffect(() => {
    if (babyId) fetchSingleBaby(babyId);
  }, [babyId]);

  useEffect(() => {
    if (babyId) fetchSummary(babyId, selectedDate);
  }, [babyId, selectedDate]);

  const refreshSummary = () => {
    if (babyId) fetchSummary(babyId, selectedDate);
  };

  return {
    baby: singleBaby,
    loading: loadingSingle,
    error: errorSingle || error,
    loadingSummary,
    summary,
    refreshSummary,
  };
};
