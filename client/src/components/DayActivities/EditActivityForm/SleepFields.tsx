import { formatTimeOnly } from '../../../utils/FormatedISDate';

const SleepFields = ({ formData, handleChange }) => (
  <>
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-gray-700">התחלה</label>
      <input
        type="time"
        value={formatTimeOnly(formData.startTime)}
        onChange={(e) => handleChange('startTime', e.target.value)}
        className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="font-semibold text-gray-700">סיום</label>
      <input
        type="time"
        value={formatTimeOnly(formData.endTime)}
        onChange={(e) => handleChange('endTime', e.target.value)}
        className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
      />
    </div>
  </>
);

export default SleepFields;
