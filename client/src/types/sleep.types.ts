import type { ID } from './baby.types';

export interface StartSleepingData {
  startTime: string;
  notes?: string;
}

export interface EndSleepingData {
  endTime: string;
}

export interface StartSleepSession {
  _id: ID;
  babyId: ID;
  startTime: string;
  notes?: string;
}

export interface EndSleepSession {
  _id: ID;
  babyId: ID;
  endTime: string;
}

export interface UpdateSleepSession {
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface SleepSession {
  _id: ID;
  babyId: ID;
  startTime: string;
  endTime?: string;
  notes?: string;
}
