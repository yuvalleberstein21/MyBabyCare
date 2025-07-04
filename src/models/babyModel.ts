import mongoose from 'mongoose';
import { IBaby } from '../types/baby';

const babySchema = new mongoose.Schema<IBaby>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['זכר', 'נקבה'],
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    notes: String,
    image: {
      type: String,
      default: '/images/default-baby.png', // תמונת ברירת מחדל
    },
  },
  { timestamps: true }
);

export const Baby = mongoose.model<IBaby>('Baby', babySchema);
