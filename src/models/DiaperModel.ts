import mongoose from 'mongoose';
import { IDiapper } from '../types/diaper';

const Schema = mongoose.Schema;

const diaperSchema = new Schema<IDiapper>(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: true,
    },
    time: Date,
    type: String,
    notes: String,
  },
  { timestamps: true }
);

export const Diaper = mongoose.model<IDiapper>('Diaper', diaperSchema);
