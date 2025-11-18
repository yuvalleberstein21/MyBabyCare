const FeedingFields = ({ formData, handleChange }) => (
  <>
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-gray-700">סוג האכלה</label>
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
      <label className="font-semibold text-gray-700">כמות (מ״ל)</label>
      <input
        type="number"
        value={formData.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
      />
    </div>
  </>
);

export default FeedingFields;
