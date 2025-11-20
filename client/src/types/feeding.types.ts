import type { ID } from './baby.types';

export type FeedingType = 'בקבוק' | 'הנקה' | 'מוצקים';

export interface Feeding {
  _id: ID;
  babyId: ID;
  type: FeedingType;
  amount?: string;
  time: string;
  notes?: string;
}

export interface FeedingPayload {
  type: FeedingType;
  amount?: string;
  time: string;
  notes?: string;
}
