"use client";

import { useState, useCallback } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Rocket } from "lucide-react";

interface ComingSoonOverlayProps {
  action: string;
  children: React.ReactNode;
}

export function ComingSoonOverlay({ action, children }: ComingSoonOverlayProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  }, []);

  return (
    <>
      <span onClick={handleClick} className="cursor-pointer inline-block">
        {children}
      </span>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="sm">
        <div className="text-center py-4">
          <div className="mx-auto w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mb-4">
            <Rocket className="h-8 w-8 text-accent-primary" />
          </div>
          <h3 className="text-xl font-bold text-fg-primary mb-2">Coming Soon</h3>
          <p className="text-fg-secondary mb-6">
            {action} will be available when SancCharity launches on BSC.
          </p>
          <Button onClick={() => setShowModal(false)} fullWidth>
            Got it
          </Button>
        </div>
      </Modal>
    </>
  );
}
