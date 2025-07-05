import { Request, RequestHandler, Response } from 'express';
import { validateObjectId } from '../utils/validateObjectId';
import { Feeding } from '../models/feedingModel';
import {
  CreateFeedingRequestBody,
  IFeeding,
  UpdateFeedingRequestBody,
} from '../types/feeding';

interface FeedingParams {
  babyId?: string;
  feedingId?: string | any;
}

export const getFeedings: RequestHandler = async (req, res) => {
  try {
    const { babyId } = req.params;
    const { limit = 10, page = 1, startDate, endDate } = req.query;

    const query: any = { babyId }; // query דינמי

    if (startDate || endDate) {
      query.time = {};
      if (startDate) query.time.$gte = new Date(startDate as string);
      if (endDate) query.time.$lte = new Date(endDate as string);
    }

    const feedings: IFeeding[] = await Feeding.find(query)
      .select('type amount time notes createdAt')
      .sort({ time: -1 })
      .limit(Number(limit)) //  כמות הרשומות לעמוד.
      .skip((Number(page) - 1) * Number(limit)) // דילוג על רשומות לפי העמוד.
      .lean();

    const total = await Feeding.countDocuments(query);

    res.json({
      feedings,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)), // // סך עמודים
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const createFeeding: RequestHandler<
  FeedingParams,
  {},
  CreateFeedingRequestBody
> = async (req, res) => {
  try {
    const { babyId } = req.params;
    const { type, amount, time, notes } = req.body;

    const feedingTime = time ? new Date(time) : new Date();

    const feeding = await Feeding.create({
      babyId,
      type,
      amount,
      time: feedingTime,
      notes,
    });

    res.status(201).json({
      message: 'הוספת האכלה בוצעה בהצלחה!',
      feeding,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const editFeeding: RequestHandler<
  FeedingParams,
  {},
  UpdateFeedingRequestBody
> = async (req, res) => {
  try {
    const { feedingId } = req.params;
    const { type, amount, time, notes } = req.body;
    const updateFields = { type, amount, time, notes };

    if (!validateObjectId(feedingId, res, 'מזהה האכלה')) return;

    const updatedFeeding: IFeeding | null = await Feeding.findByIdAndUpdate(
      feedingId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedFeeding) {
      res.status(404).json({ error: 'האכלה לא נמצאה או לא שייכת למשתמש' });
      return;
    }

    res
      .status(200)
      .json({ message: 'האכלה עודכנה בהצלחה', feeding: updatedFeeding });
  } catch (error) {
    console.error('שגיאה בעדכון תינוק:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const deleteFeeding: RequestHandler = async (req, res) => {
  try {
    const { feedingId } = req.params;
    await Feeding.findByIdAndDelete(feedingId);
    res.json({ message: 'האכלה נמחקה בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת האכלה:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
