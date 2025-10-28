import { Response } from 'express';
export function validateStartSleepBody(body: any, res: Response): boolean {
  if (body.startTime && isNaN(Date.parse(body.startTime))) {
    res.status(400).json({ error: 'שעת התחלה אינה תקינה' });
    return false;
  }
  if (body.notes && typeof body.notes !== 'string') {
    res.status(400).json({ error: 'הערות צריכות להיות טקסט' });
    return false;
  }
  return true;
}

export function validateEndSleepBody(body: any, res: Response): boolean {
  if (body.endTime && isNaN(Date.parse(body.endTime))) {
    res.status(400).json({ error: 'שעת סיום אינה תקינה' });
    return false;
  }
  return true;
}

export function validateEditSleepBody(body: any, res: Response): boolean {
  if (body.startTime && isNaN(Date.parse(body.startTime))) {
    res.status(400).json({ error: 'שעת התחלה אינה תקינה' });
    return false;
  }
  if (body.endTime && isNaN(Date.parse(body.endTime))) {
    res.status(400).json({ error: 'שעת סיום אינה תקינה' });
    return false;
  }

  // בדיקה ששעת התחלה אינה אחרי שעת סיום
  if (body.startTime && body.endTime) {
    const start = new Date(body.startTime);
    const end = new Date(body.endTime);
    if (start > end) {
      res.status(400).json({ error: 'שעת התחלה לא יכולה להיות אחרי שעת סיום' });
      return false;
    }
  }
  if (body.notes !== undefined && typeof body.notes !== 'string') {
    res.status(400).json({ error: 'הערות צריכות להיות מחרוזת' });
    return false;
  }
  return true;
}
