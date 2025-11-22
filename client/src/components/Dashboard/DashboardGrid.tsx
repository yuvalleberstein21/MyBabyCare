import type { Baby } from '../../types';
import BabyCard from './BabyCard';

interface DashboardGridProps {
  babies: Baby[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: any) => void;
}

export const DashboardGrid = ({
  babies,
  onDelete,
  onUpdate,
}: DashboardGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {babies.map((baby) => (
      <BabyCard
        key={baby._id}
        baby={baby}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    ))}
  </div>
);
