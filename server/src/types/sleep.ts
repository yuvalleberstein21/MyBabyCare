import { Document, Types } from 'mongoose';
import { IBaby } from './baby';

export interface ISleep extends Document {
  babyId: Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  notes?: string;
}
export type ISleepPopulated = Omit<ISleep, 'babyId'> & {
  babyId: IBaby;
};

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
