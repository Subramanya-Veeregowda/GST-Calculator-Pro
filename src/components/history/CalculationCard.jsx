import React from 'react';
import { Card } from '../ui/Card';
import { formatCurrency, formatDate } from '../../utils/format';
import { Trash2 } from 'lucide-react';

export const CalculationCard = ({ calc, onDelete }) => {
  return (
    <Card className="p-4 flex flex-col hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-text-secondary">{formatDate(calc.timestamp)}</span>
          <span className="px-2 py-0.5 rounded-full bg-bg-elevated text-text-primary text-[11px] font-semibold border border-border">
            {calc.taxType === 'intra-state' ? 'CGST+SGST' : 'IGST'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
            {calc.rate}%
          </span>
        </div>
        <button
          onClick={() => onDelete(calc.id)}
          className="p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors shrink-0"
          title="Delete Calculation"
        >
          <Trash2 size={18} />
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
        <div className="text-lg font-bold text-text-primary">
          Total: {formatCurrency(calc.total)}
        </div>
        <div className="text-sm text-text-muted">
          Base: {formatCurrency(calc.amount)} • GST: {formatCurrency(calc.gst)}
        </div>
      </div>
    </Card>
  );
};
