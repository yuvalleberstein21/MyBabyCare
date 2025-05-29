import express from 'express';

const router = express.Router();

router.get('/diaper', (req, res) => {
  res.send('Diaper routes');
});

export default router;
