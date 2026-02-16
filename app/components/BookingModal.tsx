'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingWizard from './booking/BookingWizard';
import { useBookingStore } from '../lib/stores/bookingStore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayTransition = { type: 'tween' as const, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const };
const panelTransition = { type: 'tween' as const, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { currentStep, reset } = useBookingStore();

  const handleClose = () => {
    onClose();
    reset();
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
            onClick={handleClose}
            aria-hidden
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            aria-modal
            aria-labelledby="booking-modal-title"
            role="dialog"
          >
            <motion.div
              className="pointer-events-auto w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-gray-50 shadow-xl flex flex-col"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={panelTransition}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-end p-3 border-b border-gray-200 bg-white">
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div id="booking-modal-title" className="sr-only">
                Book appointment
              </div>
              <div className="overflow-y-auto flex-1 min-h-0">
                <BookingWizard />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
