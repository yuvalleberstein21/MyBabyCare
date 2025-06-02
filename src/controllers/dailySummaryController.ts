import { Request, Response } from 'express';
import dailySummary from '../models/dailySummary';

export const getDailySummary = async (req: Request, res: Response) => {
  try {
    const { fromDate } = req.query;

    if (!fromDate) {
      res.status(400).json({ error: 'חסר fromDate בשאילתה' });
      return;
    }

    const start = new Date(fromDate as string);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    const summaries = await dailySummary.find({
      date: {
        $gte: start,
        $lt: end,
      },
    });

    res.json(summaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
