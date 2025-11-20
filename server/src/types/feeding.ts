import { Document, Types } from 'mongoose';

// האכלה
export interface IFeeding extends Document {
  babyId: Types.ObjectId;
  type: string;
  amount: string;
  time: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFeedingRequestBody {
  type: string;
  amount: string;
  time?: string;
  notes?: string;
}

export interface UpdateFeedingRequestBody {
  type?: string;
  amount: string;
  time?: string;
  notes?: string;
}

export interface FeedingResponse {
  _id: string;
  babyId: string;
  type: string;
  amount: string;
  time: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedingsListResponse {
  feedings: FeedingResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
