import { Request, Response, NextFunction } from 'express';
export const validateCreateBaby = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, gender, birthDate, weight, height, notes } = req.body;

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

  if (weight !== undefined && weight !== null) {
    const numWeight = Number(weight);
    if (isNaN(numWeight) || numWeight < 0 || numWeight > 20) {
      res
        .status(400)
        .json({ error: 'משקל לא תקין. יש להזין ערך בין 0 ל-20 ק"ג' });
      return;
    }
  }

  if (height !== undefined && height !== null) {
    const numHeight = Number(height);
    if (isNaN(numHeight) || numHeight < 0 || numHeight > 120) {
      res
        .status(400)
        .json({ error: 'גובה לא תקין. יש להזין ערך בין 0 ל-120 ס"מ' });
      return;
    }
  }

  if (notes && typeof notes !== 'string') {
    res.status(400).json({ error: 'הערות חייבות להיות טקסט' });
    return;
  }

  next();
};
