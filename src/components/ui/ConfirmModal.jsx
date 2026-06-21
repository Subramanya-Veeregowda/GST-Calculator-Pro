import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel", 
  variant = "danger" 
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-text-secondary text-[15px] mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>{cancelText}</Button>
        <Button variant={variant} onClick={() => { onConfirm(); onClose(); }}>{confirmText}</Button>
      </div>
    </Modal>
  );
};
