'use client';

import { useState, useEffect } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import Step1Department from './Step1Department';
import Step2Doctor from './Step2Doctor';
import Step3Date from './Step3Date';
import Step4TimeSlot from './Step4TimeSlot';
import Step5PatientDetails from './Step5PatientDetails';
import Step6Confirm from './Step6Confirm';
import Step7Success from './Step7Success';

function useIsNarrow() {
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    setIsNarrow(mq.matches);
    const fn = () => setIsNarrow(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return isNarrow;
}

export default function BookingWizard() {
  const { currentStep } = useBookingStore();
  const isNarrow = useIsNarrow();
  const progress = currentStep < 7 ? (currentStep - 1) / (7 - 2) : 1;
  const progressWidth = isNarrow
    ? `calc(${progress * 100}% - ${progress * 16}px)`
    : `calc(${progress * 100}% - 2rem)`;

  const steps = [
    { number: 1, title: 'Department' },
    { number: 2, title: 'Doctor' },
    { number: 3, title: 'Date' },
    { number: 4, title: 'Time Slot' },
    { number: 5, title: 'Patient Details' },
    { number: 6, title: 'Confirm' },
    { number: 7, title: 'Success' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Department />;
      case 2:
        return <Step2Doctor />;
      case 3:
        return <Step3Date />;
      case 4:
        return <Step4TimeSlot />;
      case 5:
        return <Step5PatientDetails />;
      case 6:
        return <Step6Confirm />;
      case 7:
        return <Step7Success />;
      default:
        return <Step1Department />;
    }
  };

  return (
    <div className="w-full min-w-0 py-2 sm:py-4">
      <div className="max-w-2xl mx-auto w-full min-w-0 px-0 sm:px-0">
        {/* Step progress - solid bar and circles; compact on mobile */}
        {currentStep < 7 && (
          <div className="mb-4 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-100">
            <div className="flex items-start justify-between relative gap-0.5 sm:gap-1 px-2 sm:px-4">
              <div className="absolute left-2 right-2 sm:left-4 sm:right-4 top-2.5 sm:top-3.5 h-[2px] sm:h-[3px] bg-gray-100 rounded-full -z-10" />
              <div
                className="absolute left-2 sm:left-4 top-2.5 sm:top-3.5 h-[2px] sm:h-[3px] bg-[#F05137] rounded-full -z-10 transition-all duration-500 ease-out"
                style={{ width: progressWidth }}
              />
              {steps.slice(0, 6).map((step) => (
                <div key={step.number} className="relative flex flex-col items-center flex-1 min-w-0 group cursor-default">
                  <div
                    className={`
                      w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 transition-all duration-300 ring-2 sm:ring-4 ring-white
                      ${currentStep > step.number
                        ? 'bg-[#F05137] text-white scale-100'
                        : currentStep === step.number
                          ? 'bg-[#F05137] text-white shadow-lg shadow-[#F05137]/30 scale-110'
                          : 'bg-gray-100 text-gray-400'
                      }
                    `}
                  >
                    {currentStep > step.number ? (
                      <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`
                      mt-1.5 sm:mt-3 text-[9px] sm:text-[11px] uppercase tracking-wider font-bold whitespace-nowrap text-center transition-colors duration-300 font-helonik truncate max-w-full
                      ${currentStep === step.number ? 'text-[#010043]' : 'text-gray-400'}
                    `}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step content */}
        <div className="mt-3 sm:mt-5 min-w-0">{renderStep()}</div>
      </div>
    </div>
  );
}






