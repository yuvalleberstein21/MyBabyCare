import { SubTitle } from '../ui/SubTitle';
import { Clock, StickyNote, Timer, Milk, Baby } from 'lucide-react';
import { formatTimeOnly } from '../../utils/FormatedISDate';

export const ActivityInfoRows = ({ act }) => {
  const infoRows = [
    act.time && { label: 'שעה', value: formatTimeOnly(act.time), icon: Clock },
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
      value: act.feedingType,
      icon: Milk,
    },
    act.diaperType && { label: 'סוג החלפה', value: act.diaperType, icon: Baby },
    act.healthType && { label: 'סוג טיפול', value: act.healthType, icon: Baby },
    act.value && { label: 'תיאור רשומה', value: act.value, icon: Baby },
    act.duration && { label: 'משך', value: `${act.duration} דק'`, icon: Timer },
    act.amount && { label: 'כמות', value: act.amount, icon: Milk },
    act.notes && { label: 'הערות', value: act.notes, icon: StickyNote },
  ].filter(Boolean);

  return (
    <>
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
    </>
  );
};
