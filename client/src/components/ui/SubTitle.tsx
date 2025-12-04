import React from 'react';

interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SubTitle: React.FC<SubTitleProps> = ({ children, className }) => {
  return (
    <p dir="rtl" className={`font-sans ${className}`}>
      {children}
    </p>
  );
};
