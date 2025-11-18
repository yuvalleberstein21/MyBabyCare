import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { Title } from '../ui/Title';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentDateTimeLocal } from '../../utils/getCurrentDateTimeLocal';
import { useHealth } from '../../hooks/useHealth';
import { Label } from '../ui/Label';

interface AddHealthDialogProps {
  open: boolean;
  babyId: string;
  onClose: () => void;
}

// Mock data לסוגי בריאות
const HEALTH_TYPES = [
  { value: 'temperature', label: '🌡️ חום' },
  { value: 'medicine', label: '💊 תרופה' },
  { value: 'vaccine', label: '💉 חיסון' },
  { value: 'checkup', label: '👨‍⚕️ בדיקה' },
  { value: 'symptom', label: '🤒 תסמין' },
];

export const AddHealthDialog: React.FC<AddHealthDialogProps> = ({
  babyId,
  open,
  onClose,
}) => {
  const { handleCreateHealth, loading, error, success } = useHealth();

  const [type, setType] = useState('temperature');
  const [time, setTime] = useState(getCurrentDateTimeLocal());
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');

  // איפוס טופס בסגירה
  useEffect(() => {
    if (!open) {
      setType('temperature');
      setTime(getCurrentDateTimeLocal());
      setValue('');
      setNotes('');
    }
  }, [open]);

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success('הרשומה הבריאותית נוספה בהצלחה 🏥');
      onClose();
    }
  }, [error, success]);

  const handleSave = async () => {
    if (!value.trim()) {
      toast.error('נא למלא את הערך הנדרש');
      return;
    }

    await handleCreateHealth({
      babyId,
      type,
      time,
      value,
      notes,
    });
  };

  // טקסטים דינמיים לפי סוג
  const getValueLabel = () => {
    switch (type) {
      case 'temperature':
        return 'חום גוף (°C)';
      case 'medicine':
        return 'שם התרופה';
      case 'vaccine':
        return 'שם החיסון';
      case 'checkup':
        return 'סוג הבדיקה';
      case 'symptom':
        return 'תיאור התסמין';
      default:
        return 'ערך';
    }
  };

  const getValuePlaceholder = () => {
    switch (type) {
      case 'temperature':
        return '37.5';
      case 'medicine':
        return 'נורופן לילדים';
      case 'vaccine':
        return 'חיסון שישי';
      case 'checkup':
        return 'בדיקת משקל וגובה';
      case 'symptom':
        return 'נזלת קלה';
      default:
        return '';
    }
  };

  const getValueType = () => {
    return type === 'temperature' ? 'number' : 'text';
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fadeIn"
      dir="rtl"
    >
      <div className="bg-white w-full max-w-md rounded-t-3xl shadow-2xl p-6 animate-slideUp relative">
        {/* כפתור סגירה */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={onClose}
          disabled={loading}
        >
          <X className="w-6 h-6" />
        </button>

        {/* כותרת */}
        <Title className="text-lg font-semibold mb-4 text-center">
          הוספת רשומה בריאותית 🏥
        </Title>

        {/* טופס */}
        <div className="space-y-4">
          {/* סוג רשומה */}
          <div>
            <Label label="סוג רשומה" />
            <select
              className="w-full border bg-background rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setValue(''); // איפוס ערך בשינוי סוג
              }}
              disabled={loading}
            >
              {HEALTH_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* תאריך ושעה */}
          <div>
            <Label label="תאריך ושעה" />
            <input
              type="datetime-local"
              className="w-full border bg-background rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* ערך מותאם לסוג */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {getValueLabel()}
            </label>

            <input
              type={getValueType()}
              className="w-full border bg-background rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={loading}
              placeholder={getValuePlaceholder()}
              step={type === 'temperature' ? '0.1' : undefined}
              min={type === 'temperature' ? '35' : undefined}
              max={type === 'temperature' ? '42' : undefined}
            />
          </div>

          {/* הערות */}
          <div>
            <Label label="הערות (אופציונלי)" />
            <textarea
              className="w-full border bg-background rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={loading}
              placeholder="הוספת פרטים נוספים..."
              rows={3}
            />
          </div>
        </div>

        {/* כפתורי פעולה */}
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            ביטול
          </Button>
          <Button
            className="flex-1 bg-gradient-primary transition"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'שומר...' : 'שמירה'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddHealthDialog;
