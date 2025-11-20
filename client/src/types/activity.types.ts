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
