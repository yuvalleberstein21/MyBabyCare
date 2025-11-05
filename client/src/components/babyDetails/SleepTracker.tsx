import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Play } from 'lucide-react';

interface SleepTrackerProps {
  onClose?: () => void;
}

export const SleepTracker: React.FC<SleepTrackerProps> = ({ onClose }) => {
  const [isSleeping, setIsSleeping] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(0);

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

  const handleStart = () => {
    setStartTime(new Date());
    setIsSleeping(true);
    setElapsedMinutes(0);
  };

  const handleStop = () => {
    setIsSleeping(false);
  };

  return (
    <div className="p-4">
      {/* כפתור התחל שינה */}
      {!isSleeping && elapsedMinutes === 0 && (
        <div className="flex justify-center">
          <Button
            className="bg-blue-600 text-white w-40 rounded-md flex justify-center items-center gap-2"
            onClick={handleStart}
          >
            <Play className="w-6 h-6" />
            התחל שינה
          </Button>
        </div>
      )}

      {isSleeping && (
        <div className="bg-white rounded-xl shadow-lg p-4 text-center space-y-2">
          <p className="text-gray-700 font-medium">שינה בפעולה</p>
          <p className="text-2xl font-bold">{elapsedMinutes} דקות</p>
          <div className="flex justify-center items-center">
            <Button
              className="bg-red-600 hover:bg-red-500 text-white w-40 rounded-md flex justify-center items-center"
              onClick={handleStop}
            >
              עצור שינה
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
