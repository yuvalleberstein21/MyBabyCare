import type { DiaperChange } from './diaper.types';
import type { Feeding } from './feeding.types';
import type { HealthRecord } from './health.types';
import type { SleepSession } from './sleep.types';

export interface DaySummaryData {
  date: string;
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
