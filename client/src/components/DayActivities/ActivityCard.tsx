import { useState } from 'react';
import {
  formatTimeOnly,
  typeIcons,
  typeLabels,
} from '../../utils/FormatedISDate';
import { Clock, StickyNote, Timer, Milk, X, Edit, Baby } from 'lucide-react';
import { EditActivityForm } from './EditActivityForm/EditActivityForm';
import { SubTitle } from '../ui/SubTitle';
import { useParams } from 'react-router-dom';
import { Loader } from '../ui/Loader';
import { useUpdateActivity } from '../../hooks/useUpdateActivity';
import { ActivityInfoRows } from './ActivityInfoRows';

const colorMap = {
  feeding: 'bg-green-200 border-green-400',
  diaper: 'bg-yellow-200 border-yellow-400',
  sleep: 'bg-blue-200 border-blue-400',
  health: 'bg-pink-200 border-pink-400',
};

export const ActivityCard = ({ act, refreshSummary }) => {
  const { babyId } = useParams();
  const [openEditActivityForm, setOpenEditActivityForm] = useState(false);

  const { updateActivity, loading } = useUpdateActivity(babyId!);

  const toggleEditActivityForm = () => setOpenEditActivityForm((prev) => !prev);

  const handleSave = async (updatedData) => {
    await updateActivity(act, updatedData);
    refreshSummary?.();
    setOpenEditActivityForm(false);
  };

  return (
    <>
      <div
        className={`p-4 rounded-xl shadow-sm border flex flex-col gap-3 transition ${
          colorMap[act.type]
        }`}
      >
        {/* כותרת */}
        <div className="flex items-center justify-between">
          {/* ימין — סוג הפעילות */}
          <div className="flex items-center gap-2">
            <span className="text-xl">{typeIcons[act.type]}</span>
            <span className="font-bold text-gray-900 text-lg">
              {typeLabels[act.type]}
            </span>
          </div>

          {/* שמאל — כפתורי עריכה */}
          <div className="flex items-center gap-3">
            <Edit
              className="w-4 h-4 cursor-pointer"
              onClick={toggleEditActivityForm}
            />
            <X className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* שדות */}
        {/* שדות */}
        <div className="flex flex-col gap-2 mt-1">
          <ActivityInfoRows act={act} />
        </div>
      </div>

      {openEditActivityForm &&
        (loading ? (
          <Loader />
        ) : (
          <EditActivityForm
            act={act}
            onSave={handleSave}
            onClose={toggleEditActivityForm}
          />
        ))}
    </>
  );
};
