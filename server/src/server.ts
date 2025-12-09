import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import feedRoutes from './routers/feedRoutes';
import sleepRoutes from './routers/sleepRoutes';
import diaperRoutes from './routers/diaperRoutes';
import authRoutes from './routers/authRoutes';
import babyRoutes from './routers/babyRoutes';
import healthRoutes from './routers/healthRoutes';
import dailySummaryRoutes from './routers/dailySummaryRoutes';
import connectDB from './config/dataBase';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';
import cloudinary from './config/cloudinary';

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      'https://my-baby-care-tau.vercel.app',
      'https://app.babytracker.online',
      'https://api.babytracker.online',
      'http://localhost:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

app.use(limiter);

// Swagger APIS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoutes);
app.use('/babies', babyRoutes);
app.use('/feed', feedRoutes);
app.use('/sleep', sleepRoutes);
app.use('/diaper', diaperRoutes);
app.use('/health', healthRoutes);
app.use('/daily-summary', dailySummaryRoutes);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(`${req.method}: ${req.originalUrl}`, err);
  res.status(500).json({ error: 'שגיאה פנימית בשרת' });
};

app.use(errorHandler);

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('PORT environment variable not set');
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
