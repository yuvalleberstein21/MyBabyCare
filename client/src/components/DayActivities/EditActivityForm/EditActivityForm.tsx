import { useState } from 'react';
import { formatToHHMM, typeLabels } from '../../../utils/FormatedISDate';
import Button from '../../ui/Button';
import FeedingFields from './FeedingFields';
import SleepFields from './SleepFields';
import DiaperFields from './DiaperFields';
import HealthFields from './HealthFields';
import { Label } from '../../ui/Label';

export const EditActivityForm = ({ act, onSave, onClose, selectedDate }) => {
  const [activityDate] = useState(act.time);

  const [formData, setFormData] = useState({
    time: formatToHHMM(activityDate),
    notes: act.notes || '',
    feedingType: act.feedingType || '',
    amount: act.amount || '',
    startTime: act.startTime || '',
    endTime: act.endTime || '',
    diaperType: act.diaperType || '',
    healthType: act.healthType || '',
    value: act.value || '',
  });

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      selectedDate,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fadeIn"
      dir="rtl"
    >
      <div className="bg-white w-full max-w-md rounded-t-3xl shadow-2xl p-6 animate-slideUp relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            עדכון פעילות — {typeLabels[act.type]}
          </h2>

          {/* Time */}
          {act.type !== 'sleep' && (
            <div className="flex flex-col gap-2">
              <Label label="שעה" />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full border rounded-xl p-2"
              />
            </div>
          )}

          {/* Notes */}
          <div className="flex flex-col gap-2">
            <Label label="הערות" />
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition"
              rows={2}
            />
          </div>

          {/* Dynamic-fields */}
          {act.type === 'feeding' && (
            <FeedingFields formData={formData} handleChange={handleChange} />
          )}
          {act.type === 'sleep' && (
            <SleepFields formData={formData} handleChange={handleChange} />
          )}
          {act.type === 'diaper' && (
            <DiaperFields formData={formData} handleChange={handleChange} />
          )}
          {act.type === 'health' && (
            <HealthFields formData={formData} handleChange={handleChange} />
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              בטל
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1 bg-gradient-primary"
            >
              שמור
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditActivityForm;
