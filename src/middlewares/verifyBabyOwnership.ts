import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Baby } from '../models/babyModel';

export async function verifyBabyOwnership(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.id;
  const { babyId } = req.params;

  if (!userId) {
    res.status(401).json({ error: 'משתמש לא מזוהה' });
    return;
  }

  if (!babyId || !mongoose.Types.ObjectId.isValid(babyId)) {
    res.status(400).json({ error: 'מזהה תינוק לא תקין' });
    return;
  }

  const babyExists = await Baby.exists({ _id: babyId, userId });
  if (!babyExists) {
    res.status(404).json({ error: 'תינוק לא נמצא או לא שייך למשתמש' });
    return;
  }

  next();
}
