import { Document, Types } from 'mongoose';

// האכלה
export interface IFeeding extends Document {
  babyId: Types.ObjectId;
  type: string;
  amount: Number;
  time: Date;
  notes?: string;
}
