import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Play } from 'lucide-react';
import { useSleeping } from '../../hooks/useSleeping';
import { Loader } from '../ui/Loader';

interface SleepTrackerProps {
  babyId: string;
  onClose: () => void;
}

export const SleepDialog: React.FC<SleepTrackerProps> = ({
  babyId,
  onClose,
}) => {
  const [isSleeping, setIsSleeping] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(0);

  const { startSleeping, endSleeping, loading, error, success } =
    useSleeping(babyId);

  // טיימר לריצה בזמן שינה
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSleeping && startTime) {
      interval = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime.getTime()) / 60000);
        setElapsedMinutes(diff);
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isSleeping, startTime]);

  // ▶ התחלת שינה
  const handleStart = async () => {
    const now = new Date();
    setStartTime(now);
    setIsSleeping(true);
    setElapsedMinutes(0);

    await startSleeping({
      startTime: now.toISOString(),
      notes: 'התחיל שינה',
    });
  };

  // ⏹ סיום שינה
  const handleStop = async () => {
    setIsSleeping(false);

    await endSleeping({
      endTime: new Date().toISOString(),
    });

    onClose(); // סגור את המודל אחרי סיום
  };
  return (
    <div className="p-4">
      {/* טעינה */}
      {loading && <Loader />}

      {/* שגיאה */}
      {error && <p className="text-center text-red-600 mb-3">{error}</p>}

      {/* כפתור התחל שינה */}
      {!isSleeping && elapsedMinutes === 0 && (
        <div className="flex justify-center">
          <Button
            className="bg-blue-600 text-white w-40 rounded-md flex justify-center items-center gap-2"
            onClick={handleStart}
            disabled={loading}
          >
            <Play className="w-6 h-6" />
            התחל שינה
          </Button>
        </div>
      )}

      {/* בזמן שינה */}
      {isSleeping && (
        <div className="bg-white rounded-xl shadow-lg p-4 text-center space-y-2">
          <p className="text-gray-700 font-medium">שינה בפעולה</p>
          <p className="text-2xl font-bold">{elapsedMinutes} דקות</p>

          <div className="flex justify-center items-center">
            <Button
              className="bg-red-600 hover:bg-red-500 text-white w-40 rounded-md flex justify-center items-center"
              onClick={handleStop}
              disabled={loading}
            >
              עצור שינה
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
