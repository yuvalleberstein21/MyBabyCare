import { Document, Types } from 'mongoose';
// חיתולים
export type DiaperType = 'pee' | 'poop' | 'mixed';

export interface IDiapper extends Document {
  babyId: Types.ObjectId;
  time: Date;
  type: DiaperType;
  notes: string;
}
