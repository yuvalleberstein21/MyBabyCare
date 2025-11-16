import { AddDiaperModal } from './AddDiaperDialog';
import AddFeedingDialog from './AddFeedingDialog';
import { SleepTracker } from './SleepTracker';

export const ActivityModalManager = ({ activeActivity, babyId, onClose }) => {
  switch (activeActivity) {
    case 'feeding':
      return <AddFeedingDialog babyId={babyId} open onClose={onClose} />;

    case 'diaper':
      return <AddDiaperModal babyId={babyId} onClose={onClose} />;

    case 'sleep':
      return <SleepTracker onClose={onClose} />;

    default:
      return null;
  }
};
