import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { Title } from '../ui/Title';
import { X } from 'lucide-react';
import { useCreateDiaper } from '../../hooks/useDiaper';
import toast from 'react-hot-toast';
import { Label } from '../ui/Label';

interface AddDiaperModalProps {
  babyId: string;
  onClose: () => void;
}

export const AddDiaperDialog: React.FC<AddDiaperModalProps> = ({
  babyId,
  onClose,
}) => {
  const { handleCreateDiaper, loading, error, success } =
    useCreateDiaper(babyId);

  const [type, setType] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (success) {
      toast.success('החלפה בוצעה בהצלחה 🍼');
      // איפוס ערכים
      setType('רטוב');
      setTime('');
      setNotes('');
      onClose();
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, onClose]);

  const handleSave = async () => {
    const data = { type, time, notes };
    await handleCreateDiaper(data);
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
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <Title className="text-lg font-semibold mb-4 text-center">
          הוספת החלפה לתינוק
        </Title>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <Label label="שעת החלפה" />
            <input
              type="datetime-local"
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <Label label="סוג חלפה" />
            <select
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">בחר סוג</option>
              <option value="רטוב">רטוב</option>
              <option value="מלוכלך">מלוכלך</option>
              <option value="שניהם">שניהם</option>
              <option value="יבש">יבש</option>
            </select>
          </div>

          <div>
            <Label label="הערות" />
            <input
              className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            ביטול
          </Button>
          <Button
            variant="primary"
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
