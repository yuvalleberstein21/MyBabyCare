import { Request, Response, NextFunction } from 'express';
export const validateCreateBaby = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, birthDate, notes } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ error: 'שם התינוק חסר או לא תקין' });
    return;
  }

  if (birthDate && isNaN(Date.parse(birthDate))) {
    res.status(400).json({ error: 'תאריך לידה לא תקין' });
    return;
  }

  if (notes && typeof notes !== 'string') {
    res.status(400).json({ error: 'הערות חייבות להיות טקסט' });
    return;
  }

  next();
};
