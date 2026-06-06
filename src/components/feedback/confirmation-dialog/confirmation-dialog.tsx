"use client";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/feedback/modal/modal";
import { Button } from "@/components/primitives/button/button";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
}

export function ConfirmationDialog({ open, onClose, onConfirm, title, description, confirmLabel = "Confirm" }: ConfirmationDialogProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader onClose={onClose}>{title}</ModalHeader>
      <ModalBody><p>{description}</p></ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
      </ModalFooter>
    </Modal>
  );
}
