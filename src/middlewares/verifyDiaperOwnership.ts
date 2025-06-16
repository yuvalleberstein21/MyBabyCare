import { RequestHandler } from 'express';
import { validateObjectId } from '../utils/validateObjectId';
import { IDiaper } from '../types/diaper';
import { Diaper } from '../models/DiaperModel';

declare module 'express-serve-static-core' {
  interface Request {
    diaper?: IDiaper;
  }
}

export const verifyDiaperOwnership: RequestHandler = async (req, res, next) => {
  const { diaperId } = req.params;
  const userId = req.user?.id;

  if (!validateObjectId(diaperId, res, 'מזהה שינה')) return;

  const diaperes = await Diaper.findById(diaperId).populate('babyId');
  if (!diaperes) {
    res.status(404).json({ error: 'שינה לא נמצאה' });
    return;
  }

  const baby = diaperes.babyId as any;
  if (baby.userId.toString() !== userId) {
    res.status(403).json({ error: 'אין הרשאה לפעולה זו' });
    return;
  }

  req.diaper = diaperes;
  next();
};
