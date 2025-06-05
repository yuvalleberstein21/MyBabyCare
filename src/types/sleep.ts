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
