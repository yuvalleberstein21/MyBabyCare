import mongoose from 'mongoose';
import { IHealth } from '../types/health';

const healthSchema = new mongoose.Schema<IHealth>(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: {
        values: ['temperature', 'medicine', 'vaccine', 'checkup', 'symptom'],
        message: 'סוג רשומה לא חוקי',
      },
      required: [true, 'סוג רשומה הוא שדה חובה'],
    },

    time: {
      type: Date,
      required: [true, 'תאריך ושעה הם שדות חובה'],
      default: Date.now,
    },

    value: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'ערך הרשומה הוא שדה חובה'],
    },

    notes: {
      type: String,
      maxlength: [500, 'הערות יכולות להכיל עד 500 תווים'],
      trim: true,
    },
  },
  { timestamps: true }
);

healthSchema.index({ babyId: 1, time: -1 });

export const Health = mongoose.model<IHealth>('Health', healthSchema);
