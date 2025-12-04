// @ts-nocheck
import type { DayActivity } from '../types';
import {
  normalizeDiaperPayload,
  normalizeFeedingPayload,
  normalizeHealthPayload,
  normalizeSleepingPayload,
} from '../utils/normalizeDataPayload';
import { useDiaperActions } from './useDiaper';
import { useFeedingActions } from './useFeeding';
import { useHealthActions } from './useHealth';
import { useSleeping } from './useSleeping';

export const useUpdateActivity = (babyId: string) => {
  const feeding = useFeedingActions(babyId);
  const diaper = useDiaperActions(babyId);
  const health = useHealthActions(babyId);
  const sleep = useSleeping(babyId);

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
      case 'sleep':
        normalized = normalizeSleepingPayload(updatedData);
        hookToUse = sleep;
        break;
      default:
        return;
    }

    await hookToUse.update(act._id, normalized);
  };
  const loading =
    feeding.loading || diaper.loading || health.loading || sleep.loading;
  const error = feeding.error || diaper.error || health.error || sleep.error;

  return { updateActivity, loading, error };
};
