import { AddDiaperDialog } from '../Dialogs/AddDiaperDialog';
import AddFeedingDialog from '../Dialogs/AddFeedingDialog';
import AddHealthDialog from '../Dialogs/AddHealthDialog';

interface ActivityModalManagerProps {
  activeActivity: string | null;
  babyId: string;
  onClose: () => void;
}
export const ActivityModalManager: React.FC<ActivityModalManagerProps> = ({
  activeActivity,
  babyId,
  onClose,
}) => {
  switch (activeActivity) {
    case 'feeding':
      return <AddFeedingDialog babyId={babyId} open onClose={onClose} />;

    case 'diaper':
      return <AddDiaperDialog babyId={babyId} onClose={onClose} />;

    case 'health':
      return <AddHealthDialog babyId={babyId} open onClose={onClose} />;

    default:
      return null;
  }
};
