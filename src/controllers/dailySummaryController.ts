import { Request, Response } from 'express';
import dailySummary from '../models/dailySummary';

export const getDailySummary = async (req: Request, res: Response) => {
  try {
    const { fromDate, feedingType, minAmount, diaperType } = req.query;

    if (!fromDate) {
      res.status(400).json({ error: 'חסר fromDate בשאילתה' });
      return;
    }

    const start = new Date(fromDate as string);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    const query: any = {
      date: { $gte: start, $lt: end },
    };

    // פילטר לפי סוג האכלה
    if (feedingType) {
      query.feedings = { $elemMatch: { type: feedingType } };
    }

    // פילטר לפי מינימום כמות
    if (minAmount) {
      query.feedings = {
        $elemMatch: {
          amount: { $gte: minAmount },
        },
      };
    }

    // פילטר לפי סוג חיתול
    if (diaperType) {
      query.diaperChanges = { $elemMatch: { type: diaperType } };
    }

    const summaries = await dailySummary.find(query).populate('babyId');

    res.json(summaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
