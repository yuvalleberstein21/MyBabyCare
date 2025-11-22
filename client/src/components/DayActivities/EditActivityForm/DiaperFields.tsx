import { Label } from '../../ui/Label';

interface DiaperFieldsProps {
  formData: {
    diaperType: string;
  };
  handleChange: (key: string, value: string) => void;
}
const DiaperFields = ({ formData, handleChange }: DiaperFieldsProps) => (
  <div className="flex flex-col gap-2">
    <Label label="סוג חיתול" />

    <select
      value={formData.diaperType}
      onChange={(e) => handleChange('diaperType', e.target.value)}
      className="w-full border bg-background rounded-xl p-2"
    >
      <option value="" disabled>
        בחר סוג חיתול
      </option>
      <option value="רטוב">רטוב</option>
      <option value="מלוכלך">מלוכלך</option>
      <option value="שניהם">שניהם</option>
      <option value="יבש">יבש</option>
    </select>
  </div>
);

export default DiaperFields;
