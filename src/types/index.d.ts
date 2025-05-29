import { users } from '../data/mockData';

declare global {
  namespace Express {
    interface Request {
      user?: (typeof users)[number];
    }
  }
}
