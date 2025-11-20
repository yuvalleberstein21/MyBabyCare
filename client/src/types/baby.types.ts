export type ID = string;

export interface Baby {
  _id: ID;
  name: string;
  gender: 'בן' | 'בת';
  birthDate: string;
  createdAt?: string;
  updatedAt?: string;
}
