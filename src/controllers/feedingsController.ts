import { Request, RequestHandler, Response } from 'express';
import { validateObjectId } from '../utils/validateObjectId';
import { Feeding } from '../models/feedingModel';

export const getFeedings = (req: Request, res: Response) => {
  res.send('get all feedings of baby');
};

export const createFeeding: RequestHandler = async (req, res) => {
  const { babyId } = req.params;
  const { type, amount, time, notes } = req.body;

  try {
    if (!validateObjectId(babyId, res, 'מזהה תינוק')) return;

    if (!type || !amount || !time) {
      res.status(400).json({ error: 'אנא מלא/י את כל שדות החובה' });
      return;
    }

    const feedingTime = time ? new Date(time) : new Date();

    const newFeed = new Feeding({
      babyId,
      type,
      amount,
      time: feedingTime,
      notes,
    });

    await newFeed.save();

    res
      .status(201)
      .json({ message: 'הוספת האכלה בוצעה בהצלחה!', feed: newFeed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
