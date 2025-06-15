import { Request, RequestHandler, Response } from 'express';
import { validateObjectId } from '../utils/validateObjectId';
import { IDiaper } from '../types/diaper';
import { Diaper } from '../models/DiaperModel';

export const getDiaper = async (req: Request, res: Response) => {
  const { babyId } = req.params;

  try {
    const diaper: IDiaper[] = await Diaper.find({ babyId }).sort({
      time: -1,
    });

    if (!diaper) {
      res.status(404).json({ error: 'לא נמצא החלפת חיתולים לתינוק' });
    }

    res.status(200).json({ diaper });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const createDiaper: RequestHandler = async (req, res) => {
  const { babyId } = req.params;
  const { time, type, notes } = req.body;

  const validTypes = ['pee', 'poop', 'mixed'];

  try {
    if (!type) {
      res.status(400).json({ error: 'עלייך לבחור סוג תקין' });
      return;
    }
    if (!validTypes.includes(type)) {
      res.status(400).json({ error: `סוג לא חוקי: ${type}` });
      return;
    }

    const diaperTime = time ? new Date(time) : new Date();

    const newDiaper: IDiaper = new Diaper({
      babyId,
      type,
      time: diaperTime,
      notes,
    });

    await newDiaper.save();

    res.status(201).json({
      message: 'הוספת החלפת חיתולים בוצעה בהצלחה!',
      diaper: newDiaper,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const editDiaper = async (req: Request, res: Response) => {
  const { diaperId } = req.params;
  const { type, time, notes } = req.body;
  const updateFields = { type, time, notes };

  try {
    if (!validateObjectId(diaperId, res, 'מזהה חיתולים')) return;

    const updatedDiaper: IDiaper | null = await Diaper.findByIdAndUpdate(
      diaperId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedDiaper) {
      res
        .status(404)
        .json({ error: 'החלפת חיתולים לא נמצאה או לא שייכת למשתמש' });
      return;
    }

    res
      .status(200)
      .json({ message: 'החלפת חיתולים עודכנה בהצלחה', diaper: updatedDiaper });
  } catch (error) {
    console.error('שגיאה בעדכון החלפת חיתולים:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const deleteDiaper = async (req: Request, res: Response) => {
  const { diaperId } = req.params;

  if (!validateObjectId(diaperId, res, 'מזהה שינה')) return;

  try {
    const diaper = await Diaper.findById(diaperId).populate('babyId');

    if (!diaper) {
      res.status(404).json({ error: 'החלפת חיתולים לא נמצאה' });
      return;
    }

    await diaper.deleteOne();

    res.status(200).json({ message: 'החלפת חיתולים הנוכחית נמחקה בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת החלפת חיתולים:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
