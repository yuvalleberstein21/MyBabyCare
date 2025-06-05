import { IBaby } from './baby';

// מידע של משתמש
export interface IUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  babies: IBaby[];
}

export type IUserDocument = Document & IUser;

export interface JwtUser {
  id: string;
  name: string;
}
