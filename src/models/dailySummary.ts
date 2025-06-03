import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { DailySummary } from '../types';

const DailySummarySchema = new Schema<DailySummary>({
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

export default mongoose.model<DailySummary>('DailySummary', DailySummarySchema);
