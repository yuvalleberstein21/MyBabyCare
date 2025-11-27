import mongoose from 'mongoose';
import { IBaby } from '../types/baby';

const babySchema = new mongoose.Schema<IBaby>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'מזהה משתמש נדרש'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'שם התינוק נדרש'],
      minlength: [2, 'שם התינוק חייב להכיל לפחות 2 תווים'],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['זכר', 'נקבה'],
        message: 'מין התינוק חייב להיות זכר או נקבה',
      },
      required: [true, 'מין התינוק נדרש'],
    },
    birthDate: {
      type: Date,
      required: [true, 'תאריך לידה נדרש'],
      validate: {
        validator: function (value: Date) {
          return value <= new Date();
        },
        message: 'תאריך הלידה לא יכול להיות בעתיד',
      },
    },
    weight: {
      type: Number,
      min: [0, 'המשקל לא יכול להיות שלילי'],
      max: [20, 'המשקל לא יכול להיות מעל 20 ק"ג'],
      default: null,
    },
    height: {
      type: Number,
      min: [0, 'הגובה לא יכול להיות שלילי'],
      max: [120, 'הגובה לא יכול להיות מעל 120 ס"מ'],
      default: null,
    },
    notes: {
      type: String,
      maxlength: [200, 'הערות לא יכולות להיות יותר מ-200 תווים'],
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Baby = mongoose.model<IBaby>('Baby', babySchema);
