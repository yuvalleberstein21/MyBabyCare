// האכלה
export type FeedingType = 'bottle' | 'breast' | 'solid';

export interface FeedingLog {
  id: number;
  babyId: number;
  time: Date;
  amount: number | null;
  type: FeedingType;
}
