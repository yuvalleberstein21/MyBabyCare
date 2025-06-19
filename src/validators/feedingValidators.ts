import { Request, Response, NextFunction } from 'express';

export const validateFeeding = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type, amount, time } = req.body;

  if (!type || typeof type !== 'string' || type.trim() === '') {
    res.status(400).json({ error: 'סוג ההאכלה נדרש' });
    return;
  }

  if (!amount || typeof amount !== 'string' || amount.trim() === '') {
    res.status(400).json({ error: 'כמות ההאכלה נדרשת' });
    return;
  }

  if (time && isNaN(Date.parse(time))) {
    res.status(400).json({ error: 'תאריך לא תקין' });
    return;
  }

  next();
};
