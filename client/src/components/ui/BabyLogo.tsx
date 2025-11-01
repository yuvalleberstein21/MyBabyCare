import { Baby } from 'lucide-react';

interface BabyLogoProps {
  size?: number; // גודל הריבוע
  bgColor?: string; // צבע רקע
  iconColor?: string; // צבע האייקון
  text?: string; // טקסט פנימי אם רוצים
}
export const BabyLogo = ({
  size = 64,
  bgColor = 'bg-primary',
  iconColor = 'text-white',
  text,
}: BabyLogoProps) => {
  return (
    <div
      className={`rounded-full flex items-center justify-center shadow-lg ${bgColor}`}
      style={{ width: size, height: size }}
    >
      {text ? (
        <span className={`text-xl font-bold ${iconColor}`}>{text}</span>
      ) : (
        <Baby className={`w-8 h-8 ${iconColor}`} />
      )}
    </div>
  );
};
