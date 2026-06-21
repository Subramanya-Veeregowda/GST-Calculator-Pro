import React, { useState, useEffect } from 'react';
import { Copy, Check, Calculator } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { numberToWords } from '../../utils/format';
import { TAX_TYPES } from '../../core/constants/tax-types';
import { AnimatedNumber } from '../shared/AnimatedNumber';

export const ResultCard = ({ result }) => {
  const [copied, setCopied] = useState(false);

  // We no longer need manual state for total since AnimatedNumber handles it
  
  if (!result) {
    return (
      <Card className="flex flex-col h-full min-h-[300px] items-center justify-center text-center p-8 bg-bg-elevated border border-border border-dashed transition-all duration-300 hover:shadow-lg hover:border-primary/30">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Calculator className="text-primary w-8 h-8 opacity-50" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Awaiting Input</h3>
        <p className="text-sm text-text-muted">Enter a valid amount to see GST calculation</p>
      </Card>
    );
  }

  const handleCopy = () => {
    const text = `
Amount Before GST: ${formatCurrency(result.baseAmount)}
GST Amount (${result.rate}%): ${formatCurrency(result.gstAmount)}
Total Amount: ${formatCurrency(result.totalAmount)}
    `.trim();
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isIntraState = result.taxType === TAX_TYPES.INTRA_STATE;

  return (
    <Card className="flex flex-col h-full animate-in fade-in duration-300 relative overflow-hidden bg-bg-elevated border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      {/* Decorative gradient blur */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Calculation Result</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCopy}
          aria-label="Copy result"
          className="bg-bg-elevated/50"
        >
          {copied ? <Check className="text-success" /> : <Copy />}
        </Button>
      </div>

      <div className="space-y-4 flex-1">
        {/* Base Amount */}
        <div className="flex justify-between items-center">
          <span className="text-[14px] text-text-secondary">Amount Before GST</span>
          <AnimatedNumber value={result.baseAmount} className="text-[15px] font-mono font-medium text-text-primary" />
        </div>

        {/* GST Amount */}
        <div className="flex justify-between items-center">
          <span className="text-[14px] text-text-secondary">GST Amount ({result.rate}%)</span>
          <span className="text-[15px] font-mono font-medium text-primary flex items-center gap-1">
            + <AnimatedNumber value={result.gstAmount} />
          </span>
        </div>

        {/* Breakdown for CGST/SGST/IGST */}
        <div className="pl-4 border-l-2 border-border space-y-2 mt-2 mb-4">
          {isIntraState ? (
            <>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-text-muted">CGST ({result.rate / 2}%)</span>
                <AnimatedNumber value={result.cgst} className="font-mono text-text-muted" />
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-text-muted">SGST ({result.rate / 2}%)</span>
                <AnimatedNumber value={result.sgst} className="font-mono text-text-muted" />
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-text-muted">IGST ({result.rate}%)</span>
              <AnimatedNumber value={result.igst} className="font-mono text-text-muted" />
            </div>
          )}
        </div>
      </div>

      {/* Grand Total */}
      <div className="mt-6 pt-6 border-t border-primary/20">
        <div className="bg-primary/10 border border-primary/30 rounded-[10px] p-4 flex flex-col gap-1 shadow-[0_0_24px_rgba(0,212,170,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
          <div className="flex justify-between items-center w-full relative z-10">
            <span className="text-base font-bold text-text-primary">Total Amount</span>
            <AnimatedNumber value={result.totalAmount} className="text-3xl md:text-4xl font-mono font-bold text-primary tracking-tight" />
          </div>
          <span className="text-[13px] text-text-secondary italic mt-2 animate-in fade-in fill-mode-both delay-200 relative z-10">
            {numberToWords(Math.round(result.totalAmount))}
          </span>
        </div>
      </div>
    </Card>
  );
};
