import { Request, RequestHandler, Response } from 'express';
import { validateObjectId } from '../utils/validateObjectId';
import { Feeding } from '../models/feedingModel';
import { IBaby } from '../types/baby';
import { Sleeping } from '../models/sleepModel';
import { ISleep } from '../types/sleep';

export const getSleepings = async (req: Request, res: Response) => {
  const { babyId } = req.params;

  try {
    const sleeping = await Sleeping.find({ babyId }).sort({ startTime: -1 });

    if (!sleeping) {
      res.status(404).json({ error: 'לא נמצא שינה לתינוק' });
    }

    res.status(200).json({ sleeping });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const createStartSleep: RequestHandler = async (req, res) => {
  const { babyId } = req.params;
  const { notes, startTime } = req.body;

  try {
    const parsedStartTime = startTime ? new Date(startTime) : new Date();

    const newSleep = new Sleeping({
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

export const createEndSleep: RequestHandler = async (req, res) => {
  const { babyId } = req.params;
  const { endTime } = req.body;

  try {
    const parsedEndTime = endTime ? new Date(endTime) : new Date();

    // מוצא את רשומת השינה הפתוחה ביותר עבור התינוק
    const openSleep = await Sleeping.findOne({
      babyId,
      endTime: { $exists: false },
    }).sort({ startTime: -1 }); // אם יש יותר מאחת, קח את האחרונה

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

export const editSleeping = async (req: Request, res: Response) => {
  const { sleepingId } = req.params;
  const { startTime, endTime, notes } = req.body;
  const userId = req.user?.id;

  try {
    if (!validateObjectId(sleepingId, res, 'מזהה שינה')) return;

    const sleeping = await Sleeping.findById(sleepingId).populate('babyId');

    if (!sleeping) {
      res.status(404).json({ error: 'שינה לא נמצאה' });
      return;
    }

    const baby = sleeping.babyId as any;
    if (baby.userId.toString() !== userId) {
      res.status(403).json({ error: 'אין הרשאה לערוך שינה זו' });
      return;
    }

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

export const deleteSleeping = async (req: Request, res: Response) => {
  const { feedingId } = req.params;
  const userId = req.user?.id;

  if (!validateObjectId(feedingId, res, 'מזהה האכלה')) return;

  if (!userId) {
    res.status(401).json({ error: 'משתמש לא מזוהה' });
    return;
  }

  try {
    const feeding = await Feeding.findById(feedingId).populate<{
      babyId: IBaby;
    }>('babyId');

    if (!feeding || feeding.babyId.userId.toString() !== userId) {
      res.status(404).json({ error: 'האכלה לא נמצאה או לא שייכת למשתמש' });
      return;
    }

    await feeding.deleteOne();

    res.status(200).json({ message: 'האכלה נמחקה בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת האכלה:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
