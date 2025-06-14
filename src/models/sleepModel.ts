import mongoose, { Schema } from 'mongoose';
import { ISleep } from '../types/sleep';

const sleepSchema = new Schema<ISleep>(
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

export const Sleeping = mongoose.model<ISleep>('Sleeping', sleepSchema);
