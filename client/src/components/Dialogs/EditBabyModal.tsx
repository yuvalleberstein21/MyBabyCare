import { ImagePlus, X } from 'lucide-react';
import React, { useState } from 'react';
import Button from '../ui/Button';
import { Label } from '../ui/Label';
type Baby = {
  _id: string;
  name: string;
  birthDate: string;
  gender: 'זכר' | 'נקבה';
  weight: number;
  height: number;
  photo?: string;
};

interface EditBabyDialogProps {
  setIsModalEditOpen: (open: boolean) => void;
  baby: Baby;
  handleUpdate?: (babyData: Baby) => void | Promise<void>;
}
const EditBabyModal: React.FC<EditBabyDialogProps> = ({
  setIsModalEditOpen,
  baby,
  handleUpdate,
}) => {
  const [formData, setFormData] = useState<Baby>({
    _id: baby._id,
    name: baby.name,
    birthDate: baby.birthDate
      ? new Date(baby.birthDate).toISOString().split('T')[0]
      : '',
    gender: baby.gender,
    weight: baby.weight,
    height: baby.height,
    photo: baby.photo,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleUpdate?.(formData);
      setIsModalEditOpen(false);
    } catch (err) {
      console.log(err);
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
          onClick={() => setIsModalEditOpen(false)}
          className="absolute top-3 left-3 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          עריכת פרטי תינוק
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
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
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.value })
                }
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
                step="0.1"
                className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <Label label="גובה (ס״מ)" />
              <input
                type="number"
                className="w-full p-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: Number(e.target.value) })
                }
              />
            </div>
          </div>

          {/* כפתור שמירה */}
          <Button
            type="submit"
            className="w-full bg-gradient-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            שמור
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditBabyModal;
