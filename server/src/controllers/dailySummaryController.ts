import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Feeding } from '../models/feedingModel';
import { Diaper } from '../models/DiaperModel';
import { Sleeping } from '../models/sleepModel';
import { getDateRange } from '../utils/getDateRange';
import {
  IDailySummaryResponse,
  IDiaperSummary,
  IFeedingSummary,
  ISleepSummary,
} from '../types/summary';

// סיכום יומי של נתוני תינוק
export const getDailySummary = async (req: Request, res: Response) => {
  try {
    const { babyId } = req.params;
    const { date } = req.query;

    if (!babyId || !date) {
      res.status(400).json({ error: 'חסר תאריך או מזהה תינוק' });
      return;
    }

    const { start, end } = getDateRange(date as string);

    const babyObjectId = new mongoose.Types.ObjectId(babyId);

    const [feedings, diaperChanges, sleepSessions] = await Promise.all([
      Feeding.find({
        babyId: babyObjectId,
        time: { $gte: start, $lt: end },
      })
        .select('type amount time notes')
        .sort({ time: 1 })
        .lean<IFeedingSummary[]>(),

      Diaper.find({
        babyId: babyObjectId,
        time: { $gte: start, $lt: end },
      })
        .select('type time notes')
        .sort({ time: 1 })
        .lean<IDiaperSummary[]>(),

      Sleeping.find({
        babyId: babyObjectId,
        startTime: { $lt: end },
        $or: [{ endTime: { $gte: start } }, { endTime: { $exists: false } }],
      })
        .select('startTime endTime')
        .sort({ startTime: 1 })
        .lean<ISleepSummary[]>(),
    ]);

    res.status(200).json(<IDailySummaryResponse>{
      success: true,
      data: {
        babyId,
        date: start.toISOString().split('T')[0],
        summary: {
          feedings: feedings,
          diaperChanges: diaperChanges,
          sleepSessions: sleepSessions,
        },
        meta: {
          dateRange: {
            start: start.toISOString(),
            end: end.toISOString(),
          },
        },
      },
    });
  } catch (error) {
    console.error('שגיאה בקבלת סיכום יומי:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
