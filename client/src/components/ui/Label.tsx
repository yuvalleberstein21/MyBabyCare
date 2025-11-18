interface LabelProps {
  label: string;
}
export const Label = ({ label }: LabelProps) => {
  return (
    <div className="block text-sm font-medium mb-1 font-playful">{label}</div>
  );
};
