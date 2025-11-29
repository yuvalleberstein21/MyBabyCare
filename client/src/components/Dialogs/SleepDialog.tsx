import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Play, StopCircle } from 'lucide-react';
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
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const { getActiveSleeps, startSleeping, endSleeping, loading, error } =
    useSleeping(babyId);

  useEffect(() => {
    const loadActiveSleep = async () => {
      try {
        const activeSleep = await getActiveSleeps(babyId);
        if (activeSleep) {
          console.log(activeSleep);
          setIsSleeping(true);
          setStartTime(new Date(activeSleep.startTime));
          // חישוב הזמן שעבר
          const elapsed = Math.floor(
            (Date.now() - new Date(activeSleep.startTime).getTime()) / 60000
          );
          setElapsedMinutes(elapsed);
        }
      } catch (err) {
        console.error('שגיאה בטעינת שינה פעילה:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadActiveSleep();
  }, [babyId]);

  // טיימר
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSleeping && startTime) {
      interval = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime.getTime()) / 60000);
        setElapsedMinutes(diff);
      }, 10000); // עדכון כל 10 שניות
    }
    return () => clearInterval(interval);
  }, [isSleeping, startTime]);

  const handleStart = async () => {
    const now = new Date();
    setStartTime(now);
    setIsSleeping(true);
    setElapsedMinutes(0);
    setSuccessMsg(null);

    try {
      await startSleeping({
        startTime: now.toISOString(),
        notes: 'התחלת שינה',
      });
      setSuccessMsg('השינה החלה בהצלחה!');
    } catch {
      setIsSleeping(false);
      setStartTime(null);
    }
  };

  const handleStop = async () => {
    try {
      await endSleeping({
        endTime: new Date().toISOString(),
      });
      setSuccessMsg('השינה הסתיימה בהצלחה!');
      setIsSleeping(false);
      setStartTime(null);
      setElapsedMinutes(0);
      setTimeout(onClose, 1000);
    } catch (err) {
      // במקרה של שגיאה, נשאיר את המצב כמו שהוא
      console.error('שגיאה בעצירת שינה:', err);
    }
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {loading && <Loader />}

      {error && <p className="text-red-600 text-center">{error}</p>}
      {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

      {/* כפתור התחל שינה */}
      {!isSleeping && elapsedMinutes === 0 && (
        <Button
          className="bg-blue-600 hover:bg-blue-500 text-white w-48 rounded-md flex justify-center items-center gap-2"
          onClick={handleStart}
          disabled={loading}
        >
          <Play className="w-6 h-6" />
          התחל שינה
        </Button>
      )}

      {/* בזמן שינה */}
      {isSleeping && (
        <div className="bg-gray-50 rounded-xl shadow-lg p-6 text-center flex flex-col items-center gap-4 w-72">
          <p className="text-gray-700 font-semibold text-lg">שינה פעילה</p>
          <p className="text-3xl font-bold">{elapsedMinutes} דקות</p>

          <div className="flex justify-center gap-4">
            <Button
              className="bg-red-600 hover:bg-red-500 text-white w-40 rounded-md flex justify-center items-center gap-2"
              onClick={handleStop}
              disabled={loading}
            >
              <StopCircle className="w-5 h-5" />
              עצור שינה
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
