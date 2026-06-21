import React from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

export const InvoiceForm = ({ details, updateDetails, errors = {} }) => {
  return (
    <Card className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-semibold text-text-primary">Bill To</h2>
        <p className="text-[13px] text-text-muted">Customer details and invoice meta.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Input
            label="Your Business Name"
            value={details.businessName}
            onChange={(e) => updateDetails('businessName', e.target.value)}
            placeholder="Your Company Name"
            error={errors.businessName}
            required
          />
        </div>
        
        <div className="md:col-span-2 pb-2">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Business Details</h3>
        </div>

        <Input
          label="Business Name *"
          value={details.businessName}
          onChange={(e) => updateDetails('businessName', e.target.value)}
          placeholder="Your Business Name"
          error={errors.businessName}
        />
        <Input
          label="Business Phone Number *"
          value={details.businessPhone}
          onChange={(e) => updateDetails('businessPhone', e.target.value)}
          placeholder="9876543210"
          error={errors.businessPhone}
        />
        <div className="md:col-span-2 pb-4 border-b border-border">
          <Input
            label="Business Address *"
            value={details.businessAddress}
            onChange={(e) => updateDetails('businessAddress', e.target.value)}
            placeholder="Your Complete Business Address"
            error={errors.businessAddress}
          />
        </div>

        <div className="md:col-span-2 pt-2">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Customer Details</h3>
        </div>

        <Input
          label="Customer Name *"
          value={details.customerName}
          onChange={(e) => updateDetails('customerName', e.target.value)}
          placeholder="Client / Company Name"
          error={errors.customerName}
          required
        />
        <Input
          label="Customer Name *"
          value={details.customerName}
          onChange={(e) => updateDetails('customerName', e.target.value)}
          placeholder="Client / Company Name"
          error={errors.customerName}
        />
        <Input
          label="Customer Phone *"
          value={details.customerPhone}
          onChange={(e) => updateDetails('customerPhone', e.target.value)}
          placeholder="9876543210"
          error={errors.customerPhone}
        />
        <Input
          label="Customer GSTIN (Optional)"
          value={details.customerGSTIN}
          onChange={(e) => updateDetails('customerGSTIN', e.target.value.toUpperCase())}
          placeholder="29ABCDE1234F1Z5"
          error={errors.customerGSTIN}
        />
        <div className="md:col-span-2">
          <Input
            label="Customer Address *"
            value={details.customerAddress}
            onChange={(e) => updateDetails('customerAddress', e.target.value)}
            placeholder="123 Street Name, City, State"
            error={errors.customerAddress}
          />
        </div>
        
        <Input
          type="date"
          label="Invoice Date"
          value={details.invoiceDate}
          onChange={(e) => updateDetails('invoiceDate', e.target.value)}
        />
        <Input
          type="date"
          label="Due Date (Optional)"
          value={details.dueDate}
          onChange={(e) => updateDetails('dueDate', e.target.value)}
        />
      </div>
    </Card>
  );
};
