import express from 'express';
import { createBaby, getBabies } from '../controllers/babyController';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/', requireAuth, getBabies); // קבלת רשימת תינוקות של המשתמש
router.post('/', requireAuth, createBaby); // הוספת תינוק חדש
// router.post('/babies/:babyId '); // קבלת פרטי תינוק
// router.put('/babies/:babyId'); // עריכת פרטי תינוק
// router.delete('/babies/:babyId'); // מחיקת תינוק

export default router;
