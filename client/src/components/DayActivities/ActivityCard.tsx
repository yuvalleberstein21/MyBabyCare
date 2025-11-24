import { useState } from 'react';
import { typeIcons, typeLabels } from '../../utils/FormatedISDate';
import { X, Edit, Loader2 } from 'lucide-react';
import { EditActivityForm } from './EditActivityForm/EditActivityForm';
import { useParams } from 'react-router-dom';
import { useUpdateActivity } from '../../hooks/useUpdateActivity';
import { ActivityInfoRows } from './ActivityInfoRows';
import { useDeleteActivity } from '../../hooks/useDeleteActivity';
import toast from 'react-hot-toast';

const colorMap = {
  feeding: 'bg-green-200 border-green-400',
  diaper: 'bg-yellow-200 border-yellow-400',
  sleep: 'bg-blue-200 border-blue-400',
  health: 'bg-pink-200 border-pink-400',
};

export const ActivityCard = ({ act, refreshSummary, selectedDate }) => {
  const { babyId } = useParams();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { updateActivity } = useUpdateActivity(babyId!);
  const { deleteActivity, loading, error } = useDeleteActivity(babyId!);

  const handleSave = async (updatedData) => {
    try {
      await updateActivity(act, updatedData);
      setIsEditOpen(false);
      refreshSummary?.();
    } catch (error) {
      console.error('Failed to update:', error);
      alert('שגיאה בעדכון הפעילות');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('האם למחוק פעילות זו?')) return;

    setIsDeleting(true);
    try {
      await deleteActivity(act._id, act.type);
      toast.success('פעולה נמחקה בהצלחה 👏🏼');
      refreshSummary?.();
    } catch (error) {
      console.error('Failed to delete:', error);
      toast.error('שגיאה במחיקת הפעולה');
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return (
      <div
        className={`p-4 rounded-xl shadow-sm border ${
          colorMap[act.type]
        } opacity-50`}
      >
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`p-4 rounded-xl shadow-sm border flex flex-col gap-3 transition hover:shadow-md ${
          colorMap[act.type]
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{typeIcons[act.type]}</span>
            <span className="font-bold text-gray-900 text-lg">
              {typeLabels[act.type]}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Edit
              className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => setIsEditOpen(true)}
            />
            <X
              className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors"
              onClick={handleDelete}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <ActivityInfoRows act={act} />
        </div>
      </div>

      {isEditOpen && (
        <EditActivityForm
          act={act}
          onSave={handleSave}
          onClose={() => setIsEditOpen(false)}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
};
