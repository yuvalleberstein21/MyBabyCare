import type { ID } from './baby.types';
import type { DiaperChange } from './diaper.types';
import type { Feeding } from './feeding.types';
import type { HealthRecord } from './health.types';
import type { SleepSession } from './sleep.types';

export interface DaySummaryMeta {
  dateRange: {
    start: string;
    end: string;
  };
}

export interface DaySummaryData {
  babyId: ID;
  date: string;
  meta: DaySummaryMeta;
  summary: {
    feedings: Feeding[];
    sleepSessions: SleepSession[];
    diaperChanges: DiaperChange[];
    healthRecords: HealthRecord[];
  };
}

export interface DaySummaryResponse {
  success: boolean;
  data: DaySummaryData;
}
