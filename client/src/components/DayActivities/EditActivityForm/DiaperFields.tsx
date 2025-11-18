const DiaperFields = ({ formData, handleChange }) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-gray-700">סוג חיתול</label>

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
