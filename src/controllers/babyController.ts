import { Request, Response, RequestHandler } from 'express';
import { Baby } from '../models/babyModel';
import { validateObjectId } from '../utils/validateObjectId';
import { IBaby } from '../types/baby';

export const createBaby: RequestHandler = async (req, res) => {
  const userId = req.user?.id;
  const { name, gender, birthDate, notes } = req.body;

  console.log(req.file);
  const image = req.file ? '/uploads/' + req.file.filename : undefined;

  if (!req.user?.id) {
    res.status(401).json({ error: 'משתמש לא מזוהה' });
    return;
  }
  try {
    const newBaby = new Baby({
      userId,
      name,
      gender,
      birthDate,
      notes,
      image,
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

  try {
    const babies = await Baby.find({ userId })
      .select('name gender notes birthDate image')
      .lean();
    res.status(200).json({ babies });
  } catch (error) {
    console.error('שגיאה בקבלת תינוקות:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const getSingleBaby = async (req: Request, res: Response) => {
  try {
    if (!req.baby) {
      res.status(404).json({ error: 'תינוק לא נמצא' });
      return;
    }

    res.status(200).json({ baby: req.baby });
  } catch (error) {
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const updateBaby = async (req: Request, res: Response) => {
  const { babyId } = req.params;
  const { name, gender, birthDate, notes } = req.body;
  const updateFields = { name, gender, birthDate, notes };
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
