import { Document, Types } from 'mongoose';
// חיתולים
export type DiaperType = 'רטוב' | 'מלוכלך' | 'שניהם';

export interface IDiaper extends Document {
  babyId: Types.ObjectId;
  time: Date;
  type: DiaperType;
  notes?: string;
}

export interface CreateDiaperBody {
  time?: string;
  type: DiaperType;
  notes?: string;
}

export interface EditDiaperBody {
  time?: string;
  type?: DiaperType;
  notes?: string;
}

export interface GetDiaperQuery {
  limit?: string;
  page?: string;
  startDate?: string;
  endDate?: string;
  type?: DiaperType | 'all';
}
