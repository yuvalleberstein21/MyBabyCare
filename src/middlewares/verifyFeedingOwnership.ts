import { Request, Response, NextFunction } from 'express';
import { Feeding } from '../models/feedingModel';
import mongoose from 'mongoose';
import { IFeeding } from '../types/feeding';
import { IBaby } from '../types/baby';

declare global {
  namespace Express {
    interface Request {
      feeding?: IFeeding | null;
    }
  }
}

export const verifyFeedingOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { feedingId } = req.params;

  // בדיקת תקינות ID
  if (!mongoose.Types.ObjectId.isValid(feedingId)) {
    res.status(400).json({ error: 'מזהה האכלה לא תקין' });
    return;
  }

  try {
    // **רק query אחד!**
    const feeding = await Feeding.findById(feedingId).populate<{
      babyId: IBaby;
    }>('babyId', 'userId'); // טיפוס נכון

    // בדיקה אחת מאוחדת
    if (!feeding || feeding.babyId.userId.toString() !== req.user!.id) {
      res.status(404).json({ error: 'האכלה לא נמצאה או לא שייכת למשתמש' });
      return;
    }

    // שמירה ב-request
    req.feeding = feeding as any;
    next();
  } catch (error) {
    console.error('שגיאה באימות בעלות האכלה:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
