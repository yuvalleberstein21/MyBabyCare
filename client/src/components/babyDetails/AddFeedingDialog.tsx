import { useState } from 'react';
import Button from '../ui/Button';
import { Title } from '../ui/Title';
import { X } from 'lucide-react';

interface AddFeedingDialogProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
}

export const AddFeedingDialog: React.FC<AddFeedingDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [type, setType] = useState('breast');
  const [time, setTime] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [side, setSide] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    const data = { type, time, amount, duration, side, notes };
    if (onSave) onSave(data);
    // איפוס ערכים
    setType('breast');
    setTime('');
    setAmount('');
    setDuration('');
    setSide('');
    setNotes('');
    onClose();
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              סוג האכלה *
            </label>
            <select
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="breast">חלב אם</option>
              <option value="bottle">בקבוק</option>
              <option value="solid">מוצקים</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              זמן האכלה *
            </label>
            <input
              type="datetime-local"
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {type === 'breast' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  צד
                </label>
                <select
                  className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
                  value={side}
                  onChange={(e) => setSide(e.target.value)}
                >
                  <option value="">בחר צד</option>
                  <option value="left">שמאל</option>
                  <option value="right">ימין</option>
                  <option value="both">שני הצדדים</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  משך זמן (דקות)
                </label>
                <input
                  type="number"
                  className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="15"
                />
              </div>
            </div>
          )}

          {(type === 'bottle' || type === 'solid') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                כמות (ml)
              </label>
              <input
                type="number"
                className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="120"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              הערות
            </label>
            <textarea
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="הוספת הערות אופציונליות..."
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
          >
            שמירה
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFeedingDialog;
