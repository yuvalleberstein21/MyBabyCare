import { RequestHandler } from 'express';
import { Sleeping } from '../models/sleepModel';
import { validateObjectId } from '../utils/validateObjectId';
import { ISleep, ISleepPopulated } from '../types/sleep';
import { IBaby } from '../types/baby';

declare module 'express-serve-static-core' {
  interface Request {
    sleeping?: ISleep | ISleepPopulated;
  }
}

export const verifySleepingOwnership: RequestHandler = async (
  req,
  res,
  next
) => {
  const { sleepingId } = req.params;

  if (!validateObjectId(sleepingId, res, 'מזהה שינה')) return;

  try {
    const sleeping = await Sleeping.findById(sleepingId)
      .populate<{ babyId: IBaby }>('babyId', 'userId')
      .lean<ISleepPopulated>();

    if (!sleeping || sleeping.babyId.userId.toString() !== req.user!.id) {
      res.status(404).json({ error: 'שינה לא נמצאה או לא שייכת למשתמש' });
      return;
    }

    req.sleeping = sleeping;
    next();
  } catch (error) {
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
