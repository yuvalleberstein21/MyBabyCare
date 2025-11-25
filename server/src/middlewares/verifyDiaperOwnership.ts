import { RequestHandler } from 'express';
import { validateObjectId } from '../utils/validateObjectId';
import { IDiaper } from '../types/diaper';
import { Diaper } from '../models/DiaperModel';
import { IBaby } from '../types/baby';

declare module 'express-serve-static-core' {
  interface Request {
    diaper?: IDiaper;
  }
}

export const verifyDiaperOwnership: RequestHandler = async (req, res, next) => {
  const { diaperId } = req.params;

  if (!validateObjectId(diaperId, res, 'מזהה חיתולים')) return;

  try {
    const diaper = await Diaper.findById(diaperId)
      .populate<{ babyId: IBaby }>('babyId', 'userId')
      .lean();

    if (!diaper || diaper.babyId.userId.toString() !== req.user!.id) {
      res.status(404).json({
        error: 'החלפת חיתולים לא נמצאה או לא שייכת למשתמש',
      });
      return;
    }

    req.diaper = diaper as any;
    next();
  } catch (error) {
    console.error('שגיאה בבדיקת בעלות חיתולים:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
