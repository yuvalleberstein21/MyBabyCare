import mongoose from 'mongoose';
import { IFeeding } from '../types/feeding';

const Schema = mongoose.Schema;

const feedSchema = new Schema<IFeeding>(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: true,
    },
    type: { type: String, required: true },
    amount: String,
    time: { type: Date, required: true },
    notes: String,
  },
  { timestamps: true }
);

export const Feeding = mongoose.model<IFeeding>('Feeding', feedSchema);
