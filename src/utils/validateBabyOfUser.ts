import { Baby } from '../models/babyModel';
import { Response } from 'express';

export async function ensureBabyOwnership(
  babyId: string,
  userId: string,
  res: Response
): Promise<boolean> {
  const exists = await Baby.exists({ _id: babyId, userId });
  if (!exists) {
    res.status(404).json({ error: 'תינוק לא נמצא או לא שייך למשתמש' });
    return false;
  }
  return true;
}
