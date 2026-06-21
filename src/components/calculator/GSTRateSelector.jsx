import React from 'react';
import { GST_RATES } from '../../core/constants/gst-rates';
import { cn } from '../../utils/cn';

export const GSTRateSelector = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[13px] font-medium text-text-muted">GST Rate</label>
      <div className="flex bg-bg-elevated border border-border p-1 rounded-[10px] overflow-x-auto hide-scrollbar">
        {GST_RATES.map((rate) => {
          const isActive = value === rate;
          return (
            <button
              key={rate}
              type="button"
              onClick={() => onChange(rate)}
              className={cn(
                "flex-1 min-w-[60px] text-[13px] font-semibold py-2 px-3 rounded-lg transition-all duration-200 ease-smooth whitespace-nowrap",
                isActive 
                  ? "bg-primary text-text-inverse shadow-[0_2px_8px_rgba(0,212,170,0.3)]" 
                  : "text-text-muted hover:text-text-primary hover:bg-white/5"
              )}
            >
              {rate}%
            </button>
          );
        })}
      </div>
    </div>
  );
};
