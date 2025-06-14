import { Request, Response } from 'express';
import { DailySummaryModel } from '../models/dailySummary';
import mongoose from 'mongoose';

export const getDailySummary = async (req: Request, res: Response) => {
  try {
    const { babyId } = req.params;
    const { date } = req.query;

    if (!babyId || !date) {
      res.status(400).json({ error: 'חסר תאריך או מזהה תינוק' });
      return;
    }

    const start = new Date(date as string);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    const babyObjectId = new mongoose.Types.ObjectId(babyId);

    const [feedings, diaperChanges, sleepSessions] = await Promise.all([
      mongoose.connection
        .collection('feedings')
        .aggregate([
          {
            $match: {
              babyId: babyObjectId,
              time: { $gte: start, $lt: end },
            },
          },
        ])
        .toArray(),

      mongoose.connection
        .collection('diapers')
        .aggregate([
          {
            $match: {
              babyId: babyObjectId,
              time: { $gte: start, $lt: end },
            },
          },
        ])
        .toArray(),

      mongoose.connection
        .collection('sleepings')
        .aggregate([
          {
            $match: {
              babyId: babyObjectId,
              startTime: { $lt: end },
              $or: [
                { endTime: { $gte: start } },
                { endTime: { $exists: false } },
              ],
            },
          },
        ])
        .toArray(),
    ]);

    res.json({
      babyId,
      date: start.toISOString().split('T')[0],
      feedings,
      diaperChanges,
      sleepSessions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
