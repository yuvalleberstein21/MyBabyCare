import { RequestHandler } from 'express';
import { Sleeping } from '../models/sleepModel';
import { validateObjectId } from '../utils/validateObjectId';
import { ISleep } from '../types/sleep';
import { IBaby } from '../types/baby';

declare module 'express-serve-static-core' {
  interface Request {
    sleeping?: ISleep;
  }
}

export const verifySleepingOwnership: RequestHandler = async (
  req,
  res,
  next
) => {
  const { sleepingId } = req.params;
  const userId = req.user?.id;

  if (!validateObjectId(sleepingId, res, 'מזהה שינה')) return;

  try {
    const sleeping = await Sleeping.findById(sleepingId)
      .populate<{
        babyId: IBaby;
      }>('babyId', 'userId')
      .lean();
    // const sleeping = await Sleeping.findById(sleepingId).populate('babyId');

    if (!sleeping || sleeping.babyId.userId.toString() !== req.user!.id) {
      res.status(404).json({ error: 'האכלה לא נמצאה או לא שייכת למשתמש' });
      return;
    }

    // if (!sleeping) {
    //   res.status(404).json({ error: 'שינה לא נמצאה' });
    //   return;
    // }

    // const baby = sleeping.babyId as any;
    // if (baby.userId.toString() !== userId) {
    //   res.status(403).json({ error: 'אין הרשאה לפעולה זו' });
    //   return;
    // }

    req.sleeping = sleeping as any;
    next();
  } catch (error) {}
};
