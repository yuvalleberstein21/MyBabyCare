import { AddDiaperDialog } from '../Dialogs/AddDiaperDialog';
import { SleepDialog } from '../Dialogs/SleepDialog';
import AddFeedingDialog from '../Dialogs/AddFeedingDialog';
import AddHealthDialog from '../Dialogs/AddHealthDialog';

export const ActivityModalManager = ({ activeActivity, babyId, onClose }) => {
  switch (activeActivity) {
    case 'feeding':
      return <AddFeedingDialog babyId={babyId} open onClose={onClose} />;

    case 'diaper':
      return <AddDiaperDialog babyId={babyId} onClose={onClose} />;

    case 'sleep':
      return <SleepDialog babyId={babyId} onClose={onClose} />;
    case 'health':
      return <AddHealthDialog babyId={babyId} open onClose={onClose} />;

    default:
      return null;
  }
};
