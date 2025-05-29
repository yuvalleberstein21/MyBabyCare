import {
  DailySummary,
  DiaperLog,
  FeedingLog,
  SleepLog,
  SleepQuality,
} from '../types';

let now = new Date();
let currentTime = now.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

// Mock Feeding Logs
export const feedingLogs: FeedingLog[] = [
  { id: 1, babyId: 101, time: currentTime, amount: 120, type: 'bottle' },
  { id: 2, babyId: 101, time: currentTime, amount: null, type: 'breast' },
  { id: 3, babyId: 101, time: currentTime, amount: 60, type: 'solid' },
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
  date: new Date(),
  feedings: [
    { time: currentTime, type: 'bottle', amount: 120 },
    { time: currentTime, type: 'breast', amount: null },
    { time: currentTime, type: 'solid', amount: 60 },
  ],
  diaperChanges: [
    { time: '09:00', type: 'pee' },
    { time: '12:15', type: 'mixed' },
    { time: '18:00', type: 'poop' },
  ],
  sleepSessions: [
    { startTime: '10:00', endTime: '11:00' },
    { startTime: '15:00', endTime: '16:45' },
  ],
};
