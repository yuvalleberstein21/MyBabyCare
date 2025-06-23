import mongoose from 'mongoose';

import { DailySummary } from '../types/summary';

const DailySummarySchema = new mongoose.Schema<DailySummary>({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baby',
    required: true,
  },
  date: { type: Date, required: true },
  feedings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feeding',
    },
  ],
  diaperChanges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Diaper',
    },
  ],
  sleepSessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sleeping',
    },
  ],
});

export const DailySummaryModel = mongoose.model<DailySummary>(
  'DailySummary',
  DailySummarySchema
);
