import {
  formatTimeOnly,
  typeIcons,
  typeLabels,
} from '../../utils/FormatedISDate';
import { Clock, StickyNote, Timer, Milk } from 'lucide-react';

const colorMap = {
  feeding: 'bg-green-200 border-green-400',
  diaper: 'bg-yellow-200 border-yellow-400',
  sleep: 'bg-blue-200 border-blue-400',
};

export const ActivityCard = ({ act }) => {
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
      label: 'סוג האכלה',
      value: `${act.diaperType}`,
      icon: Milk,
    },
    act.duration && { label: 'משך', value: `${act.duration} דק'`, icon: Timer },
    act.amount && { label: 'כמות', value: `${act.amount} מ״ל`, icon: Milk },
    act.notes && { label: 'הערות', value: act.notes, icon: StickyNote },
  ].filter(Boolean);

  return (
    <div
      className={`p-4 rounded-xl shadow-sm border flex flex-col gap-3 transition ${
        colorMap[act.type]
      }`}
    >
      {/* כותרת */}
      <div className="flex items-center gap-2">
        <span className="text-xl">{typeIcons[act.type]}</span>
        <span className="font-bold text-gray-900 text-lg">
          {typeLabels[act.type]}
        </span>
      </div>

      {/* שדות */}
      <div className="flex flex-col gap-2 mt-1">
        {infoRows.map((row, i) => {
          const Icon = row.icon;
          return (
            <div key={i} className="flex items-center gap-2 text-gray-700">
              <Icon className="w-4 h-4 text-gray-600" />
              <span className="font-semibold">{row.label}:</span>
              <span className="text-gray-600">{row.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
