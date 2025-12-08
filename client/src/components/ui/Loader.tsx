export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">...טוען נתונים</p>
    </div>
  );
};
