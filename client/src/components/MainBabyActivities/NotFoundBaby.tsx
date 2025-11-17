import Button from '../ui/Button';

export default function NotFoundBaby() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">לא נמצא תינוק</h2>
        <Button onClick={() => window.location.reload()}>נסה שוב</Button>
      </div>
    </div>
  );
}
