import { useState } from 'react';
import {
  formatTimeOnly,
  typeIcons,
  typeLabels,
} from '../../utils/FormatedISDate';
import { Clock, StickyNote, Timer, Milk, X, Edit, Baby } from 'lucide-react';
import { EditActivityForm } from './EditActivityForm/EditActivityForm';
import { SubTitle } from '../ui/SubTitle';
import { useFeedingActions } from '../../hooks/useFeeding';
import { useParams } from 'react-router-dom';
import {
  normalizeFeedingPayload,
  normalizeSleepingPayload,
} from '../../utils/normalizeDataPayload';
import { Loader } from '../ui/Loader';

const colorMap = {
  feeding: 'bg-green-200 border-green-400',
  diaper: 'bg-yellow-200 border-yellow-400',
  sleep: 'bg-blue-200 border-blue-400',
  health: 'bg-pink-200 border-pink-400',
};

export const ActivityCard = ({ act, refreshSummary }) => {
  const { babyId } = useParams();
  const [openEditActivityForm, setOpenEditActivityForm] = useState(false);

  const {
    update,
    loading: loadUpdateFeed,
    error: errUpdateFeed,
  } = useFeedingActions(babyId!);

  const infoRows = [
    act.time && {
      label: 'שעה',
      value: formatTimeOnly(act.time),
      icon: Clock,
    },
    act.startTime && {
      label: 'התחלה',
      value: formatTimeOnly(act.startTime),
      icon: Clock,
    },
    act.endTime && {
      label: 'סיום',
      value: formatTimeOnly(act.endTime),
      icon: Clock,
    },
    act.feedingType && {
      label: 'סוג האכלה',
      value: `${act.feedingType}`,
      icon: Milk,
    },
    act.diaperType && {
      label: 'סוג החלפה',
      value: `${act.diaperType}`,
      icon: Baby,
    },
    act.healthType && {
      label: 'סוג טיפול',
      value: `${act.healthType}`,
      icon: Baby,
    },
    act.value && {
      label: 'מצב בריאות',
      value: `${act.value}`,
      icon: Baby,
    },
    act.duration && { label: 'משך', value: `${act.duration} דק'`, icon: Timer },
    act.amount && { label: 'כמות', value: `${act.amount}`, icon: Milk },
    act.notes && { label: 'הערות', value: act.notes, icon: StickyNote },
  ].filter(Boolean);

  const toggleEditActivityForm = () => setOpenEditActivityForm((prev) => !prev);

  const handleSave = async (updatedData) => {
    let normalized;
    if (act.type === 'feeding') {
      normalized = normalizeFeedingPayload(updatedData);
    }

    if (act.type === 'sleep') {
      normalized = normalizeSleepingPayload(updatedData);
    }
    await update(act._id, normalized);
    refreshSummary?.();
    toggleEditActivityForm();
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
        <div className="flex flex-col gap-2 mt-1">
          {infoRows.map((row, i) => {
            const Icon = row.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 text-center text-gray-700"
              >
                <Icon className="w-4 h-4 text-gray-600" />
                <SubTitle className="font-semibold">{row.label}:</SubTitle>
                <span className="text-gray-600">{row.value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {openEditActivityForm &&
        (loadUpdateFeed ? (
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
