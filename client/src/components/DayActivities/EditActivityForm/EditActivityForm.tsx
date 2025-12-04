import { useState } from 'react';
import { formatToHHMM, typeLabels } from '../../../utils/FormatedISDate';
import { Loader2 } from 'lucide-react';
import Button from '../../ui/Button';
import FeedingFields from './FeedingFields';
import SleepFields from './SleepFields';
import DiaperFields from './DiaperFields';
import HealthFields from './HealthFields';
import { Label } from '../../ui/Label';
import type { Activity } from '../../../types';

interface EditActivityFormProps {
  act: Activity;
  onSave: (updatedData: Activity) => void;
  onClose: () => void;
  selectedDate: string;
}
export const EditActivityForm = ({
  act,
  onSave,
  onClose,
  selectedDate,
}: EditActivityFormProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState(() => {
    switch (act.type) {
      case 'sleep':
        return {
          startTime: act.startTime ? formatToHHMM(act.startTime) : '',
          endTime: act.endTime ? formatToHHMM(act.endTime) : '',
          notes: act.notes || '',
        };
      case 'feeding':
        return {
          time: act.time ? formatToHHMM(act.time) : '',
          notes: act.notes || '',
          feedingType: act.feedingType || '',
          amount: act.amount || '',
        };
      case 'diaper':
        return {
          time: act.time ? formatToHHMM(act.time) : '',
          notes: act.notes || '',
          diaperType: act.diaperType || '',
        };
      case 'health':
        return {
          time: act.time ? formatToHHMM(act.time) : '',
          notes: act.notes || '',
          healthType: act.healthType || '',
          value: act.value || '',
        };
      default:
        return {};
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({ ...formData, selectedDate });
    } catch (err) {
      console.error('Failed to save activity:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fadeIn"
      dir="rtl"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-t-3xl shadow-2xl p-6 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            עדכון ({typeLabels[act.type]})
          </h2>

          {/* שעה רק לפעילויות שאינן שינה */}
          {act.type !== 'sleep' && (
            <div className="flex flex-col gap-2">
              <Label label="שעה" />
              <input
                type="time"
                value={formData.time || ''}
                onChange={(e) => handleChange('time', e.target.value)}
                disabled={isSaving}
                className={`w-full border rounded-xl p-2 disabled:opacity-50 ${
                  errors.time ? 'border-red-500' : ''
                }`}
              />
              {errors.time && (
                <span className="text-red-500 text-sm">{errors.time}</span>
              )}
            </div>
          )}

          {/* שדות הערות */}
          <div className="flex flex-col gap-2">
            <Label label="הערות" />
            <textarea
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
              disabled={isSaving}
              className="w-full border bg-background rounded-xl p-2 focus:ring-2 focus:ring-primary outline-none transition disabled:opacity-50"
              rows={2}
            />
          </div>

          {/* שדות מיוחדים לכל סוג פעילות */}
          {act.type === 'feeding' && (
            <FeedingFields
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              disabled={isSaving}
            />
          )}
          {act.type === 'sleep' && (
            <SleepFields
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              disabled={isSaving}
            />
          )}
          {act.type === 'diaper' && (
            <DiaperFields
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              disabled={isSaving}
            />
          )}
          {act.type === 'health' && (
            <HealthFields
              formData={formData}
              handleChange={handleChange}
              disabled={isSaving}
            />
          )}

          {/* כפתורי פעולה */}
          <div className="flex gap-4 mt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isSaving}
            >
              בטל
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1 bg-gradient-primary flex items-center justify-center gap-2"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  שומר...
                </>
              ) : (
                'שמור'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditActivityForm;
