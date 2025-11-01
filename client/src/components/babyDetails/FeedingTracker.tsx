import { useState } from 'react';
import Button from '../ui/Button';
import { Plus, Trash2 } from 'lucide-react';
import { Title } from '../ui/Title';
import { SubTitle } from '../ui/SubTitle';

export const FeedingTracker = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [feedings, setFeedings] = useState([
    {
      id: 1,
      type: 'בקבוק',
      time: '2025-10-29T09:30:00',
      amount: 120,
      duration: 10,
      notes: 'אכל בשמחה ונרדם מיד אחרי',
    },
    {
      id: 2,
      type: 'הנקה',
      time: '2025-10-28T22:00:00',
      duration: 15,
      side: 'ימין',
    },
  ]);

  const handleDelete = (id: number) => {
    setFeedings((prev) => prev.filter((f) => f.id !== id));
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6 p-4 mx-auto direction-rtl text-right">
      {/* כרטיס עליון */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Title className="text-xl font-semibold flex items-center gap-2">
              🍼 מעקב האכלה
            </Title>
            <SubTitle className="text-gray-500 text-sm">
              עקוב אחרי זמני ההאכלה והכמות שנצרכה
            </SubTitle>
          </div>

          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-primary hover:bg-primary flex items-center gap-1 text-center"
          >
            <Plus className="h-4 w-4" />
            הוסף האכלה
          </Button>
        </div>

        {feedings.length > 0 ? (
          <div className="space-y-3">
            {feedings.map((feeding) => (
              <div
                key={feeding.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {feeding.type} • {formatTime(feeding.time)}
                  </p>

                  <div className="text-sm text-gray-600 space-y-1">
                    {feeding.amount && <p>כמות: {feeding.amount} מ״ל</p>}
                    {feeding.duration && <p>משך: {feeding.duration} דקות</p>}
                    {feeding.side && <p>צד: {feeding.side}</p>}
                    {feeding.notes && (
                      <p className="text-gray-400 mt-1">{feeding.notes}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(feeding.id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            אין עדיין רשומות האכלה. לחץ על "הוסף האכלה" כדי להתחיל במעקב.
          </p>
        )}
      </div>

      {/* דיאלוג הוספה פשוט */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-sm text-center animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4">הוסף האכלה חדשה</h3>
            <p className="text-gray-500 mb-6">(בשלב זה מדובר בהדמיה בלבד)</p>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                ביטול
              </Button>
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                שמירה
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
