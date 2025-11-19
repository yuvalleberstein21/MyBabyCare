export const DatePicker = ({ className, selectedDate, onChange }) => {
  return (
    <input
      className={className}
      type="date"
      value={selectedDate}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
