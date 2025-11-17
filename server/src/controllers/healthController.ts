import { RequestHandler } from 'express';
import { Health } from '../models/healthModel';

export const createHealth: RequestHandler = async (req, res) => {
  try {
    const { babyId, type, value, notes, time } = req.body;

    const healthRecord = new Health({
      babyId,
      type,
      value,
      notes,
      time: time ? new Date(time) : new Date(),
    });

    await healthRecord.save();

    res.status(201).json({
      message: 'רשומת בריאות נוצרה בהצלחה',
      data: healthRecord,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || 'שגיאה ביצירת רשומת בריאות',
    });
  }
};
