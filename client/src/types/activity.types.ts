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
  id: string;
  type: ActivityType;
  time: string;
  notes?: string;
}

export interface SleepActivity extends BaseActivity {
  type: 'sleep';
  startTime: string;
  endTime?: string;
}

export interface FeedingActivity extends BaseActivity {
  type: 'feeding';
  feedingType: string;
  amount: string | number;
}

export interface DiaperActivity extends BaseActivity {
  type: 'diaper';
  diaperType: string;
}

export interface HealthActivity extends BaseActivity {
  type: 'health';
  healthType: string;
  value: string;
}

export type Activity =
  | SleepActivity
  | FeedingActivity
  | DiaperActivity
  | HealthActivity;
