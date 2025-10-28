import { Request, Response, NextFunction } from 'express';
export const validateCreateBaby = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, gender, birthDate, notes } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ error: 'שם התינוק חסר או לא תקין' });
    return;
  }

  if (
    !birthDate ||
    typeof birthDate !== 'string' ||
    isNaN(Date.parse(birthDate)) ||
    birthDate.trim() === ''
  ) {
    res.status(400).json({ error: 'תאריך לידה לא תקין' });
    return;
  }

  const allowedGenders = ['זכר', 'נקבה'];

  if (
    !gender ||
    typeof gender !== 'string' ||
    !allowedGenders.includes(gender)
  ) {
    res.status(400).json({ error: 'מין לא תקין. אנא בחר זכר או נקבה' });
    return;
  }

  if (notes && typeof notes !== 'string') {
    res.status(400).json({ error: 'הערות חייבות להיות טקסט' });
    return;
  }

  next();
};
