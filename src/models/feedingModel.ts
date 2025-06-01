import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const feedSchema = new Schema(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: true,
    },
    type: String,
    amount: String,
    time: Date,
    notes: String,
  },
  { timestamps: true }
);

export const Feeding = mongoose.model('Feeding', feedSchema);
