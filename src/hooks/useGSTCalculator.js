import { useState, useEffect, useCallback, useRef } from 'react';
import { GSTService } from '../core/services/gst.service';
import { HistoryService } from '../core/services/history.service';
import { CALCULATION_MODES, TAX_TYPES } from '../core/constants/tax-types';

export const useGSTCalculator = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState(CALCULATION_MODES.EXCLUSIVE);
  const [taxType, setTaxType] = useState(TAX_TYPES.INTRA_STATE);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const saveTimeoutRef = useRef(null);

  const calculate = useCallback(() => {
    if (amount !== '') {
      if (!/^\d*\.?\d*$/.test(amount) || isNaN(parseFloat(amount))) {
        setError('Please enter a valid amount');
        setResult(null);
        return;
      }
    }
    setError(null);
    
    const calcResult = GSTService.calculate(amount || '0', rate, mode, taxType);
    setResult(calcResult);
    
    // Auto-save history after 1.5 seconds of no typing, if amount > 0
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    if (calcResult.originalAmount > 0) {
      saveTimeoutRef.current = setTimeout(() => {
        HistoryService.addCalcRecord({
          amount: calcResult.originalAmount,
          rate: calcResult.rate,
          mode: calcResult.mode,
          taxType: calcResult.taxType,
          total: calcResult.totalAmount,
          gst: calcResult.gstAmount
        });
      }, 1500);
    }
  }, [amount, rate, mode, taxType]);

  useEffect(() => {
    calculate();
    
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [calculate]);

  const reset = () => {
    setAmount('');
    setRate(18);
    setMode(CALCULATION_MODES.EXCLUSIVE);
    setTaxType(TAX_TYPES.INTRA_STATE);
  };

  return {
    amount, setAmount,
    rate, setRate,
    mode, setMode,
    taxType, setTaxType,
    result,
    error,
    reset
  };
};
