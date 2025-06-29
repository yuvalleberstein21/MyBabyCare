import authDocs from './auth.docs';
import babyDocs from './baby.docs';
import dailySummaryDocs from './dailySummary';
import feedingDocs from './feeding.docs';
import sleepDocs from './sleeping.docs';

export default {
  openapi: '3.0.0',
  info: {
    title: 'My Baby Care API',
    version: '1.0.0',
    description: 'API לניהול תינוקות, שינה, האכלה והרשאות',
  },
  servers: [
    {
      url: 'http://localhost:8005',
      description: 'שרת פיתוח',
    },
  ],
  paths: {
    ...authDocs,
    ...babyDocs,
    ...feedingDocs,
    ...sleepDocs,
    ...dailySummaryDocs,
  },
};
