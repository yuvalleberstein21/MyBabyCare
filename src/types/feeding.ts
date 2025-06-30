import { Document, Types } from 'mongoose';

// האכלה
export interface IFeeding extends Document {
  babyId: Types.ObjectId;
  type: string;
  amount: number;
  time: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
