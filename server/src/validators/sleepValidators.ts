import { RequestHandler } from 'express';

export const validateStartSleepBody: RequestHandler = (req, res, next) => {
  const { startTime, notes } = req.body;

  if (startTime && isNaN(Date.parse(startTime))) {
    res.status(400).json({ error: 'שעת התחלה אינה תקינה' });
    return;
  }

  if (notes && typeof notes !== 'string') {
    res.status(400).json({ error: 'הערות צריכות להיות טקסט' });
    return;
  }

  next();
};

export const validateEndSleepBody: RequestHandler = (req, res, next) => {
  const { endTime } = req.body;

  if (endTime && isNaN(Date.parse(endTime))) {
    res.status(400).json({ error: 'שעת סיום אינה תקינה' });
    return;
  }

  next();
};

export const validateEditSleepBody: RequestHandler = (req, res, next) => {
  const { startTime, endTime, notes } = req.body;

  if (startTime && isNaN(Date.parse(startTime))) {
    res.status(400).json({ error: 'שעת התחלה אינה תקינה' });
    return;
  }

  if (endTime && isNaN(Date.parse(endTime))) {
    res.status(400).json({ error: 'שעת סיום אינה תקינה' });
    return;
  }

  if (startTime && endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start > end) {
      res.status(400).json({ error: 'שעת התחלה לא יכולה להיות אחרי שעת סיום' });
      return;
    }
  }

  if (notes !== undefined && typeof notes !== 'string') {
    res.status(400).json({ error: 'הערות צריכות להיות מחרוזת' });
    return;
  }

  next();
};
