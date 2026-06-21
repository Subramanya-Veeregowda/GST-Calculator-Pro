import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calculator, Trash2 } from 'lucide-react';
import { HistoryService } from '../../core/services/history.service';
import { PDFService } from '../../core/services/pdf.service';
import { ProfileService } from '../../core/services/profile.service';
import { InvoiceCard } from '../../components/invoice/InvoiceCard';
import { CalculationCard } from '../../components/history/CalculationCard';
import { EmptyHistoryState } from '../../components/history/EmptyHistoryState';
import { HistoryFilters } from '../../components/history/HistoryFilters';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Button } from '../../components/ui/Button';

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('calculations');
  const [calcHistory, setCalcHistory] = useState([]);
  const [invoiceHistory, setInvoiceHistory] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [deleteId, setDeleteId] = useState(null);
  const [clearConfirm, setClearConfirm] = useState(false);

  const loadHistory = () => {
    setCalcHistory(HistoryService.getCalcHistory());
    setInvoiceHistory(HistoryService.getInvoiceHistory());
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDownloadPDF = (invoice) => {
    const profile = ProfileService.getProfile();
    PDFService.generateInvoicePDF(invoice, profile);
  };

  const confirmDelete = () => {
    if (activeTab === 'calculations') {
      HistoryService.deleteCalcRecord(deleteId);
    } else {
      HistoryService.deleteInvoiceRecord(deleteId);
    }
    setDeleteId(null);
    loadHistory();
  };

  const confirmClear = () => {
    if (activeTab === 'calculations') {
      HistoryService.clearCalcHistory();
    } else {
      HistoryService.clearInvoiceHistory();
    }
    setClearConfirm(false);
    loadHistory();
  };

  const filterByDate = (dateString, filter) => {
    if (filter === 'all' || filter === 'highest' || filter === 'lowest') return true;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (filter === 'today') return diffDays <= 1;
    if (filter === '7days') return diffDays <= 7;
    if (filter === '30days') return diffDays <= 30;
    return true;
  };

  const filteredCalculations = useMemo(() => {
    return calcHistory
      .filter(calc => {
        const matchesSearch = calc.amount?.toString().includes(searchQuery) || calc.rate?.toString().includes(searchQuery);
        const matchesFilter = filterByDate(calc.timestamp, filterType);
        return matchesSearch && matchesFilter;
      });
  }, [calcHistory, searchQuery, filterType]);

  const filteredInvoices = useMemo(() => {
    let result = invoiceHistory
      .filter(inv => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          inv.invoiceNumber?.toLowerCase().includes(query) || 
          inv.customerName?.toLowerCase().includes(query) || 
          inv.customerPhone?.includes(query);
        const matchesFilter = filterByDate(inv.timestamp, filterType);
        return matchesSearch && matchesFilter;
      });

    if (filterType === 'highest') {
      result = [...result].sort((a, b) => b.grandTotal - a.grandTotal);
    } else if (filterType === 'lowest') {
      result = [...result].sort((a, b) => a.grandTotal - b.grandTotal);
    }
    return result;
  }, [invoiceHistory, searchQuery, filterType]);

  const currentData = activeTab === 'calculations' ? filteredCalculations : filteredInvoices;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto pb-20"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="ml-8">
          <h1 className="text-2xl font-bold text-text-primary ">History</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your past calculations and invoices.</p>
        </div>
        {currentData.length > 0 && (
          <Button variant="danger" onClick={() => setClearConfirm(true)} className="w-full sm:w-auto text-sm">
            <Trash2 size={16} className="mr-2" />
            Clear {activeTab === 'calculations' ? 'Calculations' : 'Invoices'}
          </Button>
        )}
      </div>

      <div className="flex p-1 bg-bg-elevated border border-border rounded-xl mb-6">
        <button
          onClick={() => { setActiveTab('calculations'); setSearchQuery(''); setFilterType('all'); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'calculations' ? 'bg-bg-base text-primary shadow-sm border border-border/50' : 'text-text-muted hover:text-text-primary'}`}
        >
          <Calculator size={16} /> GST Calculations
        </button>
        <button
          onClick={() => { setActiveTab('invoices'); setSearchQuery(''); setFilterType('all'); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'invoices' ? 'bg-bg-base text-primary shadow-sm border border-border/50' : 'text-text-muted hover:text-text-primary'}`}
        >
          <FileText size={16} /> Invoices
        </button>
      </div>

      <HistoryFilters 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterType={filterType}
        onFilterChange={setFilterType}
        activeTab={activeTab}
      />

      <div className="space-y-4">
        {currentData.length === 0 ? (
          <EmptyHistoryState type={activeTab} />
        ) : (
          activeTab === 'calculations' ? (
            currentData.map((calc, index) => (
              <motion.div
                key={calc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              >
                <CalculationCard calc={calc} onDelete={setDeleteId} />
              </motion.div>
            ))
          ) : (
            currentData.map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              >
                <InvoiceCard invoice={invoice} onDelete={setDeleteId} onDownload={handleDownloadPDF} />
              </motion.div>
            ))
          )
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title={`Delete ${activeTab === 'calculations' ? 'Calculation' : 'Invoice'}`}
        message="Are you sure you want to delete this record? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />

      <ConfirmModal
        isOpen={clearConfirm}
        onClose={() => setClearConfirm(false)}
        onConfirm={confirmClear}
        title={`Clear ${activeTab === 'calculations' ? 'Calculations' : 'Invoices'}`}
        message={`Are you sure you want to clear all ${activeTab === 'calculations' ? 'GST calculations' : 'invoices'}? This action is permanent and cannot be undone.`}
        confirmText="Clear All"
        cancelText="Cancel"
        variant="danger"
      />
    </motion.div>
  );
}
