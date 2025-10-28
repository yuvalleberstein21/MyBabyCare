import express from 'express';
import { requireAuth } from '../middlewares/auth';
import {
  createFeeding,
  deleteFeeding,
  editFeeding,
  getFeedings,
} from '../controllers/feedingsController';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';
import {
  validateFeeding,
  validateUpdateFeeding,
} from '../validators/feedingValidators';
import { verifyFeedingOwnership } from '../middlewares/verifyFeedingOwnership';

const router = express.Router();

router.get('/:babyId', requireAuth, verifyBabyOwnership, getFeedings);
router.post(
  '/:babyId',
  requireAuth,
  validateFeeding,
  verifyBabyOwnership,
  createFeeding
);
router.put(
  '/:feedingId',
  requireAuth,
  verifyFeedingOwnership,
  validateUpdateFeeding,
  editFeeding
);
router.delete(
  '/:feedingId',
  requireAuth,
  verifyFeedingOwnership,
  deleteFeeding
);

export default router;
