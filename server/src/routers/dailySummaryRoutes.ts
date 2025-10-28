import express from 'express';
const router = express.Router();
import { getDailySummary } from '../controllers/dailySummaryController';
import { requireAuth } from '../middlewares/auth';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';

router.get('/:babyId', requireAuth, verifyBabyOwnership, getDailySummary);

export default router;
