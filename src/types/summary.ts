export type IFeedingSummary = {
  _id: string;
  type: string;
  amount: number;
  time: Date;
  notes?: string;
};

export type IDiaperSummary = {
  _id: string;
  type: string;
  time: Date;
  notes?: string;
};

export type ISleepSummary = {
  _id: string;
  startTime: Date;
  endTime?: Date;
};

export type IDailySummaryResponse = {
  success: true;
  data: {
    babyId: string;
    date: string;
    summary: {
      feedings: IFeedingSummary[];
      diaperChanges: IDiaperSummary[];
      sleepSessions: ISleepSummary[];
    };
    meta: {
      dateRange: {
        start: string;
        end: string;
      };
    };
  };
};
