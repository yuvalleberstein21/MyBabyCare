import type { ID } from './baby.types';

export interface User {
  _id: ID;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}
