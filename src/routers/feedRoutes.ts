import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Feed routes');
});

export default router;
