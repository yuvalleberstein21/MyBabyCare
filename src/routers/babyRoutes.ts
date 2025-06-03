import express from 'express';
import {
  createBaby,
  getBabies,
  updateBaby,
  // getBabyData,
} from '../controllers/babyController';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/', requireAuth, getBabies); // קבלת רשימת תינוקות של המשתמש או תינוק אחד
router.post('/', requireAuth, createBaby); // הוספת תינוק חדש

router.put('/:babyId', requireAuth, updateBaby); // עריכת פרטי תינוק
// router.delete('/babies/:babyId'); // מחיקת תינוק

export default router;
