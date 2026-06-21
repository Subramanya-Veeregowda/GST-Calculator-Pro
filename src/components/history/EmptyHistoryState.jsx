import React from 'react';
import { History, FileText } from 'lucide-react';

export const EmptyHistoryState = ({ type }) => {
  const isCalc = type === 'calculations';
  const Icon = isCalc ? History : FileText;
  const message = isCalc ? "No GST calculations yet" : "No invoices created yet";
  const subMessage = isCalc 
    ? "Calculations will automatically appear here once you perform them."
    : "Invoices will automatically appear here once generated.";

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-16 h-16 bg-bg-elevated rounded-full flex items-center justify-center mb-4 shadow-sm border border-border">
        <Icon size={32} className="text-primary opacity-80" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">{message}</h3>
      <p className="text-text-secondary text-sm max-w-[250px]">{subMessage}</p>
    </div>
  );
};
