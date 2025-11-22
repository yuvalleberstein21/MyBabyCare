import { Label } from '../../ui/Label';

interface HealthFieldsProps {
  formData: {
    healthType: string;
    value: string;
  };
  handleChange: (key: string, value: string) => void;
}
const HealthFields = ({ formData, handleChange }: HealthFieldsProps) => (
  <>
    <div className="flex flex-col gap-2">
      <Label label="סוג טיפול" />
      <select
        value={formData.healthType}
        onChange={(e) => handleChange('healthType', e.target.value)}
        className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
      >
        <option value="" disabled>
          בחר סוג
        </option>
        <option value="חום">חום</option>
        <option value="תרופה">תרופה</option>
        <option value="חיסון">חיסון</option>
        <option value="בדיקה">בדיקה</option>
        <option value="תסמין">תסמין</option>
      </select>
    </div>

    <div className="flex flex-col gap-2">
      <Label label="ערך בריאות" />
      <input
        type="text"
        value={formData.value}
        onChange={(e) => handleChange('value', e.target.value)}
        className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
      />
    </div>
  </>
);

export default HealthFields;
