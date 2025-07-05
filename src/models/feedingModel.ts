import mongoose from 'mongoose';
import { IFeeding } from '../types/feeding';

const feedSchema = new mongoose.Schema<IFeeding>(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: [true, 'מזהה תינוק נדרש'],
    },
    type: {
      type: String,
      trim: true,
      required: [true, 'סוג ההאכלה נדרש'],
    },
    amount: {
      type: Number,
      min: 0,
      required: [true, 'כמות האכלה נדרשת'],
    },
    time: {
      type: Date,
      default: Date.now,
      required: [true, 'זמן ההאכלה נדרש'],
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
