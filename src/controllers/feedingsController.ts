import { Request, RequestHandler, Response } from 'express';
import { validateObjectId } from '../utils/validateObjectId';
import { Feeding } from '../models/feedingModel';
import { Baby } from '../models/babyModel';
import { IBaby } from '../types/baby';

export const getFeedings = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { babyId } = req.params;

  try {
    if (!validateObjectId(babyId, res, 'מזהה תינוק')) return;

    const baby = await Baby.exists({ _id: babyId, userId });

    if (!baby) {
      res.status(404).json({ error: 'תינוק לא נמצא או לא שייך למשתמש' });
      return;
    }

    const feedings = await Feeding.find({ babyId }).sort({ time: -1 });

    res.status(200).json({ feedings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const createFeeding: RequestHandler = async (req, res) => {
  const { babyId } = req.params;
  const { type, amount, time, notes } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'משתמש לא מזוהה' });
    return;
  }

  try {
    if (!validateObjectId(babyId, res, 'מזהה תינוק')) return;

    // בדיקה שהתינוק שייך למשתמש
    const baby = await Baby.exists({ _id: babyId, userId });

    if (!baby) {
      res.status(404).json({ error: 'תינוק לא נמצא או לא שייך למשתמש' });
      return;
    }

    if (!type || !amount) {
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

// TODO: TO FIX THE FUNCTION !!
export const editFeeding = async (req: Request, res: Response) => {
  const { feedingId } = req.params;
  const updateFields = req.body;
  const userId = req.user?.id;

  try {
    if (!validateObjectId(feedingId, res, 'מזהה האכלה')) return;

    const feeding = await Feeding.findById(feedingId).populate<{
      babyId: IBaby;
    }>('babyId');

    if (!feeding || feeding.babyId.userId.toString() !== userId) {
      res.status(404).json({ error: 'האכלה לא נמצאה או לא שייכת למשתמש' });
      return;
    }

    const updatedFeeding = await Feeding.findByIdAndUpdate(
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
