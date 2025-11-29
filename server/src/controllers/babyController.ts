// import { Request, Response, RequestHandler } from 'express';
// import { Baby } from '../models/babyModel';
// import { validateObjectId } from '../utils/validateObjectId';
// import { IBaby, UpdateBabyRequestBody } from '../types/baby';
// import mongoose from 'mongoose';

// export const createBaby: RequestHandler = async (req, res) => {
//   try {
//     const { name, gender, birthDate, weight, height, notes } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : undefined;

//     const baby = await Baby.create({
//       userId: req.user!.id,
//       name,
//       gender,
//       birthDate,
//       weight,
//       height,
//       notes,
//       image,
//     });

//     res.status(201).json({
//       message: 'תינוק נוצר בהצלחה',
//       baby,
//     });
//   } catch (error) {
//     // --- ולידציה של Mongoose ---
//     if (error instanceof mongoose.Error.ValidationError) {
//       const firstError = Object.values(error.errors)[0].message;
//       res.status(400).json({ error: firstError });
//       return;
//     }
//     console.error('שגיאה ביצירת תינוק:', error);
//     res.status(500).json({ error: 'שגיאה בשרת' });
//   }
// };

// export const getBabies: RequestHandler = async (req, res) => {
//   try {
//     const babies = await Baby.find({ userId: req.user!.id })
//       .select('name gender notes birthDate weight height image createdAt')
//       .lean()
//       .sort({ createdAt: -1 });
//     res.status(200).json(babies);
//   } catch (error) {
//     console.error('שגיאה בקבלת תינוקות:', error);
//     res.status(500).json({ error: 'שגיאה בשרת' });
//   }
// };

// export const getSingleBaby: RequestHandler = (req, res): void => {
//   res.json({ baby: req.baby });
// };

// export const updateBaby: RequestHandler<
//   { babyId: string },
//   {},
//   UpdateBabyRequestBody
// > = async (req, res) => {
//   try {
//     const { babyId } = req.params;
//     const { name, gender, birthDate, weight, height, notes } = req.body;
//     const updateFields = { name, gender, birthDate, weight, height, notes };
//     const userId = req.user?.id;

//     if (!validateObjectId(babyId, res, 'מזהה תינוק')) return;

//     const updatedBaby: IBaby | null = await Baby.findOneAndUpdate(
//       { _id: babyId, userId },
//       { $set: updateFields },
//       { new: true, runValidators: true }
//     );

//     if (!updatedBaby) {
//       res.status(404).json({ error: 'תינוק לא נמצא או לא שייך למשתמש' });
//       return;
//     }

//     res.status(200).json({ message: 'התינוק עודכן בהצלחה', baby: updatedBaby });
//   } catch (error: any) {
//     console.error('שגיאה בעדכון תינוק:', error);
//     res.status(500).json({ error: 'שגיאה בשרת' });
//     return;
//   }
// };

// export const deleteBaby = async (req: Request, res: Response) => {
//   const { babyId } = req.params;
//   try {
//     await Baby.deleteOne({ _id: babyId });
//     res.status(200).json({ message: 'תינוק נמחק בהצלחה' });
//   } catch (error) {
//     res.status(500).json({ error: 'שגיאה בשרת' });
//   }
// };

import { Request, Response, RequestHandler } from 'express';
import { Baby } from '../models/babyModel';
import { Feeding } from '../models/feedingModel';

import { Health } from '../models/healthModel';

import { validateObjectId } from '../utils/validateObjectId';
import { IBaby, UpdateBabyRequestBody } from '../types/baby';
import mongoose from 'mongoose';
import { Diaper } from '../models/DiaperModel';
import { Sleeping } from '../models/sleepModel';

export const createBaby: RequestHandler = async (req, res) => {
  try {
    const { name, gender, birthDate, weight, height, notes } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const parsedWeight = weight ? Number(weight) : undefined;
    const parsedHeight = height ? Number(height) : undefined;

    const baby = await Baby.create({
      userId: req.user!.id,
      name,
      gender,
      birthDate,
      weight: parsedWeight,
      height: parsedHeight,
      notes,
      image,
    });

    res.status(201).json({
      message: 'תינוק נוצר בהצלחה',
      baby,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const firstError = Object.values(error.errors)[0].message;
      res.status(400).json({ error: firstError });
      return;
    }
    console.error('שגיאה ביצירת תינוק:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const getBabies: RequestHandler = async (req, res) => {
  try {
    const babies = await Baby.find({ userId: req.user!.id })
      .select('name gender notes birthDate weight height image createdAt')
      .lean()
      .sort({ createdAt: -1 });

    res.status(200).json(babies);
  } catch (error) {
    console.error('שגיאה בקבלת תינוקות:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};

export const getSingleBaby: RequestHandler = (req, res): void => {
  res.json({ baby: req.baby });
};

export const updateBaby: RequestHandler<
  { babyId: string },
  {},
  UpdateBabyRequestBody
> = async (req, res) => {
  try {
    const { babyId } = req.params;

    if (!validateObjectId(babyId, res, 'מזהה תינוק')) return;

    const userId = req.user!.id;
    const { name, gender, birthDate, weight, height, notes } = req.body;

    const updateFields: any = {
      ...(name && { name }),
      ...(gender && { gender }),
      ...(birthDate && { birthDate }),
      ...(weight !== undefined && { weight }),
      ...(height !== undefined && { height }),
      ...(notes !== undefined && { notes }),
    };

    // update image if uploaded
    if (req.file) {
      updateFields.image = `/uploads/${req.file.filename}`;
    }

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

export const deleteBaby = async (req: Request, res: Response) => {
  const { babyId } = req.params;

  try {
    if (!validateObjectId(babyId, res, 'מזהה תינוק')) return;

    // delete all related data
    await Promise.all([
      Feeding.deleteMany({ babyId }),
      Diaper.deleteMany({ babyId }),
      Sleeping.deleteMany({ babyId }),
      Health.deleteMany({ babyId }),
    ]);

    await Baby.deleteOne({ _id: babyId, userId: req.user!.id });

    res.status(200).json({ message: 'תינוק וכל פעילויותיו נמחקו בהצלחה' });
  } catch (error) {
    console.error('שגיאה במחיקת תינוק:', error);
    res.status(500).json({ error: 'שגיאה בשרת' });
  }
};
