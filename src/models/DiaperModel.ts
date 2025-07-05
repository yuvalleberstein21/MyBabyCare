import mongoose from 'mongoose';
import { IDiaper } from '../types/diaper';

const diaperSchema = new mongoose.Schema<IDiaper>(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: [true, 'מזהה החלפה נדרש'],
    },
    time: {
      type: Date,
      required: [true, 'זמן החלפה נדרש'],
      default: Date.now,
    },
    type: {
      type: String,
      enum: ['רטוב', 'מלוכלך', 'שניהם'],
      required: [true, 'סוג החלפה נדרש'],
    },
    notes: String,
  },
  { timestamps: true }
);

diaperSchema.index({ babyId: 1, time: -1 });

export const Diaper = mongoose.model<IDiaper>('Diaper', diaperSchema);
