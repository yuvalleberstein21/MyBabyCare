import type { ID } from './baby.types';

export type DiaperType = 'רטוב' | 'מלוכלך' | 'שניהם';

export interface DiaperChange {
  _id: ID;
  babyId: ID;
  type: DiaperType;
  time: string;
  notes?: string;
}

export interface DiaperPayload {
  type: DiaperType;
  time: string;
  notes?: string;
}
