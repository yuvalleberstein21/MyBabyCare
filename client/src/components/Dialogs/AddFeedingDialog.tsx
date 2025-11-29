import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { Title } from '../ui/Title';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentDateTimeLocal } from '../../utils/getCurrentDateTimeLocal';
import { Label } from '../ui/Label';
import { useFeedingActions } from '../../hooks/useFeeding';

interface AddFeedingDialogProps {
  open: boolean;
  babyId: string;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export const AddFeedingDialog: React.FC<AddFeedingDialogProps> = ({
  babyId,
  open,
  onClose,
}) => {
  const { create, loading, error, success } = useFeedingActions(babyId);
  const [type, setType] = useState('חלב אם');
  const [time, setTime] = useState(getCurrentDateTimeLocal());
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (success) {
      toast.success('ההאכלה נוספה בהצלחה 🍼');
      // איפוס ערכים
      setType('חלב אם');
      setTime('');
      setAmount('');
      setNotes('');
      onClose();
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, onClose]);

  const handleSave = async () => {
    const data = { type, time, amount, notes };
    await create(data);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fadeIn"
      dir="rtl"
    >
      <div className="bg-white w-full max-w-md rounded-t-3xl shadow-2xl p-6 animate-slideUp relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <Title className="text-lg font-semibold mb-4 text-center">
          הוספת האכלה
        </Title>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <Label label="סוג האכלה" />
            <select
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={loading}
            >
              <option value="חלב אם">חלב אם</option>
              <option value="בקבוק">בקבוק</option>
              <option value="מוצקים">מוצקים</option>
            </select>
          </div>

          <div>
            <Label label="זמן האכלה" />
            <input
              type="datetime-local"
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <Label label="כמות" />
            <input
              type="text"
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
              placeholder="כמות (אופציונלי, 120ml..)"
            />
          </div>

          <div>
            <Label label="הערות" />
            <textarea
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={loading}
              placeholder="הוספת פרטים נוספים..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>
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

export default AddFeedingDialog;
