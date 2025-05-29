import { Request, Response, RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Baby } from '../types';

const babies: Baby[] = [];
export const createBaby: RequestHandler = (req, res) => {
  const { name } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'משתמש לא מזוהה' });
    return;
  }
  if (!name) {
    res.status(400).json({ error: 'שם התינוק חסר' });
    return;
  }

  const newBaby: Baby = {
    id: uuidv4(),
    name,
    userId,
  };

  babies.push(newBaby);

  res.status(201).json({ message: 'תינוק נוצר בהצלחה', baby: newBaby });
};

export const getBabies = (req: Request, res: Response) => {
  const userId = req.user?.id;
  const userBabies = babies.filter((baby) => baby.userId === userId);
  if (userBabies.length === 0) {
    res.status(404).json({ error: 'אין תינוקות ברשימה' });
    return;
  }
  res.json({ babies: userBabies });
};
