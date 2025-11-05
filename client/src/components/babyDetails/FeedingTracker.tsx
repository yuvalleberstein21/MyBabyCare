import { useState } from 'react';
import Button from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import { Title } from '../ui/Title';
import { SubTitle } from '../ui/SubTitle';
import { AddFeedingDialog } from './AddFeedingDialog';

export const FeedingTracker = () => {
  return (
    <div>
      <AddFeedingDialog
        // open={isDialogOpen}
        // onClose={() => setIsDialogOpen(false)}
        onSave={() => console.log('Saved!')}
      />
    </div>
  );
};
