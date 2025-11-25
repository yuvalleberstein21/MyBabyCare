import { Document, Types } from 'mongoose';
import { IBaby } from './baby';

export interface IHealth extends Document {
  babyId: Types.ObjectId | IBaby;
  type: string;
  value: number | string;
  notes?: string;
  time: Date;
}

export interface IHealthPopulated extends Omit<IHealth, 'babyId'> {
  babyId: IBaby;
}
