import express from 'express';
import { requireAuth } from '../middlewares/auth';
import { createDiaper, getDiaper } from '../controllers/diaperController';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';

const router = express.Router();

router.get('/:babyId', requireAuth, verifyBabyOwnership, getDiaper);
router.post('/:babyId', requireAuth, verifyBabyOwnership, createDiaper);

// router.put('/:sleepingId', requireAuth, verifySleepingOwnership, editSleeping);
// router.delete(
//   '/:sleepingId',
//   requireAuth,
//   verifySleepingOwnership,
//   deleteSleeping
// );

export default router;
