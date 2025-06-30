import { Response } from 'express';

const validTypes = ['רטוב', 'מלוכלך', 'שניהם'];

export function validateCreateDiaperBody(body: any, res: Response): boolean {
  const { type, time, notes } = body;

  if (!type) {
    res.status(400).json({ error: 'עלייך לבחור סוג תקין' });
    return false;
  }

  if (!validTypes.includes(type)) {
    res
      .status(400)
      .json({ error: `סוג לא חוקי: ${type} אנא בחר בין רטוב ,מלוכלך ,שניהם` });
    return false;
  }

  if (time && isNaN(Date.parse(time))) {
    res.status(400).json({ error: 'זמן אינו תקין' });
    return false;
  }

  if (notes !== undefined && typeof notes !== 'string') {
    res.status(400).json({ error: 'הערות צריכות להיות טקסט' });
    return false;
  }

  return true;
}

export function validateEditDiaperBody(body: any, res: Response): boolean {
  const { type, time, notes } = body;

  if (type !== undefined && !validTypes.includes(type)) {
    res.status(400).json({ error: `סוג לא חוקי: ${type}` });
    return false;
  }

  if (time && isNaN(Date.parse(time))) {
    res.status(400).json({ error: 'זמן אינו תקין' });
    return false;
  }

  if (notes !== undefined && typeof notes !== 'string') {
    res.status(400).json({ error: 'הערות צריכות להיות טקסט' });
    return false;
  }

  return true;
}
