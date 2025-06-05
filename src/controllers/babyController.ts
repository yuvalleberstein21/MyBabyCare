import { Request, Response, RequestHandler } from 'express';
import mongoose from 'mongoose';

import { Baby } from '../models/babyModel';
import { User } from '../models/userModel';
import { IBaby, IBabyDocument } from '../types/baby';
import { validateObjectId } from '../utils/validateObjectId';

export const createBaby: RequestHandler = async (req, res) => {
  const userId = req.user?.id;

  const { name, gender, birthDate, notes } = req.body;

  if (!userId) {
    res.status(401).json({ error: 'משתמש לא מזוהה' });
    return;
  }

  if (!name) {
    res.status(400).json({ error: 'שם התינוק חסר' });
    return;
  }

  try {
    const newBaby = new Baby({
      userId,
      name,
      gender,
      birthDate,
      notes,
    });

    const savedBaby = await newBaby.save();

    res.status(201).json({ message: 'תינוק נוצר בהצלחה', baby: savedBaby });
  } catch (error) {
    console.error('שגיאה ביצירת תינוק:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const getBabies = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { babyId } = req.query;

  try {
    if (babyId) {
      if (!mongoose.Types.ObjectId.isValid(babyId as string)) {
        res.status(400).json({ error: 'מזהה תינוק לא תקין' });
        return;
      }

      const userBaby = await Baby.findOne({
        _id: babyId,
        userId,
      });

      if (!userBaby) {
        res.status(404).json({ error: 'תינוק לא נמצא או לא שייך למשתמש' });
        return;
      }

      res.status(200).json({ baby: userBaby });
      return;
    }

    const userBabies = await Baby.find({ userId });

    if (!userBabies.length) {
      res.status(404).json({ error: 'לא נמצאו תינוקות' });
      return;
    }

    res.status(200).json({ babies: userBabies });
    return;
  } catch (error) {
    console.error('שגיאה בקבלת תינוקות:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const updateBaby = async (req: Request, res: Response) => {
  const { babyId } = req.params;
  const updateFields = req.body;
  const userId = req.user?.id;

  try {
    if (!validateObjectId(babyId, res, 'מזהה תינוק')) return;

    const updatedBaby = await Baby.findOneAndUpdate(
      { _id: babyId, userId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedBaby) {
      res.status(404).json({ error: 'תינוק לא נמצא או לא שייך למשתמש' });
      return;
    }

    res.status(200).json({ message: 'התינוק עודכן בהצלחה', baby: updatedBaby });
  } catch (error) {
    console.error('שגיאה בעדכון תינוק:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
