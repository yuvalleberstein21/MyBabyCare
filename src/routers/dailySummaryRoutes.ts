import express from 'express';
const router = express.Router();
import { getDailySummary } from '../controllers/dailySummaryController';
import { requireAuth } from '../middlewares/auth';

router.get('/', requireAuth, getDailySummary);

export default router;
