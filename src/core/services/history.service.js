import { StorageAdapter } from './storage.service';

const CALC_HISTORY_KEY = 'gst_pro_calc_history';
const INVOICE_HISTORY_KEY = 'gst_pro_invoice_history';
const MAX_CALC_RECORDS = 500;
const MAX_INVOICE_RECORDS = 200;

export const HistoryService = {
  getCalcHistory: () => {
    return StorageAdapter.get(CALC_HISTORY_KEY) || [];
  },

  addCalcRecord: (record) => {
    const history = HistoryService.getCalcHistory();
    const newRecord = {
      ...record,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };
    
    const newHistory = [newRecord, ...history].slice(0, MAX_CALC_RECORDS);
    StorageAdapter.set(CALC_HISTORY_KEY, newHistory);
    return newRecord;
  },

  deleteCalcRecord: (id) => {
    const history = HistoryService.getCalcHistory();
    const newHistory = history.filter(r => r.id !== id);
    StorageAdapter.set(CALC_HISTORY_KEY, newHistory);
  },

  clearCalcHistory: () => {
    StorageAdapter.remove(CALC_HISTORY_KEY);
  },

  // --- Invoices ---
  getInvoiceHistory: () => {
    return StorageAdapter.get(INVOICE_HISTORY_KEY) || [];
  },

  addInvoiceRecord: (record) => {
    const history = HistoryService.getInvoiceHistory();
    const newRecord = {
      ...record,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };
    
    const newHistory = [newRecord, ...history].slice(0, MAX_INVOICE_RECORDS);
    StorageAdapter.set(INVOICE_HISTORY_KEY, newHistory);
    return newRecord;
  },

  deleteInvoiceRecord: (id) => {
    const history = HistoryService.getInvoiceHistory();
    const newHistory = history.filter(r => r.id !== id);
    StorageAdapter.set(INVOICE_HISTORY_KEY, newHistory);
  },

  clearInvoiceHistory: () => {
    StorageAdapter.remove(INVOICE_HISTORY_KEY);
  }
};
