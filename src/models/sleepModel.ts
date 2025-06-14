import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sleepSchema = new Schema(
  {
    babyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Baby',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    notes: String,
  },
  { timestamps: true }
);

export const Sleeping = mongoose.model('Sleeping', sleepSchema);
