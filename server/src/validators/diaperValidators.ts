import { Request, Response, NextFunction, RequestHandler } from 'express';

const validTypes = ['רטוב', 'מלוכלך', 'שניהם'];

export const validateCreateDiaper: RequestHandler = (req, res, next) => {
  const { type, time, notes } = req.body;

  if (!type) {
    res.status(400).json({ error: 'עלייך לבחור סוג תקין' });
    return;
  }

  if (!validTypes.includes(type)) {
    res
      .status(400)
      .json({ error: `סוג לא חוקי: ${type}. אפשר: רטוב / מלוכלך / שניהם` });
    return;
  }

  if (time && isNaN(Date.parse(time))) {
    res.status(400).json({ error: 'זמן אינו תקין' });
    return;
  }

  if (notes !== undefined && typeof notes !== 'string') {
    res.status(400).json({ error: 'הערות חייבות להיות טקסט' });
    return;
  }

  next();
};

export const validateUpdateDiaper: RequestHandler = (req, res, next) => {
  const { type, time, notes } = req.body;

  if (type !== undefined && !validTypes.includes(type)) {
    res.status(400).json({ error: `סוג לא חוקי: ${type}` });
    return;
  }

  if (time !== undefined && isNaN(Date.parse(time))) {
    res.status(400).json({ error: 'זמן אינו תקין' });
    return;
  }

  if (notes !== undefined && typeof notes !== 'string') {
    res.status(400).json({ error: 'הערות חייבות להיות טקסט' });
    return;
  }

  next();
};
