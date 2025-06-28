import mongoose from 'mongoose';
import { IDiaper } from '../types/diaper';

const diaperSchema = new mongoose.Schema<IDiaper>(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: true,
    },
    time: {
      type: Date,
    },
    type: {
      type: String,
      enum: ['רטוב', 'מלוכלך', 'שניהם'],
      required: true,
    },
    notes: String,
  },
  { timestamps: true }
);

diaperSchema.index({ babyId: 1, time: -1 });

export const Diaper = mongoose.model<IDiaper>('Diaper', diaperSchema);
