// export interface FeedingFieldsData {
//   feedingType: string;
//   amount: string | number;
// }

// export interface SleepFieldsData {
//   startTime: string;
//   endTime: string;
// }

// export type DiaperType = 'רטוב' | 'מלוכלך' | 'שניהם';

// export interface DiaperFieldsData {
//   diaperType: DiaperType;
// }

// export interface HealthFieldsData {
//   healthType: string;
//   value: string | number;
// }

// export interface EditActivityFormData {
//   time: string;
//   notes: string;
//   feeding?: FeedingFieldsData;
//   sleep?: SleepFieldsData;
//   diaper?: DiaperFieldsData;
//   health?: HealthFieldsData;
// }

// export interface EditActivityFormProps {
//   act: {
//     type: 'feeding' | 'sleep' | 'diaper' | 'health';
//     time?: string;
//     notes?: string;

//     feedingType?: string;
//     amount?: string | number;

//     startTime?: string;
//     endTime?: string;

//     diaperType?: DiaperType;

//     healthType?: string;
//     value?: string | number;
//   };
//   onSave: (data: EditActivityFormData) => void;
//   onClose: () => void;
// }
