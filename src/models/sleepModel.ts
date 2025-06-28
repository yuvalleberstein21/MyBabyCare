import mongoose from 'mongoose';
import { ISleep } from '../types/sleep';

const sleepSchema = new mongoose.Schema<ISleep>(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: Date,
    notes: String,
  },
  { timestamps: true }
);

sleepSchema.index({ babyId: 1, startTime: -1 });

export const Sleeping = mongoose.model<ISleep>('Sleeping', sleepSchema);
