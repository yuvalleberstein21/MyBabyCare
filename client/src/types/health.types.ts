import type { ID } from './baby.types';

export type HealthType = 'חום' | 'תרופה' | 'חיסון' | 'בדיקה' | 'תסמין';

export interface HealthRecord {
  _id: ID;
  babyId: ID;
  type: HealthType;
  value: number | string;
  time: Date;
  notes?: string;
}

export interface HealthPayload {
  type: HealthType;
  value: number | string;
  time: string;
  notes?: string;
}
