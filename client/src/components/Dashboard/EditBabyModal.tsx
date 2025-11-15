import { ImagePlus, X } from 'lucide-react';
import React, { useState } from 'react';
import Button from '../ui/Button';

const EditBabyModal = ({ setIsModalEditOpen, baby, handleUpdate }) => {
  const [formData, setFormData] = useState({
    name: baby.name,
    birthDate: baby.birthDate
      ? new Date(baby.birthDate).toISOString().split('T')[0]
      : '',
    gender: baby.gender,
    weight: baby.weight,
    height: baby.height,
    photo: baby.image,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleUpdate(formData);
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
              <option value="נקבה">נקבה</option>
              <option value="זכר">זכר</option>
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
            // disabled={addLoading}
            className="w-full bg-gradient-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {/* {addLoading ? 'טוען...' : 'הוסף תינוק'} */}
            שמור
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditBabyModal;
