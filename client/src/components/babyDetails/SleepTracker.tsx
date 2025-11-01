import { useState } from 'react';
import Button from '../ui/Button';

export const SleepTracker = () => {
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState([
    {
      id: 1,
      startTime: '2025-10-28T22:15:00',
      endTime: '2025-10-29T06:30:00',
      duration: 495,
      notes: 'שינה רציפה וללא התעוררויות',
    },
  ]);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleDelete = (id: number) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} שעות ו-${mins} דקות`;
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6 p-4 mx-auto direction-rtl text-right">
      {/* כרטיס עליון */}
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100">
        <h2 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
          🌙 מעקב שינה
        </h2>
        <p className="text-gray-500 mb-6">עקוב אחר זמני השינה של התינוק</p>

        {isActive && (
          <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-1">שינה פעילה כרגע</p>
            <p className="text-xl font-bold">החלה בשעה 22:15</p>
          </div>
        )}

        <Button
          onClick={handleToggle}
          className={`py-3 rounded-xl font-semibold text-white transition${
            isActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-primary hover:bg-secondary'
          }`}
        >
          {isActive ? '🛑 סיום שינה' : '▶️ התחלת שינה'}
        </Button>

        <p className="text-sm text-gray-500 mt-3">
          {isActive
            ? 'לחץ לסיום מעקב השינה הנוכחי'
            : 'לחץ כדי להתחיל מעקב שינה חדש'}
        </p>
      </div>

      {/* כרטיס תחתון */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">מעקבי שינה אחרונים</h3>

        {sessions.length > 0 ? (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {formatTime(session.startTime)} -{' '}
                    {formatTime(session.endTime)}
                  </p>
                  <p className="text-sm text-gray-500">
                    משך שינה: {formatDuration(session.duration)}
                  </p>
                  {session.notes && (
                    <p className="text-sm text-gray-400 mt-1">
                      {session.notes}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(session.id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            עדיין לא נרשמו מעקבי שינה
          </p>
        )}
      </div>
    </div>
  );
};
