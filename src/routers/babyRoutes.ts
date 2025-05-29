import express from 'express';
import {
  createBaby,
  getBabies,
  getBabyData,
} from '../controllers/babyController';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/', requireAuth, getBabies); // קבלת רשימת תינוקות של המשתמש
router.post('/', requireAuth, createBaby); // הוספת תינוק חדש
router.get('/:babyId', requireAuth, getBabyData); // קבלת פרטי תינוק
// router.put('/babies/:babyId'); // עריכת פרטי תינוק
// router.delete('/babies/:babyId'); // מחיקת תינוק

export default router;
