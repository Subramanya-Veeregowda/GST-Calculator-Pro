import React from 'react';
import { IndianRupee } from 'lucide-react';
import { cn } from '../../utils/cn';

export const AmountInput = ({ value, onChange, label = "Amount", error }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[13px] font-medium text-text-muted">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
          <IndianRupee className="h-5 w-5" />
        </div>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className={cn(
            "w-full bg-bg-elevated border border-border text-text-primary text-xl font-mono font-medium rounded-[10px]",
            "pl-12 pr-4 py-3.5 placeholder:text-text-muted transition-all duration-150 ease-out",
            "focus:border-primary focus:ring-3 focus:ring-primary/12 focus:outline-none"
          )}
        />
      </div>
      {error && <span className="text-red-500 text-[12px] font-medium mt-1">{error}</span>}
    </div>
  );
};
