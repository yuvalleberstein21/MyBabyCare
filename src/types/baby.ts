import { Document, Types } from 'mongoose';
// מידע של תינוק

export interface IBaby extends Document {
  userId: Types.ObjectId;
  name: string;
  gender?: string | null;
  birthDate?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  image: string | null;
}
