import express from 'express';
import { requireAuth } from '../middlewares/auth';
import {
  createFeeding,
  deleteFeeding,
  editFeeding,
  getFeedings,
} from '../controllers/feedingsController';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';

const router = express.Router();

router.get('/:babyId', requireAuth, verifyBabyOwnership, getFeedings);
router.post('/:babyId', requireAuth, verifyBabyOwnership, createFeeding);
router.put('/:feedingId', requireAuth, editFeeding);
router.delete('/:feedingId', requireAuth, deleteFeeding);

export default router;
