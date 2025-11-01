import { useState } from 'react';
import { Title } from '../ui/Title';
import { SubTitle } from '../ui/SubTitle';
import Button from '../ui/Button';

interface AddFeedingModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
}
export const AddFeedingDialog: React.FC<AddFeedingModalProps> = ({
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
    console.log({ type, time, amount, duration, side, notes });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <Title className="text-lg font-semibold mb-2">הוספת האכלה</Title>
        <SubTitle className="text-gray-500 mb-4">
          עקוב אחרי זמני ההאכלה והכמות שנצרכה
        </SubTitle>

        {/* Form */}
        <div className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              סוג האכלה *
            </label>
            <select
              className="w-full border rounded-md p-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="breast">Breast</option>
              <option value="bottle">Bottle</option>
              <option value="solid">Solid Food</option>
            </select>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              זמן האכלה *
            </label>
            <input
              type="datetime-local"
              className="w-full border rounded-md p-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* Side & Duration (only for breast) */}
          {type === 'breast' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Side
                </label>
                <select
                  className="w-full border rounded-md p-2"
                  value={side}
                  onChange={(e) => setSide(e.target.value)}
                >
                  <option value="">Select side</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  משך זמן (דקות)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2"
                  placeholder="15"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Amount (for bottle or solid) */}
          {(type === 'bottle' || type === 'solid') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                כמות (ml)
              </label>
              <input
                type="number"
                className="w-full border rounded-md p-2"
                placeholder="120"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              הערות
            </label>
            <textarea
              className="w-full border rounded-md p-2"
              placeholder="הוספת הערות אופצינליות..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="secondary"
            className="flex-1 border border-gray-300 rounded-xl py-2 hover:bg-gray-500 transition"
            onClick={onClose}
          >
            ביטול
          </Button>
          <Button
            className="flex-1 bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            רשום האכלה
          </Button>
        </div>
      </div>
    </div>
  );
};
