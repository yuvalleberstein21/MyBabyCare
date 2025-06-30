import { Request, Response, RequestHandler } from 'express';
import { Baby } from '../models/babyModel';
import { validateObjectId } from '../utils/validateObjectId';
import { IBaby } from '../types/baby';

export const createBaby: RequestHandler = async (req, res) => {
  try {
    const { name, gender, birthDate, notes } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const baby = await Baby.create({
      userId: req.user!.id,
      name,
      gender,
      birthDate,
      notes,
      image,
    });

    res.status(201).json({
      message: 'תינוק נוצר בהצלחה',
      baby,
    });
  } catch (error) {
    console.error('שגיאה ביצירת תינוק:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const getBabies: RequestHandler = async (req, res) => {
  try {
    const babies = await Baby.find({ userId: req.user!.id })
      .select('name gender notes birthDate image createdAt')
      .lean()
      .sort({ createdAt: -1 });
    res.status(200).json({ babies });
  } catch (error) {
    console.error('שגיאה בקבלת תינוקות:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const getSingleBaby: RequestHandler = (req, res): void => {
  res.json({ baby: req.baby });
};

export const updateBaby: RequestHandler = async (req, res) => {
  const { babyId } = req.params;
  const { name, gender, birthDate, notes } = req.body;
  const updateFields = { name, gender, birthDate, notes };
  const userId = req.user?.id;

  try {
    if (!validateObjectId(babyId, res, 'מזהה תינוק')) return;

    const updatedBaby: IBaby | null = await Baby.findOneAndUpdate(
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

export const deleteBaby = async (req: Request, res: Response) => {
  const { babyId } = req.params;
  try {
    await Baby.deleteOne({ _id: babyId });
    res.status(200).json({ message: 'תינוק נמחק בהצלחה' });
  } catch (error) {
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
