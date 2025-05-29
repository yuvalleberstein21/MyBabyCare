import express from 'express';

const router = express.Router();

router.get('/sleep', (req, res) => {
  res.send('Sleep routes');
});

export default router;
