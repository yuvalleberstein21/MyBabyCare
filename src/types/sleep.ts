import { Document, Types } from 'mongoose';

export interface ISleep extends Document {
  babyId: Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  notes?: string;
}

export interface CreateStartSleepBody {
  startTime?: string;
  notes?: string;
}

export interface CreateEndSleepBody {
  endTime?: string; // גם מחרוזת
}

export interface EditSleepBody {
  startTime?: string;
  endTime?: string;
  notes?: string;
}
