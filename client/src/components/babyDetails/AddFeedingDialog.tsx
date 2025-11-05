import { useState } from 'react';

import Button from '../ui/Button';

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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto animate-slideUp">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">הוספת האכלה</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
        >
          ×
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            סוג האכלה *
          </label>
          <select
            className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-400 transition"
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
            className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-400 transition"
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
                className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-400 transition"
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
                className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-400 transition"
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
              className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-green-400 transition"
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
            className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-gray-300 transition"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="הוספת הערות אופציונליות..."
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <Button
          variant="secondary"
          className="flex-1 border border-gray-300 rounded-xl py-2 hover:bg-gray-100 transition"
          onClick={onClose}
        >
          ביטול
        </Button>
        <Button
          className="flex-1 bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-700 transition"
          onClick={handleSave}
        >
          שמור
        </Button>
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.35s ease-out; }
      `}</style>
    </div>
  );
};

export default AddFeedingDialog;
