import mongoose from 'mongoose';
import { IBaby } from '../types/baby';

const babySchema = new mongoose.Schema<IBaby>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: String,
    birthDate: Date,
    notes: String,
    image: {
      type: String,
      default: '/images/default-baby.png', // תמונת ברירת מחדל
    },
  },
  { timestamps: true }
);

export const Baby = mongoose.model('Baby', babySchema);
