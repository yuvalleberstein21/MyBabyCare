import { Request, RequestHandler, Response } from 'express';
import { Health } from '../models/healthModel';
import { IHealth } from '../types/health';
import { validateObjectId } from '../utils/validateObjectId';

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

export const updateHealth: RequestHandler = async (req, res) => {
  try {
    const { healthId } = req.params;

    const updateData: any = {};

    if (req.body.type !== undefined) updateData.type = req.body.type;
    if (req.body.value !== undefined) updateData.value = req.body.value;
    if (req.body.notes !== undefined) updateData.notes = req.body.notes;
    if (req.body.time) updateData.time = new Date(req.body.time);

    const updatedRecord = await Health.findByIdAndUpdate(
      healthId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      res.status(404).json({ message: 'הרשומה לא נמצאה' });
      return;
    }

    res.status(200).json({
      message: 'הרשומה עודכנה בהצלחה',
      data: updatedRecord,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'שגיאה בעדכון רשומת בריאות',
    });
  }
};
