import mongoose from 'mongoose';
import { IDiaper } from '../types/diaper';

const Schema = mongoose.Schema;

const diaperSchema = new Schema<IDiaper>(
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

export const Diaper = mongoose.model<IDiaper>('Diaper', diaperSchema);
