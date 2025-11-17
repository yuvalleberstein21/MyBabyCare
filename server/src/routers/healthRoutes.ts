import express from 'express';
import { requireAuth } from '../middlewares/auth';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';
import { createHealth } from '../controllers/healthController';
import { validateHealth } from '../validators/healthValidators';
const router = express.Router();

router.post('/', requireAuth, validateHealth, createHealth);

export default router;
