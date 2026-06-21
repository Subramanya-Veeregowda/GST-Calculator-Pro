export const isValidGSTIN = (gstin) => {
  if (!gstin || gstin.trim() === '') return true; // Optional field
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/i;
  return regex.test(gstin.trim());
};

export const isValidBusinessName = (name) => !!name && name.trim().length >= 5;
export const isValidCustomerName = (name) => !!name && name.trim().length >= 5;
export const isValidCustomerAddress = (address) => !!address && address.trim().length >= 8;
export const isValidPhone = (phone) => !!phone && /^[0-9]{10}$/.test(phone.trim());
export const isValidItemDescription = (desc) => !!desc && desc.trim().length >= 5;
export const isValidAmount = (amount) => {
  if (!amount) return false;
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && /^\d*\.?\d*$/.test(amount.toString());
};
