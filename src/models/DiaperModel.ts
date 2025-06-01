import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const diaperSchema = new Schema(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: true,
    },
    time: String,
    type: String,
    notes: String,
  },
  { timestamps: true }
);

export const Diaper = mongoose.model('Diaper', diaperSchema);
