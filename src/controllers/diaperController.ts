import { Request, RequestHandler, Response } from 'express';
import { validateObjectId } from '../utils/validateObjectId';
import { IDiaper } from '../types/diaper';
import { Diaper } from '../models/DiaperModel';
import {
  validateCreateDiaperBody,
  validateEditDiaperBody,
} from '../validators/diaperValidators';

export const getDiaper: RequestHandler = async (req, res) => {
  try {
    const { babyId } = req.params;

    const { limit = 50, page = 1, startDate, endDate, type } = req.query;

    const query: any = { babyId };

    if (startDate || endDate) {
      query.time = {};
      if (startDate) query.time.$gte = new Date(startDate as string);
      if (endDate) query.time.$lte = new Date(endDate as string);
    }

    if (type && type !== 'all') {
      query.type = type;
    }

    const diaper: IDiaper[] = await Diaper.find(query)
      .select('time type notes createdAt')
      .sort({ time: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .lean();

    const total = await Diaper.countDocuments(query);

    if (!diaper || diaper.length === 0) {
      res.status(404).json({ error: 'לא נמצא החלפת חיתולים לתינוק' });
    }

    res.json({
      diaper,
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

export const createDiaper: RequestHandler = async (req, res) => {
  try {
    const { babyId } = req.params;

    if (!validateCreateDiaperBody(req.body, res)) return;

    const { time, type, notes } = req.body;

    const diaperTime = time ? new Date(time) : new Date();

    const newDiaper: IDiaper = await Diaper.create({
      babyId,
      type,
      time: diaperTime,
      notes,
    });

    res.status(201).json({
      message: 'הוספת החלפת חיתולים בוצעה בהצלחה!',
      diaper: newDiaper,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const editDiaper: RequestHandler = async (req, res) => {
  try {
    const { diaperId } = req.params;

    if (!validateEditDiaperBody(req.body, res)) return;
    if (!validateObjectId(diaperId, res, 'מזהה חיתולים')) return;

    const { type, time, notes } = req.body;

    const updateFields: Partial<{
      type: String;
      time: Date;
      notes: string;
    }> = {};

    if (time) updateFields.time = new Date(time);
    if (type !== undefined) updateFields.type = type;
    if (notes !== undefined) updateFields.notes = notes;

    const updatedDiaper = await Diaper.findByIdAndUpdate(
      diaperId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedDiaper) {
      res.status(404).json({ error: 'החלפת חיתולים לא נמצאה' });
      return;
    }

    res
      .status(200)
      .json({ message: 'החלפת חיתולים עודכנה בהצלחה', diaper: updatedDiaper });
  } catch (error: any) {
    console.error('שגיאה בעדכון החלפת חיתולים:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const deleteDiaper: RequestHandler = async (req, res) => {
  try {
    const { diaperId } = req.params;

    if (!validateObjectId(diaperId, res, 'מזהה חיתולים')) return;

    const deletedDiaper = await Diaper.findByIdAndDelete(diaperId); // החלפת חיתולים של תינוק מסויים

    if (!deletedDiaper) {
      res.status(404).json({ error: 'החלפת חיתולים לא נמצאה' });
      return;
    }

    res.json({ message: 'החלפת חיתולים נמחקה בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת החלפת חיתולים:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
