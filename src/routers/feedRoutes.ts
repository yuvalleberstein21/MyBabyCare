import express from 'express';
import { requireAuth } from '../middlewares/auth';
import { createFeeding, getFeedings } from '../controllers/feedingsController';

const router = express.Router();

router.get('/:babyId', requireAuth, getFeedings);
router.post('/:babyId', requireAuth, createFeeding);

export default router;
