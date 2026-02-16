'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingWizard from './booking/BookingWizard';
import { useBookingStore } from '../lib/stores/bookingStore';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const fn = () => setIsMobile(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return isMobile;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayTransition = { type: 'tween' as const, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const };
const panelTransition = { type: 'tween' as const, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { currentStep, reset } = useBookingStore();
  const isMobile = useIsMobile();

  const handleClose = () => {
    onClose();
    reset();
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 touch-none overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
            onClick={handleClose}
            aria-hidden
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 pointer-events-none"
            aria-modal
            aria-labelledby="booking-modal-title"
            role="dialog"
          >
            {/* Desktop (sm+): centered dialog, 600px min height, 90vh max, rounded. Mobile: bottom sheet. */}
            <motion.div
              className="pointer-events-auto w-full max-w-4xl min-h-0 sm:min-h-[600px] max-h-[92dvh] sm:max-h-[90vh] overflow-hidden rounded-t-2xl sm:rounded-2xl border border-gray-100 bg-white shadow-2xl flex flex-col"
              initial={isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.98, y: 8 }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.98, y: 8 }}
              transition={panelTransition}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-end shrink-0 h-12 sm:h-14 px-3 sm:px-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm relative z-10">
                <button
                  type="button"
                  onClick={handleClose}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 -mr-1 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 touch-manipulation"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div id="booking-modal-title" className="sr-only">
                Book appointment
              </div>
              <div className="overflow-y-auto overflow-x-hidden flex-1 min-h-0 px-3 sm:px-6 pb-4 sm:pb-5 overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                <BookingWizard />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
