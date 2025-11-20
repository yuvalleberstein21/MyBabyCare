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

  if (time && isNaN(Date.parse(time))) {
    res.status(400).json({ error: 'תאריך לא תקין' });
    return;
  }

  next();
};

export const validateUpdateFeeding = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { type, time } = req.body;

  if (type !== undefined && (typeof type !== 'string' || type.trim() === '')) {
    res.status(400).json({ error: 'סוג ההאכלה לא תקין' });
    return;
  }

  if (time !== undefined && time !== '' && isNaN(Date.parse(time))) {
    res.status(400).json({ error: 'זמן ההאכלה אינו תקין' });
    return;
  }

  if (time === undefined || time === '') {
    req.body.time = new Date().toISOString();
  }

  next();
};
