import { Document, Types } from 'mongoose';

export interface ISleep extends Document {
  babyId: Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  notes?: string;
}
