import {
  Baby,
  DailySummary,
  DiaperLog,
  FeedingLog,
  SleepLog,
  SleepQuality,
  User,
} from '../types';

const now = new Date();
const currentTime = now.toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
});

const today = new Date('2025-05-29');

// Mock User

export const users: User[] = [
  { id: '1', fullName: 'yuval leb', password: '123456' },
  { id: '2', fullName: 'admin', password: 'admin123' },
];

// Mock Baby Logs
export const babyData: Baby = {
  id: '101',
  name: 'Shon',
  userId: '10345',
};

// Mock Feeding Logs
export const feedingLogs: FeedingLog[] = [
  { id: 1, babyId: 101, time: today, amount: 120, type: 'bottle' },
  { id: 2, babyId: 101, time: today, amount: null, type: 'breast' },
  { id: 3, babyId: 101, time: today, amount: 60, type: 'solid' },
];

// Mock Sleep Logs
export const sleepLogs: SleepLog[] = [
  {
    id: 1,
    babyId: 101,
    start: '2025-05-29T10:00:00Z',
    end: '2025-05-29T11:00:00Z',
    sleepQuality: SleepQuality.Good,
  },
  {
    id: 2,
    babyId: 101,
    start: '2025-05-29T15:00:00Z',
    end: '2025-05-29T16:45:00Z',
    sleepQuality: SleepQuality.Excellent,
  },
];

// Mock Diaper Logs
export const diaperLogs: DiaperLog[] = [
  { id: 1, babyId: 101, time: currentTime, type: 'pee' },
  { id: 2, babyId: 101, time: currentTime, type: 'mixed' },
  { id: 3, babyId: 101, time: currentTime, type: 'poop' },
];

// Mock Daily Summary
export const dailySummary: DailySummary = {
  date: '26/06/2025',
  feedings: [
    { time: today, type: 'bottle', amount: 120 },
    { time: today, type: 'breast', amount: null },
    { time: today, type: 'solid', amount: 60 },
  ],
  diaperChanges: [
    { time: currentTime, type: 'pee' },
    { time: currentTime, type: 'mixed' },
    { time: currentTime, type: 'poop' },
  ],
  sleepSessions: [
    { startTime: '10:00', endTime: '11:00' },
    { startTime: '15:00', endTime: '16:45' },
  ],
};
