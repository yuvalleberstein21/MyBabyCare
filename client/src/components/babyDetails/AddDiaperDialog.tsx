import { useState } from 'react';
import Button from '../ui/Button';

interface AddDiaperModalProps {
  babyId: string;
  onClose: () => void;
}

export const AddDiaperModal: React.FC<AddDiaperModalProps> = ({
  babyId,
  onClose,
}) => {
  const [type, setType] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    console.log({ babyId, type, notes });
    onClose();
  };

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
          ✕
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold mb-4 text-center">
          הוספת החלפה לתינוק
        </h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              סוג החלפה
            </label>
            <select
              className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-400 transition"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">בחר סוג</option>
              <option value="wet">Wet</option>
              <option value="dirty">Dirty</option>
              <option value="both">שניהם</option>
              <option value="dry">Dry</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              הערות
            </label>
            <input
              className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-gray-300 transition"
              placeholder="הערות אופציונליות..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
            variant="primary"
            className="flex-1 bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            שמירה
          </Button>
        </div>
      </div>
    </div>
  );
};
