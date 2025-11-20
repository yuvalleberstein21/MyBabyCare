import type { ID } from './baby.types';

export interface EndSleepSession {
  _id: ID;
  babyId: ID;
  endTime?: string;
}

export interface StartSleepSession {
  _id: ID;
  babyId: ID;
  startTime: string;
}

export interface SleepPayload {
  startTime: string;
  endTime: string;
  notes?: string;
}
