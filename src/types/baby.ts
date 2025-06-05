// מידע של תינוק
export interface IBaby {
  id: string;
  name: string;
  userId: string;
  gender: string;
  birthDate: string;
  notes: string;
}

export type IBabyDocument = Document & IBaby;
