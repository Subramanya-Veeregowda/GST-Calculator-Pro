import React from 'react';
import { CALCULATION_MODES } from '../../core/constants/tax-types';
import { Toggle } from '../ui/Toggle';

export const CalculationTypeToggle = ({ value, onChange }) => {
  const options = [
    { label: 'Add GST (+)', value: CALCULATION_MODES.EXCLUSIVE },
    { label: 'Remove GST (-)', value: CALCULATION_MODES.INCLUSIVE }
  ];

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[13px] font-medium text-text-muted">Calculation Mode</label>
      <Toggle options={options} value={value} onChange={onChange} />
    </div>
  );
};
