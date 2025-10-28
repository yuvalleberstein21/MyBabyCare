import { Document, Types } from 'mongoose';
// מידע של תינוק

export interface IBaby extends Document {
  userId: Types.ObjectId;
  name: string;
  gender: 'זכר' | 'נקבה';
  birthDate: Date;
  notes?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBabyRequestBody {
  name: string;
  gender: 'זכר' | 'נקבה';
  birthDate: string;
  notes?: string;
  image?: string;
}

export interface UpdateBabyRequestBody {
  name?: string;
  gender?: 'זכר' | 'נקבה';
  birthDate?: string;
  notes?: string;
}
