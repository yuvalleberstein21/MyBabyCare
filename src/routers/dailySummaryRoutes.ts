import express from 'express';
import { dailySummary } from '../data/mockData';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(dailySummary);
});

export default router;
