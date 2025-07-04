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
import { validateEditSleepBody } from '../validators/sleepValidators';

const router = express.Router();

router.get('/:babyId', requireAuth, verifyBabyOwnership, getSleepings);
router.post(
  '/:babyId/start',
  requireAuth,
  verifyBabyOwnership,
  createStartSleep
);
router.post('/:babyId/end', requireAuth, verifyBabyOwnership, createEndSleep);
router.put('/:sleepingId', requireAuth, verifySleepingOwnership, editSleeping);
router.delete(
  '/:sleepingId',
  requireAuth,
  verifySleepingOwnership,
  deleteSleeping
);

export default router;
