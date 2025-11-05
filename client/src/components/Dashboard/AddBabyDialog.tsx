import React, { useState } from 'react';
import { X, ImagePlus } from 'lucide-react';
import Button from '../ui/Button';

interface AddBabyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (baby: {
    name: string;
    birthDate: string;
    gender: string;
    weight: string;
    height: string;
    photo?: string;
  }) => void;
}

export const AddBabyDialog: React.FC<AddBabyDialogProps> = ({
  open,
  onOpenChange,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: 'female',
    weight: '',
    height: '',
    photo: '',
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd?.(formData);
    onOpenChange(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

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
              {formData.photo ? (
                <img
                  src={formData.photo}
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
            <label className="block text-sm font-medium mb-1">שם התינוק</label>
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
            <label className="block text-sm font-medium mb-1">תאריך לידה</label>
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
            <label className="block text-sm font-medium mb-1">מין</label>
            <select
              className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="female">נקבה</option>
              <option value="male">זכר</option>
            </select>
          </div>

          {/* משקל וגובה */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                משקל (ק"ג)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                גובה (ס"מ)
              </label>
              <input
                type="number"
                className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
              />
            </div>
          </div>

          {/* כפתור שמירה */}
          <Button
            type="submit"
            className="w-full bg-gradient-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            שמור תינוק
          </Button>
        </form>
      </div>
    </div>
  );
};
