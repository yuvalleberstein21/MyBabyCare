import { Document, Types } from 'mongoose';
// חיתולים
export type DiaperType = 'רטוב' | 'מלוכלך' | 'שניהם';

export interface IDiaper extends Document {
  babyId: Types.ObjectId;
  time: Date;
  type: DiaperType;
  notes?: string;
}
