import express from 'express';
import {
  getCurrentUser,
  Login,
  Logout,
  refreshAccessToken,
  Register,
} from '../controllers/authController';
import {
  validateLoginFields,
  validateUserFields,
} from '../validators/userValidators';

const router = express.Router();

router.post('/login', validateLoginFields, Login);
router.post('/signup', validateUserFields, Register);
router.post('/logout', Logout);
router.post('/refresh-token', refreshAccessToken);
router.get('/me', getCurrentUser);

export default router;
