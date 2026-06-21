import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { GST_RATES } from '../../core/constants/gst-rates';
import { cn } from '../../utils/cn';

export const LineItemRow = ({ item, index, onUpdate, onRemove, errors = {} }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-bg-elevated p-3 rounded-xl border border-border group transition-colors hover:border-primary/30">
      
      {/* Description */}
      <div className="flex-1 w-full">
        <input
          type="text"
          value={item.description}
          onChange={(e) => onUpdate('description', e.target.value)}
          placeholder="Item Description"
          className={cn(
            "w-full bg-transparent text-[14px] focus:outline-none px-1",
            errors.description ? "text-error placeholder-error" : "text-text-primary placeholder:text-text-muted"
          )}
        />
        {errors.description && <p className="text-[11px] text-error mt-1 px-1">{errors.description}</p>}
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Quantity */}
        <div className="w-20">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onUpdate('quantity', e.target.value)}
            placeholder="Qty"
            className="w-full bg-bg-base border border-border rounded-lg text-[14px] text-center px-2 py-1.5 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Rate */}
        <div className="w-28 relative flex flex-col">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[14px] text-text-muted">₹</span>
            <input
              type="text"
              inputMode="decimal"
              value={item.rate}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || /^\d*\.?\d*$/.test(val)) onUpdate('rate', val);
              }}
              placeholder="0.00"
              className={cn(
                "w-full bg-bg-base border rounded-lg text-[14px] pl-6 pr-2 py-1.5 focus:outline-none",
                errors.rate ? "border-error text-error" : "border-border text-text-primary focus:border-primary"
              )}
            />
          </div>
          {errors.rate && <p className="text-[11px] text-error mt-1 absolute -bottom-5 left-0 w-full whitespace-nowrap">{errors.rate}</p>}
        </div>

        {/* GST Rate */}
        <div className="w-24">
          <select
            value={item.gstRate}
            onChange={(e) => onUpdate('gstRate', e.target.value)}
            className="w-full bg-bg-base border border-border rounded-lg text-[14px] px-2 py-1.5 focus:border-primary focus:outline-none appearance-none"
          >
            {GST_RATES.map(r => (
              <option key={r} value={r}>{r}% GST</option>
            ))}
          </select>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-error hover:bg-error/10 opacity-50 md:opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Remove item"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};
