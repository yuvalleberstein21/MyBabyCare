import express from 'express';
import {
  Login,
  Logout,
  refreshAccessToken,
  Register,
} from '../controllers/authController';

const router = express.Router();

router.post('/login', Login);
router.post('/signup', Register);
router.post('/logout', Logout);
router.post('/refresh-token', refreshAccessToken);

export default router;
