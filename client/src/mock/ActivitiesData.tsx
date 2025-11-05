import { Baby, Heart, Milk, Moon } from 'lucide-react';

export const activities = [
  {
    key: 'sleep',
    label: 'שינה',
    color: 'from-blue-400 to-blue-600',
    icon: <Moon className="w-10 h-10 text-white" />,
  },
  {
    key: 'feeding',
    label: 'האכלה',
    color: 'from-green-400 to-green-600',
    icon: <Milk className="w-10 h-10 text-white" />,
  },
  {
    key: 'diaper',
    label: 'חיתולים',
    color: 'from-yellow-400 to-yellow-600',
    icon: <Baby className="w-10 h-10 text-white" />,
  },
  {
    key: 'health',
    label: 'בריאות',
    color: 'from-pink-400 to-pink-600',
    icon: <Heart className="w-10 h-10 text-white" />,
  },
];
