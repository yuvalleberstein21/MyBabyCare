import { Request, Response } from 'express';
import { DailySummaryModel } from '../models/dailySummary';
import mongoose from 'mongoose';
import { Feeding } from '../models/feedingModel';
import { Diaper } from '../models/DiaperModel';
import { Sleeping } from '../models/sleepModel';

export const getDailySummary = async (req: Request, res: Response) => {
  try {
    const { babyId } = req.params;
    const { date } = req.query;

    if (!babyId || !date) {
      res.status(400).json({ error: 'חסר תאריך או מזהה תינוק' });
      return;
    }
    const summaryDate = new Date(date as string);
    const nextDay = new Date(summaryDate);
    nextDay.setDate(summaryDate.getDate() + 1);

    const babyObjectId = new mongoose.Types.ObjectId(babyId);

    const [feedings, diaperChanges, sleepSessions] = await Promise.all([
      Feeding.find({
        babyId: babyObjectId,
        time: { $gte: summaryDate, $lt: nextDay },
      }).exec(),

      Diaper.find({
        babyId: babyObjectId,
        time: { $gte: summaryDate, $lt: nextDay },
      }).exec(),

      Sleeping.find({
        babyId: babyObjectId,
        startTime: { $lt: nextDay },
        $or: [
          { endTime: { $gte: summaryDate } },
          { endTime: { $exists: false } },
        ],
      }).exec(),
    ]);

    res.status(200).json({
      babyId,
      date: summaryDate.toISOString().split('T')[0],
      feedings,
      diaperChanges,
      sleepSessions,
    });
  } catch (error) {
    console.error('שגיאה בקבלת סיכום יומי:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
