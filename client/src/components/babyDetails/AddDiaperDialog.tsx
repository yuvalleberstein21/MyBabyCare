import { useState } from 'react';
import Button from '../ui/Button';

export const AddDiaperModal = ({ babyId, onClose }) => {
  const [type, setType] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    console.log({ babyId, type, notes });
    onClose(); // סגור את המודל אחרי שמירה
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Close Button (X) */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold mb-4">הוספת החלפה לתינוק</h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              סוג החלפה
            </label>
            <select
              className="w-full border rounded-md p-2"
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
              className="w-full border rounded-md p-2"
              placeholder="הערות אופצינליות..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
