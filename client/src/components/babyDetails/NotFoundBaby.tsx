import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export default function NotFoundBaby() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">לא נמצא תינוק</h2>
        <Button onClick={() => navigate('/dashboard')}>חזרה ללוח הראשי</Button>
      </div>
    </div>
  );
}
