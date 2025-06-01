import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      min: 4,
      required: true,
    },
    babies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Baby',
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
