import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface CardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const StaticCard: React.FC<CardProps> = ({
  icon: Icon,
  title,
  description,
  className,
}) => {
  return (
    <div className={`p-6 rounded-2xl bg-card shadow-card ${className}`}>
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
