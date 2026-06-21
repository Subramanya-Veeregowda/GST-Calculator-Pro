import { StorageAdapter } from './storage.service';
import { TAX_TYPES } from '../constants/tax-types';

const INVOICE_COUNTER_KEY = 'gst_pro_invoice_counter';

export const InvoiceService = {
  generateInvoiceNumber: () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    
    let counter = StorageAdapter.get(INVOICE_COUNTER_KEY) || 0;
    counter += 1;
    
    // INV-YYYYMM-001 format
    const formattedCounter = String(counter).padStart(3, '0');
    return `INV-${year}${month}-${formattedCounter}`;
  },

  incrementCounter: () => {
    let counter = StorageAdapter.get(INVOICE_COUNTER_KEY) || 0;
    StorageAdapter.set(INVOICE_COUNTER_KEY, counter + 1);
  },

  calculateTotals: (lineItems, taxType) => {
    let subtotal = 0;
    let totalGST = 0;

    const processedItems = lineItems.map(item => {
      const qty = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      const gstRate = parseFloat(item.gstRate) || 0;

      const baseAmount = qty * rate;
      const gstAmount = baseAmount * (gstRate / 100);
      const totalAmount = baseAmount + gstAmount;

      subtotal += baseAmount;
      totalGST += gstAmount;

      return {
        ...item,
        baseAmount,
        gstAmount,
        totalAmount
      };
    });

    const grandTotal = subtotal + totalGST;

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (taxType === TAX_TYPES.INTRA_STATE) {
      cgst = totalGST / 2;
      sgst = totalGST / 2;
    } else {
      igst = totalGST;
    }

    return {
      lineItems: processedItems,
      subtotal,
      totalGST,
      grandTotal,
      cgst,
      sgst,
      igst
    };
  }
};
