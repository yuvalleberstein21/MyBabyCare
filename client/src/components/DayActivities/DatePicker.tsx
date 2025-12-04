interface DatePickerProps {
  className?: string;
  selectedDate: string;
  onChange: (date: string) => void;
}
export const DatePicker = ({
  className,
  selectedDate,
  onChange,
}: DatePickerProps) => {
  return (
    <input
      className={className}
      type="date"
      value={selectedDate}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
