import express from 'express';
import { requireAuth } from '../middlewares/auth';
import {
  createFeeding,
  deleteFeeding,
  editFeeding,
  getFeedings,
} from '../controllers/feedingsController';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';
import { verifyFeedingOwnership } from '../middlewares/verifyFeedingOwnership';
import {
  validateFeeding,
  validateUpdateFeeding,
} from '../validators/feedingValidators';

const router = express.Router();

// GET feedings של תינוק מסוים
router.get('/:babyId', requireAuth, verifyBabyOwnership, getFeedings);

// POST - יצירת האכלה
router.post(
  '/:babyId',
  requireAuth,
  verifyBabyOwnership,
  validateFeeding,
  createFeeding
);

// PUT - עדכון האכלה
router.put(
  '/:feedingId',
  requireAuth,
  verifyFeedingOwnership,
  validateUpdateFeeding,
  editFeeding
);

// DELETE - מחיקת האכלה
router.delete(
  '/:feedingId',
  requireAuth,
  verifyFeedingOwnership,
  deleteFeeding
);

export default router;
