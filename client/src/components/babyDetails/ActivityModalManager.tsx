import { AddDiaperModal } from './AddDiaperDialog';
import AddFeedingDialog from './AddFeedingDialog';
import AddHealthDialog from './AddHealthDialog';
import { SleepTracker } from './SleepTracker';

export const ActivityModalManager = ({ activeActivity, babyId, onClose }) => {
  switch (activeActivity) {
    case 'feeding':
      return <AddFeedingDialog babyId={babyId} open onClose={onClose} />;

    case 'diaper':
      return <AddDiaperModal babyId={babyId} onClose={onClose} />;

    case 'sleep':
      return <SleepTracker babyId={babyId} onClose={onClose} />;
    case 'health':
      return <AddHealthDialog babyId={babyId} open onClose={onClose} />;

    default:
      return null;
  }
};
