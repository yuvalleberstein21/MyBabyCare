import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user';

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, 'שם מלא נדרש'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'אימייל נדרש'],
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'פורמט אימייל לא תקין'],
    },
    password: {
      type: String,
      minlength: [4, 'סיסמה חייבת להכיל לפחות 4 תווים'],
      required: [true, 'סיסמה נדרשת'],
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

export const User = mongoose.model<IUser>('User', userSchema);
