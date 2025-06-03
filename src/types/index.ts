// מידע של משתמש
export interface User {
  id: string;
  fullName: string;
  password: string;
}

export interface JwtUser {
  id: string;
  name: string;
}
// מידע של תינוק
export interface Baby {
  id: string;
  name: string;
  userId: string;
}

// האכלה
export type FeedingType = 'bottle' | 'breast' | 'solid';

export interface FeedingLog {
  id: number;
  babyId: number;
  time: Date;
  amount: number | null;
  type: FeedingType;
}

//שינה
export enum SleepQuality {
  Excellent = 'excellent',
  Good = 'good',
  Fair = 'fair',
  Poor = 'poor',
}

export interface SleepLog {
  id: number;
  babyId: number;
  start: string;
  end: string;
  sleepQuality?: SleepQuality;
}

// חיתולים
export type DiaperType = 'pee' | 'poop' | 'mixed';

export interface DiaperLog {
  id: number;
  babyId: number;
  time: string;
  type: DiaperType;
}

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
