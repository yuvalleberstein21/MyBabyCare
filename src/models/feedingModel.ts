import mongoose from 'mongoose';
import { IFeeding } from '../types/feeding';

const feedSchema = new mongoose.Schema<IFeeding>(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: true,
    },
    type: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      min: 0,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

feedSchema.index({ babyId: 1, time: -1 });

export const Feeding = mongoose.model<IFeeding>('Feeding', feedSchema);
