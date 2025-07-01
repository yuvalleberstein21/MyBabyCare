import { IDiaper } from './diaper';
import { IFeeding } from './feeding';
import { ISleep } from './sleep';
import { JwtUser } from './user';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
      sleeping: ISleep;
      diaper: IDiaper;
      baby?: IBaby;
    }
  }
}

export {};
