import express from 'express';
import {
  createBaby,
  getBabies,
  getSingleBaby,
  updateBaby,
  // getBabyData,
} from '../controllers/babyController';
import { requireAuth } from '../middlewares/auth';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';
import { validateCreateBaby } from '../validators/babyValidators';
import upload from '../middlewares/uploadImageMiddleware';

const router = express.Router();

router.get('/', requireAuth, getBabies); // קבלת רשימת תינוקות של המשתמש
router.post(
  '/',
  validateCreateBaby,
  upload.single('image'),
  requireAuth,
  createBaby
); // הוספת תינוק חדש

router.get('/:babyId', requireAuth, verifyBabyOwnership, getSingleBaby);
router.put('/:babyId', requireAuth, verifyBabyOwnership, updateBaby); // עריכת פרטי תינוק
// router.delete('/babies/:babyId'); // מחיקת תינוק

export default router;
