export type ID = string;

export interface Baby {
  _id: ID;
  name: string;
  gender: 'זכר' | 'נקבה';
  birthDate: string;
  weight?: number;
  height?: number;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type NewBaby = Omit<Baby, '_id' | 'createdAt' | 'updatedAt'> & {
  weight?: number;
  height?: number;
  image?: string;
};
