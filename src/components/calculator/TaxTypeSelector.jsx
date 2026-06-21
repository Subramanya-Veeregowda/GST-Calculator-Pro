import React from 'react';
import { TAX_TYPES } from '../../core/constants/tax-types';
import { Toggle } from '../ui/Toggle';

export const TaxTypeSelector = ({ value, onChange }) => {
  const options = [
    { label: 'CGST + SGST', value: TAX_TYPES.INTRA_STATE },
    { label: 'IGST', value: TAX_TYPES.INTER_STATE }
  ];

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[13px] font-medium text-text-muted">Tax Type</label>
      <Toggle options={options} value={value} onChange={onChange} />
    </div>
  );
};
