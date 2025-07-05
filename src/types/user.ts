export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  comparePassword(bodyPassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface RegisterRequestBody {
  fullName: string;
  email: string;
  password: string;
}

export interface JwtUser {
  id: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
