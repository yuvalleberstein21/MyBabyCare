import { DiaperLog } from './diaper';
import { FeedingLog } from './feeding';

// סיכום יומי
export type DailySummary = {
  babyId: object;
  date: Date;
  feedings: Omit<FeedingLog, 'id' | 'babyId'>[];
  diaperChanges: Omit<DiaperLog, 'id' | 'babyId'>[];
  sleepSessions: {
    startTime: string;
    endTime: string;
  }[];
};
