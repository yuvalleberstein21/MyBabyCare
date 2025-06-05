// חיתולים
export type DiaperType = 'pee' | 'poop' | 'mixed';

export interface DiaperLog {
  id: number;
  babyId: number;
  time: string;
  type: DiaperType;
}
