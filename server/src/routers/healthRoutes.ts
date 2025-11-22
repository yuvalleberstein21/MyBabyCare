import express from 'express';
import { requireAuth } from '../middlewares/auth';
import { createHealth } from '../controllers/healthController';
import { validateHealth } from '../validators/healthValidators';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';
const router = express.Router();

router.post(
  '/:babyId',
  requireAuth,
  validateHealth,
  verifyBabyOwnership,
  createHealth
);

export default router;
