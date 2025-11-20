import type { ID } from './baby.types';

export interface SleepSession {
  _id: ID;
  babyId: ID;
  startTime: string;
  endTime?: string;
  duration?: number;
  notes?: string;
}

export interface SleepPayload {
  startTime: string;
  endTime?: string;
  notes?: string;
}
