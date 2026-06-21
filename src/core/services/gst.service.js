import { CALCULATION_MODES, TAX_TYPES } from '../constants/tax-types';

export const GSTService = {
  calculate: (amount, rate, mode, taxType) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount < 0) {
      return {
        originalAmount: 0,
        baseAmount: 0,
        gstAmount: 0,
        totalAmount: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        rate,
        mode,
        taxType
      };
    }

    let baseAmount = 0;
    let gstAmount = 0;
    let totalAmount = 0;

    if (mode === CALCULATION_MODES.EXCLUSIVE) {
      // Amount is Base Amount. Add GST.
      baseAmount = parsedAmount;
      gstAmount = (baseAmount * rate) / 100;
      totalAmount = baseAmount + gstAmount;
    } else {
      // Amount is Total Amount. Extract GST.
      totalAmount = parsedAmount;
      baseAmount = totalAmount / (1 + rate / 100);
      gstAmount = totalAmount - baseAmount;
    }

    // Tax Splits
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (taxType === TAX_TYPES.INTRA_STATE) {
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    } else {
      igst = gstAmount;
    }

    return {
      originalAmount: parsedAmount,
      baseAmount,
      gstAmount,
      totalAmount,
      cgst,
      sgst,
      igst,
      rate,
      mode,
      taxType
    };
  }
};
