import { useState, useEffect, useCallback } from 'react';
import { InvoiceService } from '../core/services/invoice.service';
import { PDFService } from '../core/services/pdf.service';
import { HistoryService } from '../core/services/history.service';
import { ProfileService } from '../core/services/profile.service';
import { TAX_TYPES } from '../core/constants/tax-types';
import { isValidGSTIN, isValidBusinessName, isValidCustomerName, isValidCustomerAddress, isValidPhone, isValidItemDescription, isValidAmount } from '../utils/validation';

export const useInvoice = () => {
  const [details, setDetails] = useState({
    businessName: ProfileService.getProfile().businessName || '',
    businessPhone: ProfileService.getProfile().phone || '',
    businessAddress: ProfileService.getProfile().address || '',
    invoiceNumber: InvoiceService.generateInvoiceNumber(),
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    customerName: '',
    customerAddress: '',
    customerGSTIN: '',
    customerPhone: ''
  });

  const [lineItems, setLineItems] = useState([
    { id: crypto.randomUUID(), description: '', quantity: 1, rate: '', gstRate: 18 }
  ]);

  const [taxType, setTaxType] = useState(TAX_TYPES.INTRA_STATE);
  const [totals, setTotals] = useState({ subtotal: 0, totalGST: 0, grandTotal: 0, cgst: 0, sgst: 0, igst: 0, lineItems: [] });
  const [errors, setErrors] = useState({});
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false);

  const calculate = useCallback(() => {
    const newTotals = InvoiceService.calculateTotals(lineItems, taxType);
    setTotals(newTotals);
  }, [lineItems, taxType]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!isValidBusinessName(details.businessName)) {
      newErrors.businessName = "Min 5 characters.";
    }
    if (!isValidPhone(details.businessPhone)) {
      newErrors.businessPhone = "Exactly 10 digits required.";
    }
    if (!isValidCustomerAddress(details.businessAddress)) {
      newErrors.businessAddress = "Min 8 characters.";
    }
    if (!isValidCustomerName(details.customerName)) {
      newErrors.customerName = "Min 5 characters.";
    }
    if (!isValidCustomerAddress(details.customerAddress)) {
      newErrors.customerAddress = "Min 8 characters.";
    }
    if (!isValidPhone(details.customerPhone)) {
      newErrors.customerPhone = "Exactly 10 digits required.";
    }
    if (details.customerGSTIN && !isValidGSTIN(details.customerGSTIN)) {
      newErrors.customerGSTIN = "Invalid GSTIN format. Example: 29ABCDE1234F1Z5";
    }

    const itemErrors = {};
    let hasItemErrors = false;
    lineItems.forEach(item => {
      const iErrors = {};
      if (!isValidItemDescription(item.description)) {
        iErrors.description = "Min 5 characters.";
        hasItemErrors = true;
      }
      if (!isValidAmount(item.rate)) {
        iErrors.rate = "Invalid amount (> 0).";
        hasItemErrors = true;
      }
      if (Object.keys(iErrors).length > 0) {
        itemErrors[item.id] = iErrors;
      }
    });

    if (hasItemErrors) {
      newErrors.items = itemErrors;
    }
    
    if (lineItems.length === 0 || !lineItems.some(i => isValidItemDescription(i.description) && isValidAmount(i.rate))) {
      newErrors.general = "Please add at least one valid line item.";
    }

    const hasErrors = Object.keys(newErrors).length > 0 || hasItemErrors;
    if (hasErrors && !newErrors.general) {
      newErrors.general = "Please fix the validation errors in the form before downloading.";
    }

    setErrors(newErrors);
    if (!hasErrors) {
      console.log("[DEBUG] Validation passed");
    } else {
      console.log("[DEBUG] Validation failed:", newErrors);
    }
    return !hasErrors;
  }, [details, lineItems]);

  useEffect(() => {
    if (hasAttemptedSave) {
      validate();
    }
  }, [hasAttemptedSave, details, lineItems, validate]);

  const updateDetails = (field, value) => setDetails(prev => ({ ...prev, [field]: value }));

  const addLineItem = () => {
    setLineItems(prev => [
      ...prev,
      { id: crypto.randomUUID(), description: '', quantity: 1, rate: '', gstRate: 18 }
    ]);
  };

  const removeLineItem = (id) => {
    setLineItems(prev => prev.filter(item => item.id !== id));
  };

  const updateLineItem = (id, field, value) => {
    setLineItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };



  const saveAndDownload = () => {
    setHasAttemptedSave(true);
    if (!validate()) return false;

    const profile = ProfileService.getProfile();
    const invoiceData = {
      ...details,
      taxType,
      ...totals
    };

    // Save to history
    HistoryService.addInvoiceRecord(invoiceData);
    
    // Increment counter for next time
    InvoiceService.incrementCounter();

    // Generate PDF
    PDFService.generateInvoicePDF(invoiceData, profile);
    
    // Setup for next invoice
    setDetails(prev => ({
      ...prev,
      invoiceNumber: InvoiceService.generateInvoiceNumber()
    }));
    return true;
  };

  return {
    details, updateDetails,
    lineItems, addLineItem, removeLineItem, updateLineItem,
    taxType, setTaxType,
    totals,
    errors,
    saveAndDownload
  };
};
