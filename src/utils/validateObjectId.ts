import mongoose from 'mongoose';
import { Response } from 'express';

export const validateObjectId = (
  id: string,
  res: Response,
  name: string = 'מזהה'
): boolean => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: `${name} אינו תקין` });
    return false;
  }
  return true;
};
