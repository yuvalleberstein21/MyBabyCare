// @ts-nocheck
import React, { useCallback, useState } from 'react';
import { X, ImagePlus } from 'lucide-react';
import Button from '../ui/Button';
import { Label } from '../ui/Label';
import type { NewBaby } from '../../types';

interface AddBabyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded?: (babyData: NewBaby) => void;
  addLoading: boolean;
}

const INITIAL_FORM_DATA: NewBaby = {
  name: '',
  birthDate: '',
  gender: 'נקבה',
  weight: 0,
  height: 0,
  image: '',
};

export const AddBabyDialog: React.FC<AddBabyDialogProps> = ({
  open,
  onOpenChange,
  onAdded,
  addLoading,
}) => {
  const [formData, setFormData] = useState<NewBaby>(INITIAL_FORM_DATA);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('birthDate', formData.birthDate);
      fd.append('gender', formData.gender);

      if (formData.weight) fd.append('weight', String(formData.weight));
      if (formData.height) fd.append('height', String(formData.height));

      if (imageFile) {
        fd.append('image', imageFile);
      }

      try {
        if (onAdded) {
          await onAdded(fd as any);
        }

        resetForm();
        handleClose();
      } catch (err) {
        console.error('Error adding baby:', err);
      }
    },
    [formData, onAdded, resetForm, handleClose, imageFile]
  );

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        dir="rtl"
        className="bg-card w-full max-w-md rounded-2xl shadow-lg p-6 relative animate-fade-in"
      >
        {/* כפתור סגירה */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 left-3 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">הוסף תינוק חדש</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* העלאת תמונה */}
          <div className="flex flex-col items-center mb-4">
            <label className="relative w-28 h-28 rounded-full bg-muted flex items-center justify-center cursor-pointer overflow-hidden hover:opacity-90 transition">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="תמונת תינוק"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImagePlus className="h-8 w-8 mb-1" />
                  <span className="text-xs">העלה תמונה</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          {/* שם */}
          <div>
            <Label label="שם התינוק" />
            <input
              type="text"
              required
              className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* תאריך לידה */}
          <div>
            <Label label="תאריך לידה" />
            <input
              type="date"
              required
              className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
            />
          </div>

          {/* מין */}
          <div>
            <Label label="מין" />
            <select
              className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
              value={formData.gender}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gender: e.target.value as 'זכר' | 'נקבה',
                })
              }
            >
              <option value="נקבה">נקבה</option>
              <option value="זכר">זכר</option>
            </select>
          </div>

          {/* משקל וגובה */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label label="משקל (ק״ג)" />
              <input
                type="number"
                step={0.1}
                min={0}
                className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: e.target.value ? parseFloat(e.target.value) : 0,
                  })
                }
              />
            </div>

            <div>
              <Label label="גובה (ס״מ)" />
              <input
                type="number"
                step={0.1}
                min={0}
                className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                value={formData.height}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    height: e.target.value ? parseFloat(e.target.value) : 0,
                  })
                }
              />
            </div>
          </div>

          {/* כפתור שמירה */}
          <Button
            type="submit"
            disabled={addLoading}
            className="w-full bg-gradient-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {addLoading ? 'טוען...' : 'הוסף תינוק'}
          </Button>
        </form>
      </div>
    </div>
  );
};
