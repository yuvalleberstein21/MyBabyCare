import type { DiaperChange, DiaperType } from './diaper.types';
import type { Feeding, FeedingType } from './feeding.types';
import type { HealthRecord, HealthType } from './health.types';
import type { SleepSession } from './sleep.types';

export type ActivityType = 'feeding' | 'sleep' | 'diaper' | 'health';

export type DayActivity =
  | (Feeding & { type: 'feeding'; feedingType: FeedingType })
  | (SleepSession & { type: 'sleep' })
  | (DiaperChange & { type: 'diaper'; diaperType: DiaperType })
  | (HealthRecord & { type: 'health'; healthType: HealthType });

export interface BaseActivity {
  _id: string;
  type: ActivityType;
  time: string;
  notes?: string;
}

export interface SleepActivity extends BaseActivity {
  type: 'sleep';
  startTime: string;
  endTime?: string;
  selectedDate: string;
}

export interface FeedingActivity extends BaseActivity {
  type: 'feeding';
  feedingType: string;
  amount: string | number;
  selectedDate: string;
}

export interface DiaperActivity extends BaseActivity {
  type: 'diaper';
  diaperType: string;
  selectedDate: string;
}

export interface HealthActivity extends BaseActivity {
  type: 'health';
  healthType: string;
  value: string;
  selectedDate: string;
}

interface BaseActivityForm {
  notes?: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  feedingType?: string;
  amount?: string | number;
  diaperType?: string;
  healthType?: string;
  value?: string | number;
}

export interface EditActivityFormProps {
  act: {
    type: ActivityType;
    notes?: string;
    time?: string;
    startTime?: string;
    endTime?: string;
    feedingType?: string;
    amount?: string | number;
    diaperType?: string;
    healthType?: string;
    value?: string | number;
    selectedDate: string;
  };
  onSave: (
    updatedData: BaseActivityForm & {
      type: ActivityType;
    }
  ) => Promise<void>;
  onClose: () => void;
  selectedDate: string;
}

export type Activity = ActivityType;
