import { RequestHandler } from 'express';
import { validateObjectId } from '../utils/validateObjectId';
import { IDiaper } from '../types/diaper';
import { Diaper } from '../models/DiaperModel';
import { IBaby } from '../types/baby';
import { IHealth, IHealthPopulated } from '../types/health';
import { Health } from '../models/healthModel';

declare module 'express-serve-static-core' {
  interface Request {
    health?: IHealth | IHealthPopulated;
  }
}
export const verifyHealthOwnership: RequestHandler = async (req, res, next) => {
  const { healthId } = req.params;

  if (!validateObjectId(healthId, res, 'מזהה רשומה')) return;

  try {
    const health = await Health.findById(healthId)
      .populate<{ babyId: IBaby }>('babyId', 'userId')
      .lean<IHealthPopulated>();

    if (!health || health.babyId.userId.toString() !== req.user!.id) {
      res.status(404).json({
        error: 'רשומה לא נמצאה או לא שייכת למשתמש',
      });
      return;
    }

    req.health = health;
    next();
  } catch (error) {
    console.error('שגיאה בבדיקת בעלות רשומה:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
