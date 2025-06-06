import express from 'express';
import { requireAuth } from '../middlewares/auth';
import {
  createFeeding,
  editFeeding,
  getFeedings,
} from '../controllers/feedingsController';

const router = express.Router();

router.get('/:babyId', requireAuth, getFeedings);
router.post('/:babyId', requireAuth, createFeeding);
router.put('/:feedingId', requireAuth, editFeeding);

export default router;
