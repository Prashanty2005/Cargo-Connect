
import { CheckCircle2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

type PaymentMethodProps = {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  advantages: string[];
  onSelect?: (id: string) => void;
  isSelected?: boolean;
};

export const PaymentMethodCard = ({ 
  id, 
  title, 
  icon: Icon, 
  description, 
  advantages,
  onSelect,
  isSelected = false
}: PaymentMethodProps) => {
  return (
    <div 
      className={`border rounded-lg p-5 transition-all cursor-pointer ${
        isSelected 
        ? 'border-primary shadow-md bg-primary/5' 
        : 'hover:shadow-sm border-border'
      }`}
      onClick={() => onSelect?.(id)}
    >
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-full ${isSelected ? 'bg-primary/20' : 'bg-primary/10'} flex items-center justify-center mr-3`}>
          <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-primary/80'}`} />
        </div>
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {advantages.map((advantage, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
            <span>{advantage}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
