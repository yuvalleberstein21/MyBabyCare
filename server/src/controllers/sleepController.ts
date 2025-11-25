import { Request, RequestHandler, Response } from 'express';
import { validateObjectId } from '../utils/validateObjectId';
import { Sleeping } from '../models/sleepModel';
import {
  CreateEndSleepBody,
  CreateStartSleepBody,
  EditSleepBody,
  ISleep,
} from '../types/sleep';
import {
  validateEditSleepBody,
  validateEndSleepBody,
  validateStartSleepBody,
} from '../validators/sleepValidators';

interface BabyIdParams {
  babyId?: string;
}

interface SleepingIdParams {
  sleepingId?: string | any;
}

export const getSleepings: RequestHandler<BabyIdParams> = async (req, res) => {
  try {
    const { babyId } = req.params;
    const { limit = 50, page = 1, startDate, endDate } = req.query;

    const query: any = { babyId };

    if (startDate || endDate) {
      query.startTime = {};
      if (startDate) query.startTime.$gte = new Date(startDate as string);
      if (endDate) query.startTime.$lte = new Date(endDate as string);
    }

    const sleeping: ISleep[] = await Sleeping.find(query)
      .select('startTime endTime notes createdAt')
      .sort({ startTime: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .lean();

    const total = await Sleeping.countDocuments(query);

    if (!sleeping || sleeping.length === 0) {
      res.status(404).json({ error: 'לא נמצאה שינה לתינוק' });
      return;
    }

    res.json({
      sleeping,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const createStartSleep: RequestHandler<
  BabyIdParams,
  {},
  CreateStartSleepBody
> = async (req, res) => {
  try {
    const { babyId } = req.params;

    const { notes, startTime } = req.body;

    // בדיקה אם יש כבר שינה פתוחה
    const existingOpenSleep = await Sleeping.findOne({
      babyId,
      endTime: { $exists: false },
    }).lean();

    if (existingOpenSleep) {
      res.status(400).json({
        error: 'יש כבר שינה פתוחה עבור התינוק הזה',
      });
      return;
    }

    const parsedStartTime = startTime ? new Date(startTime) : new Date();

    const newSleep: ISleep = new Sleeping({
      babyId,
      startTime: parsedStartTime,
      notes,
    });

    await newSleep.save();

    res.status(201).json({
      message: 'התחלת שינה נשמרה בהצלחה',
      sleeping: newSleep,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const createEndSleep: RequestHandler<
  BabyIdParams,
  {},
  CreateEndSleepBody
> = async (req, res) => {
  try {
    const { babyId } = req.params;

    const { endTime } = req.body;
    const parsedEndTime = endTime ? new Date(endTime) : new Date();

    // מוצא את רשומת השינה הפתוחה ביותר עבור התינוק
    const openSleep: ISleep | null = await Sleeping.findOne({
      babyId,
      endTime: { $exists: false },
    }).sort({ startTime: -1 });

    if (!openSleep) {
      res.status(404).json({ error: 'לא נמצאה שינה פתוחה לסיום' });
      return;
    }

    if (parsedEndTime < openSleep.startTime) {
      res
        .status(400)
        .json({ error: 'שעת סיום לא יכולה להיות לפני שעת ההתחלה' });
      return;
    }

    openSleep.endTime = parsedEndTime;
    await openSleep.save();

    res.status(200).json({
      message: 'שעת הסיום עודכנה בהצלחה',
      sleeping: openSleep,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const editSleeping = async (
  req: Request<SleepingIdParams, {}, EditSleepBody>,
  res: Response
) => {
  try {
    const { sleepingId } = req.params;

    if (!validateObjectId(sleepingId, res, 'מזהה שינה')) return;

    const { startTime, endTime, notes } = req.body;

    const updateFields: Partial<{
      startTime: Date;
      endTime: Date;
      notes: string;
    }> = {};

    if (startTime) updateFields.startTime = new Date(startTime);
    if (endTime) updateFields.endTime = new Date(endTime);
    if (notes !== undefined) updateFields.notes = notes;

    const updatedSleeping = await Sleeping.findByIdAndUpdate(
      sleepingId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: 'שינה עודכנה בהצלחה', sleeping: updatedSleeping });
  } catch (error) {
    console.error('שגיאה בעדכון שינה:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const deleteSleeping = async (
  req: Request<SleepingIdParams>,
  res: Response
) => {
  try {
    const { sleepingId } = req.params;

    if (!validateObjectId(sleepingId, res, 'מזהה שינה')) return;

    const deletedSleeping = await Sleeping.findByIdAndDelete(sleepingId);

    if (!deletedSleeping) {
      res.status(404).json({ error: 'שינה לא נמצאה' });
      return;
    }

    res.json({ message: 'השינה נמחקה בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת השינה:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
