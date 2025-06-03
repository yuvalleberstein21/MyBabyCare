import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const babySchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: String,
    birthDate: Date,
    notes: String,
  },
  { timestamps: true }
);

export const Baby = mongoose.model('Baby', babySchema);
