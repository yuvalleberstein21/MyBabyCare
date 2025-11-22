import type { ActivityType, DayActivity } from '../types';
import {
  normalizeDiaperPayload,
  normalizeFeedingPayload,
} from '../utils/normalizeDataPayload';
import { useDiaperActions } from './useDiaper';
import { useFeedingActions } from './useFeeding';

export const useUpdateActivity = (babyId: string) => {
  const feeding = useFeedingActions(babyId);
  const diaper = useDiaperActions(babyId);

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
      default:
        return;
    }

    await hookToUse.update(act._id, normalized);
  };
  const loading = feeding.loading || diaper.loading;
  const error = feeding.error || diaper.error;

  return { updateActivity, loading, error };
};
