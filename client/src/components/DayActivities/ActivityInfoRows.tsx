// @ts-nocheck
import { SubTitle } from '../ui/SubTitle';
import { Clock, StickyNote, Timer, Milk, Baby } from 'lucide-react';
import {
  formatTimeOnly,
  formatTimeSleepingOnly,
} from '../../utils/FormatedISDate';
import type { Activity } from '../../types/activity.types';

interface ActivityInfoRowsProps {
  act: Activity;
}

export const ActivityInfoRows = ({ act }: ActivityInfoRowsProps) => {
  console.log(act);
  const infoRows = [
    act.time && { label: 'שעה', value: formatTimeOnly(act.time), icon: Clock },
    'startTime' in act &&
      act.startTime && {
        label: 'התחלה',
        value: formatTimeSleepingOnly(act.startTime),
        icon: Clock,
      },
    'endTime' in act &&
      act.endTime && {
        label: 'סיום',
        value: formatTimeSleepingOnly(act.endTime),
        icon: Clock,
      },
    'feedingType' in act &&
      act.feedingType && {
        label: 'סוג האכלה',
        value: act.feedingType,
        icon: Milk,
      },
    'diaperType' in act &&
      act.diaperType && {
        label: 'סוג החלפה',
        value: act.diaperType,
        icon: Baby,
      },
    'healthType' in act &&
      act.healthType && {
        label: 'סוג טיפול',
        value: act.healthType,
        icon: Baby,
      },
    act.value && { label: 'תיאור רשומה', value: act.value, icon: Baby },
    'duration' in act &&
      act.duration && {
        label: 'משך',
        value: `${act.duration} דק'`,
        icon: Timer,
      },
    'amount' in act &&
      act.amount && { label: 'כמות', value: act.amount, icon: Milk },
    act.notes && { label: 'הערות', value: act.notes, icon: StickyNote },
  ].filter(Boolean) as { label: string; value: string | number; icon: any }[];

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
