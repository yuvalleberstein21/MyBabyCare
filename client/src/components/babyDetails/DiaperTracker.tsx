import { useState } from 'react';
import { Baby, Plus, Trash2 } from 'lucide-react';
import { Title } from '../ui/Title';
import { SubTitle } from '../ui/SubTitle';
import Button from '../ui/Button';
import { AddDiaperModal } from './AddDiaperDialog';

export const DiaperTracker = () => {
  const [changes, setChanges] = useState([
    {
      id: 1,
      type: 'רטוב',
      time: '2025-10-29T08:30:00',
      notes: 'החלפה רגילה בבוקר',
    },
    {
      id: 2,
      type: 'מלוכלך',
      time: '2025-10-28T22:00:00',
      notes: 'החלפה לפני השינה',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const remove = (id: number) => {
    setChanges((prev) => prev.filter((item) => item.id !== id));
  };

  const colorByType = (type: string) => {
    switch (type) {
      case 'רטוב':
        return 'bg-blue-100 text-blue-700';
      case 'מלוכלך':
        return 'bg-amber-100 text-amber-700';
      case 'שניהם':
        return 'bg-purple-100 text-purple-700';
      case 'יבש':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6 p-4 mx-auto">
      {/* כרטיס ראשי */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <Title className="text-xl font-semibold flex items-center gap-2">
              <Baby className="h-5 w-5 text-primary" />
              מעקב חיתולים
            </Title>
            <SubTitle className="text-gray-500 text-sm">
              תיעוד החלפות חיתול ומעקב אחר דפוסים
            </SubTitle>
          </div>
          <Button
            className="bg-primary text-white rounded-xl px-4 py-2 hover:bg-secondary transition"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="inline-block h-4 w-4 mr-2" />
            הוסף החלפה
          </Button>
        </div>

        <div className="p-6">
          {changes.length > 0 ? (
            <div className="space-y-3">
              {changes.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${colorByType(
                          item.type
                        )}`}
                      >
                        {item.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.time).toLocaleString('he-IL', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {item.notes && (
                      <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              אין עדיין החלפות מתועדות. לחץ על “הוסף החלפה” כדי להתחיל במעקב.
            </p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <AddDiaperModal babyId={1} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
