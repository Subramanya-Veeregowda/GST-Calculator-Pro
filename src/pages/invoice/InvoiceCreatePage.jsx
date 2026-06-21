import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useInvoice } from '../../hooks/useInvoice';
import { InvoiceForm } from '../../components/invoice/InvoiceForm';
import { LineItemRow } from '../../components/invoice/LineItemRow';
import { InvoiceSummary } from '../../components/invoice/InvoiceSummary';
import { TaxTypeSelector } from '../../components/calculator/TaxTypeSelector';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function InvoiceCreatePage() {
  const navigate = useNavigate();
  const {
    details, updateDetails,
    lineItems, addLineItem, removeLineItem, updateLineItem,
    taxType, setTaxType,
    totals,
    errors,
    saveAndDownload
  } = useInvoice();

  const handleDownload = () => {
    console.log("[DEBUG] Download button clicked");
    const success = saveAndDownload();
    if (success) {
      navigate('/history');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-[1200px] mx-auto space-y-6 md:space-y-8"
    >
      {/* Page Header */}
      <div className="space-y-3 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <div className="inline-flex items-center justify-center bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-2">
            <span className="text-[11px] font-bold text-primary tracking-widest uppercase">Invoice Generator</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Create Invoice
          </h1>
        </div>
        <div className="text-text-muted font-mono bg-bg-elevated px-4 py-2 rounded-lg border border-border mt-4 md:mt-0">
          {details.invoiceNumber}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form & Items */}
        <div className="lg:col-span-8 space-y-6">
          <InvoiceForm details={details} updateDetails={updateDetails} errors={errors} />

          <Card className="space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Line Items</h2>
                <p className="text-[13px] text-text-muted">Add products or services.</p>
              </div>
              <Button variant="ghost" size="sm" onClick={addLineItem}>
                <Plus size={16} /> Add Row
              </Button>
            </div>

            <div className="space-y-3 pt-2">
              {lineItems.map((item, index) => (
                <LineItemRow
                  key={item.id}
                  index={index}
                  item={item}
                  onUpdate={(field, value) => updateLineItem(item.id, field, value)}
                  onRemove={() => removeLineItem(item.id)}
                  errors={errors.items?.[item.id]}
                />
              ))}
            </div>
            {lineItems.length === 0 && (
              <div className="text-center py-6 text-text-muted text-sm border border-dashed border-border rounded-lg">
                No items added. Click 'Add Row' to start.
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Summary & Actions */}
        <div className="lg:col-span-4 space-y-6 sticky top-6">
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">Tax Settings</h2>
            <TaxTypeSelector value={taxType} onChange={setTaxType} />
          </Card>

          <InvoiceSummary totals={totals} taxType={taxType} />

          <div className="pt-2">
            {errors.general && (
              <div className="text-error text-[13px] font-medium mb-3 text-center bg-error/10 py-2 rounded-lg">
                {errors.general}
              </div>
            )}
            <Button 
              variant="primary" 
              className="w-full flex items-center justify-center gap-2 py-3"
              onClick={handleDownload}
            >
              <Download size={18} className="mr-2" /> Download PDF
            </Button>
          </div>
          <p className="text-[11px] text-center text-text-muted mt-2">
            Invoice will be saved to your History automatically.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
