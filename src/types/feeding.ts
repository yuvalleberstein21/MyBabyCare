import { Document, Types } from 'mongoose';

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
  babyId: Types.ObjectId;
  type: string;
  amount: number;
  time: Date;
  notes?: string;
}
