import { Request, RequestHandler, Response } from 'express';

export const getFeedings = (req: Request, res: Response) => {
  res.send('get all feedings of baby');
};

export const createFeeding: RequestHandler = (req, res) => {};
