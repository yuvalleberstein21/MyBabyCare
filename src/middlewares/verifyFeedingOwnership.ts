import { Request, Response, NextFunction } from 'express';
import { Feeding } from '../models/feedingModel';
import mongoose from 'mongoose';
import { IBaby } from '../types/baby';

export const verifyFeedingOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { feedingId } = req.params;
  const userId = req.user?.id;

  if (!feedingId || !mongoose.Types.ObjectId.isValid(feedingId)) {
    res.status(400).json({ error: 'מזהה האכלה לא תקין' });
    return;
  }

  if (!userId) {
    res.status(401).json({ error: 'משתמש לא מזוהה' });
    return;
  }

  try {
    const feeding = await Feeding.findById(feedingId).populate<{
      babyId: IBaby;
    }>('babyId');

    if (!feeding || feeding.babyId.userId.toString() !== userId) {
      res.status(404).json({ error: 'האכלה לא נמצאה או לא שייכת למשתמש' });
      return;
    }

    (req as any).feeding = feeding;
    next();
  } catch (error) {
    console.error('שגיאה באימות בעלות האכלה:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
