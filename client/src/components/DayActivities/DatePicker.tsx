export const DatePicker = ({ selectedDate, onChange }) => {
  return (
    <input
      type="date"
      className="border p-2 rounded"
      value={selectedDate}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
