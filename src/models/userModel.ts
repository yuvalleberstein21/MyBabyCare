import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user';

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      min: 4,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // רק אם הסיסמה חדשה או שונתה

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.comparePassword = async function (bodyPassword: string) {
  return bcrypt.compare(bodyPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
