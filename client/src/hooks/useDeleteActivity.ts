import { useDiaperActions } from './useDiaper';
import { useFeedingActions } from './useFeeding';
import { useHealthActions } from './useHealth';

export const useDeleteActivity = (babyId: string) => {
  const feeding = useFeedingActions(babyId);
  const diaper = useDiaperActions(babyId);
  const health = useHealthActions(babyId);

  const deleteActivity = async (id: string, type: string) => {
    let hookToUse;

    switch (type) {
      case 'feeding':
        hookToUse = feeding;
        break;
      case 'diaper':
        hookToUse = diaper;
        break;
      case 'health':
        hookToUse = health;
        break;
      default:
        throw new Error('Unsupported activity type');
    }

    await hookToUse.remove(id);
  };

  return {
    deleteActivity,
    loading: feeding.loading || diaper.loading || health.loading,
    error: feeding.error || diaper.error || health.error,
  };
};
