import express from 'express';
import {
  createEndSleep,
  createStartSleep,
  deleteSleeping,
  editSleeping,
  getSleepings,
} from '../controllers/sleepController';
import { requireAuth } from '../middlewares/auth';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';
import { verifySleepingOwnership } from '../middlewares/verifySleepingOwnership';
import {
  validateEditSleepBody,
  validateEndSleepBody,
  validateStartSleepBody,
} from '../validators/sleepValidators';

const router = express.Router();

router.get('/:babyId', requireAuth, verifyBabyOwnership, getSleepings);

router.post(
  '/:babyId/start',
  requireAuth,
  verifyBabyOwnership,
  validateStartSleepBody,
  createStartSleep
);

router.post(
  '/:babyId/end',
  requireAuth,
  verifyBabyOwnership,
  validateEndSleepBody,
  createEndSleep
);

router.put(
  '/:sleepingId',
  requireAuth,
  verifySleepingOwnership,
  validateEditSleepBody,
  editSleeping
);

router.delete(
  '/:sleepingId',
  requireAuth,
  verifySleepingOwnership,
  deleteSleeping
);

export default router;
