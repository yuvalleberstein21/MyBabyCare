import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Baby } from '../models/babyModel';
import { IBaby } from '../types/baby';

declare global {
  namespace Express {
    interface Request {
      baby?: IBaby;
    }
  }
}
export async function verifyBabyOwnership(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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

  try {
    const baby = await Baby.findOne({ _id: babyId, userId });
    if (!baby) {
      res.status(404).json({ error: 'תינוק לא נמצא או לא שייך למשתמש' });
      return;
    }

    req.baby = baby;
    next();
  } catch (error) {
    res.status(500).json({ error: 'שגיאה בשרת' });
    return;
  }
}
