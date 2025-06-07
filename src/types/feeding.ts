import { IBaby } from './baby';

// האכלה
export type FeedingType = 'bottle' | 'breast' | 'solid';

export interface FeedingLog {
  id: number;
  babyId: number;
  time: Date;
  amount: number | null;
  type: FeedingType;
}

export interface IFeeding extends Document {
  babyId: IBaby | string;
  type: string;
  amount: number;
  time: Date;
  notes?: string;
}
