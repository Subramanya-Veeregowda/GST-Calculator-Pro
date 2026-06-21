import React from 'react';
import { Card } from '../ui/Card';
import { formatCurrency, numberToWords } from '../../utils/format';
import { TAX_TYPES } from '../../core/constants/tax-types';

export const InvoiceSummary = ({ totals, taxType }) => {
  const isIntraState = taxType === TAX_TYPES.INTRA_STATE;

  return (
    <Card className="bg-bg-elevated border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[14px] text-text-secondary">Subtotal</span>
          <span className="text-[15px] font-mono font-medium text-text-primary">
            {formatCurrency(totals.subtotal)}
          </span>
        </div>

        <div className="pt-2 border-t border-border/50">
          {isIntraState ? (
            <>
              <div className="flex justify-between items-center text-[13px] py-1">
                <span className="text-text-muted">CGST</span>
                <span className="font-mono text-text-muted">{formatCurrency(totals.cgst)}</span>
              </div>
              <div className="flex justify-between items-center text-[13px] py-1">
                <span className="text-text-muted">SGST</span>
                <span className="font-mono text-text-muted">{formatCurrency(totals.sgst)}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center text-[13px] py-1">
              <span className="text-text-muted">IGST</span>
              <span className="font-mono text-text-muted">{formatCurrency(totals.igst)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-primary/20">
        <div className="bg-primary/10 border border-primary/20 rounded-[10px] p-4 flex flex-col gap-1">
          <div className="flex justify-between items-center w-full">
            <span className="text-base font-bold text-text-primary">Grand Total</span>
            <span className="text-2xl font-mono font-bold text-primary tracking-tight">
              {formatCurrency(totals.grandTotal)}
            </span>
          </div>
          <span className="text-[12px] text-text-secondary italic mt-1">
            {numberToWords(Math.round(totals.grandTotal))}
          </span>
        </div>
      </div>
    </Card>
  );
};
