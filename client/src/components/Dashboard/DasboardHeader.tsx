import { Plus } from 'lucide-react';
import { Title } from '../ui/Title';
import { SubTitle } from '../ui/SubTitle';
import Button from '../ui/Button';

interface DashboardHeaderProps {
  onAddClick: () => void;
}

export const DashboardHeader = ({ onAddClick }: DashboardHeaderProps) => (
  <div
    className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 gap-4 text-right"
    dir="rtl"
  >
    <div>
      <Title className="text-3xl font-bold mb-2">התינוקות שלך</Title>
      <SubTitle className="text-muted-foreground">
        נהל ועקוב אחר הגדילה וההתפתחות של הקטנטנים שלך
      </SubTitle>
    </div>
    <Button
      onClick={onAddClick}
      className="bg-gradient-primary hover:opacity-90 transition-opacity flex items-center gap-1"
    >
      הוסף תינוק
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);
