export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  comparePassword(bodyPassword: string): Promise<boolean>;
}

export interface JwtUser {
  id: string;
  name: string;
}
