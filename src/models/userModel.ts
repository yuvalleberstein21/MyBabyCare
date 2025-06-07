import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  comparePassword(bodyPassword: string): Promise<boolean>;
  babies: [];
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true, // אינדקס = חיפוש מהיר יותר + אכיפת ייחוד
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
