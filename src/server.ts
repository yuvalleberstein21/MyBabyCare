import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import feedRoutes from './routers/feedRoutes';
import sleepRoutes from './routers/sleepRoutes';
import diaperRoutes from './routers/diaperRoutes';
import dailySummaryRoutes from './routers/dailySummaryRoutes';
import authRoutes from './routers/authRoutes';
import babyRoutes from './routers/babyRoutes';
import { requireAuth } from './middlewares/auth';
import { connectDB } from './config/dataBase';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', requireAuth, (req, res) => {
  res.send('MyBabyCare API is running!');
});

app.use('/auth', authRoutes);
app.use('/babies', babyRoutes);
app.use('/feed', feedRoutes);
app.use('/sleep', sleepRoutes);
app.use('/diaper', diaperRoutes);
app.use('/daily-summary', dailySummaryRoutes);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(`${req.method}: ${req.originalUrl}, failed with error ${err}`);
  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 8001;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})();
