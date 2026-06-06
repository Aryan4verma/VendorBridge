"use client";

import { useState } from "react";

export function useConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  const confirm = () => {
    setIsOpen(true);
  };

  const onConfirm = () => {
    setIsOpen(false);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  return {
    confirm,
    isOpen,
    onConfirm,
    onCancel,
  };
}
