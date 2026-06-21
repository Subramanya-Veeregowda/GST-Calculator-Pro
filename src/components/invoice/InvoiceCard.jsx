import React from 'react';
import { Download, Trash2, FileText } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatCurrency, formatDate } from '../../utils/format';

export const InvoiceCard = ({ invoice, onDownload, onDelete }) => {
  return (
    <Card className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <FileText size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[15px] font-semibold text-text-primary">{invoice.invoiceNumber}</h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-bg-base border border-border text-text-muted">
              {formatDate(invoice.invoiceDate)}
            </span>
          </div>
          <p className="text-[13px] text-text-secondary mb-2">{invoice.customerName || 'No Customer Name'}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[12px] text-text-muted">Grand Total:</span>
            <span className="text-[15px] font-mono font-bold text-text-primary">
              {formatCurrency(invoice.grandTotal)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end w-full sm:w-auto gap-2 mt-2 sm:mt-0">
        <Button variant="ghost" size="icon" onClick={() => onDownload(invoice)} aria-label="Download PDF" className="hover:bg-primary/10">
          <Download size={18} className="text-primary" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(invoice.id)} aria-label="Delete Invoice" className="hover:bg-error/10">
          <Trash2 size={18} className="text-error opacity-70 hover:opacity-100" />
        </Button>
      </div>
    </Card>
  );
};
