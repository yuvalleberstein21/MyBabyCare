import express from 'express';
import { requireAuth } from '../middlewares/auth';
import {
  createDiaper,
  deleteDiaper,
  editDiaper,
  getDiaper,
} from '../controllers/diaperController';
import { verifyBabyOwnership } from '../middlewares/verifyBabyOwnership';
import { verifyDiaperOwnership } from '../middlewares/verifyDiaperOwnership';
import {
  validateCreateDiaper,
  validateUpdateDiaper,
} from '../validators/diaperValidators';

const router = express.Router();

router.get('/:babyId', requireAuth, verifyBabyOwnership, getDiaper);
router.post(
  '/:babyId',
  requireAuth,
  verifyBabyOwnership,
  validateCreateDiaper,
  createDiaper
);

router.put(
  '/:diaperId',
  requireAuth,
  verifyDiaperOwnership,
  validateUpdateDiaper,
  editDiaper
);
router.delete('/:diaperId', requireAuth, verifyDiaperOwnership, deleteDiaper);

export default router;
