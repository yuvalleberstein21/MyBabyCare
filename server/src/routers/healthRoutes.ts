import express from 'express';
import { requireAuth } from '../middlewares/auth';
import { createHealth, updateHealth } from '../controllers/healthController';
import { validateHealth } from '../validators/healthValidators';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';
import { verifyHealthOwnership } from '../middlewares/vertifyHealthOwnership';
const router = express.Router();

router.post(
  '/:babyId',
  requireAuth,
  validateHealth,
  verifyBabyOwnership,
  createHealth
);

router.put(
  '/:healthId',
  requireAuth,
  verifyHealthOwnership,
  validateHealth,
  updateHealth
);

export default router;
