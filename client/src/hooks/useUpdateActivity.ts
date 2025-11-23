import type { DayActivity } from '../types';
import {
  normalizeDiaperPayload,
  normalizeFeedingPayload,
  normalizeHealthPayload,
} from '../utils/normalizeDataPayload';
import { useDiaperActions } from './useDiaper';
import { useFeedingActions } from './useFeeding';
import { useHealthActions } from './useHealth';

export const useUpdateActivity = (babyId: string) => {
  const feeding = useFeedingActions(babyId);
  const diaper = useDiaperActions(babyId);
  const health = useHealthActions(babyId);

  const updateActivity = async (act: DayActivity, updatedData: any) => {
    let normalized;
    let hookToUse;

    switch (act.type) {
      case 'feeding':
        normalized = normalizeFeedingPayload(updatedData);
        hookToUse = feeding;
        break;
      case 'diaper':
        normalized = normalizeDiaperPayload(updatedData);
        hookToUse = diaper;
        break;
      case 'health':
        normalized = normalizeHealthPayload(updatedData);
        hookToUse = health;
        break;
      default:
        return;
    }
    console.log('Updated on server:', normalized);

    await hookToUse.update(act._id, normalized);
  };
  const loading = feeding.loading || diaper.loading || health.loading;
  const error = feeding.error || diaper.error || health.error;

  return { updateActivity, loading, error };
};
