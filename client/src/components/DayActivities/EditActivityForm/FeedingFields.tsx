import type { FeedingType } from '../../../types';
import { Label } from '../../ui/Label';

interface feedingFieldsProps {
  formData: {
    feedingType: FeedingType;
    amount: string | number;
  };
  handleChange: (key: string, value: string | number) => void;
}

const FeedingFields = ({ formData, handleChange }: feedingFieldsProps) => (
  <>
    <div className="flex flex-col gap-2">
      <Label label="סוג האכלה" />
      <select
        value={formData.feedingType}
        onChange={(e) => handleChange('feedingType', e.target.value)}
        className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
      >
        <option value="" disabled>
          בחר סוג
        </option>
        <option value="חלב אם">חלב אם</option>
        <option value="בקבוק">בקבוק</option>
        <option value="מוצקים">מוצקים</option>
      </select>
    </div>

    <div className="flex flex-col gap-2">
      <Label label="כמות / תיאור" />
      <input
        type="text"
        value={formData.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
      />
    </div>
  </>
);

export default FeedingFields;
