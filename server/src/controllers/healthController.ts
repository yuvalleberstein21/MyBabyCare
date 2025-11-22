import { Request, Response } from 'express';
import { Health } from '../models/healthModel';

interface BabyIdParams {
  babyId?: string;
}

export const createHealth = async (
  req: Request<BabyIdParams>,
  res: Response
) => {
  try {
    const { babyId } = req.params;
    const { type, value, notes, time } = req.body;

    const healthRecord = await Health.create({
      babyId,
      type,
      value,
      notes,
      time: time ? new Date(time) : new Date(),
    });

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
