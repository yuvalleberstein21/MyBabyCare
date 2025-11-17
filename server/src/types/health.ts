import { Types } from 'mongoose';

export interface IHealth {
  babyId: Types.ObjectId;
  type: string;
  value: number | string;
  time: Date;
  notes?: string;
}
