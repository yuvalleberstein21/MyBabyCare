import { Request, Response } from 'express';
import dailySummary from '../models/dailySummary';

export const getDailySummary = async (req: Request, res: Response) => {
  const dailyData = await dailySummary.find();
  res.json({ dailySummary: dailyData });
};
