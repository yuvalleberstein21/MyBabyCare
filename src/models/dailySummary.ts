import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { DailySummary } from '../types';

const DailySummarySchema = new Schema<DailySummary>({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baby',
    required: true,
  },
  date: { type: String, required: true },
  feedings: [
    {
      time: { type: String, required: true },
      type: { type: String, required: true },
      amount: { type: String, required: true },
    },
  ],
  diaperChanges: [
    {
      time: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
  sleepSessions: [
    {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
});

export default mongoose.model<DailySummary>('DailySummary', DailySummarySchema);
