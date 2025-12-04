// @ts-nocheck
import { Label } from '../../ui/Label';

interface SleepFieldsProps {
  formData: {
    startTime: string;
    endTime: string;
  };
  handleChange: (key: string, value: string | number) => void;
  errors: boolean;
}

const SleepFields = ({ formData, handleChange, errors }: SleepFieldsProps) => (
  <>
    <div className="flex flex-col gap-2">
      <Label label="התחלה" />
      <input
        type="time"
        value={formData.startTime}
        onChange={(e) => handleChange('startTime', e.target.value)}
        className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
      />
      {errors.startTime && (
        <span className="text-red-500 text-sm">{errors.startTime}</span>
      )}
    </div>

    <div className="flex flex-col gap-2">
      <Label label="סיום" />
      <input
        type="time"
        value={formData.endTime}
        onChange={(e) => handleChange('endTime', e.target.value)}
        className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
      />
      {errors.endTime && (
        <span className="text-red-500 text-sm">{errors.endTime}</span>
      )}
    </div>
  </>
);

export default SleepFields;
