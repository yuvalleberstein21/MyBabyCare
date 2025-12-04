export type ID = string;

export interface Baby {
  _id: ID;
  name: string;
  gender: 'זכר' | 'נקבה';
  birthDate: string;
  weight: number | undefined;
  height: number | undefined;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type NewBaby = Omit<Baby, '_id' | 'createdAt' | 'updatedAt'> & {
  weight: number | undefined;
  height: number | undefined;
  image?: string;
};
