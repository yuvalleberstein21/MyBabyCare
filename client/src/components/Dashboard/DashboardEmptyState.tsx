import { Baby, Plus } from 'lucide-react';
import Button from '../ui/Button';
import { Title } from '../ui/Title';
import { SubTitle } from '../ui/SubTitle';

interface DashboardEmptyStateProps {
  onAddClick: () => void;
}

export const DashboardEmptyState = ({
  onAddClick,
}: DashboardEmptyStateProps) => (
  <div className="text-center py-16 flex flex-col items-center justify-center">
    <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
      <Baby className="h-12 w-12 text-muted-foreground" />
    </div>
    <Title className="text-xl font-semibold mb-2">עדיין אין תינוקות</Title>
    <SubTitle className="text-muted-foreground mb-6">
      הוסף את התינוק הראשון שלך כדי להתחיל במעקב
    </SubTitle>
    <Button
      onClick={onAddClick}
      className="bg-gradient-primary hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
    >
      <Plus className="mr-2 h-4 w-4" />
      הוסף תינוק ראשון
    </Button>
  </div>
);
