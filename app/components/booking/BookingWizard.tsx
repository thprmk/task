'use client';

import { useBookingStore } from '../../lib/stores/bookingStore';
import Step1Department from './Step1Department';
import Step2Doctor from './Step2Doctor';
import Step3Date from './Step3Date';
import Step4TimeSlot from './Step4TimeSlot';
import Step5PatientDetails from './Step5PatientDetails';
import Step6Confirm from './Step6Confirm';
import Step7Success from './Step7Success';

export default function BookingWizard() {
  const { currentStep } = useBookingStore();

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
    <div className="w-full py-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* Step progress - solid bar and circles */}
        {currentStep < 7 && (
          <div className="mb-5 pb-4 border-b border-gray-200">
            <div className="flex items-start justify-between relative gap-1">
              <div className="absolute left-0 right-0 top-3.5 h-0.5 bg-gray-200 rounded-full -z-10" />
              <div
                className="absolute left-0 top-3.5 h-0.5 bg-[#F05137] rounded-full -z-10 transition-all duration-300 ease-out"
                style={{ width: `${((currentStep - 1) / (steps.length - 2)) * 100}%` }}
              />
              {steps.slice(0, 6).map((step) => (
                <div key={step.number} className="relative flex flex-col items-center flex-1 min-w-0">
                  <div
                    className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors duration-200
                      ${currentStep > step.number
                        ? 'bg-[#F05137] text-white'
                        : currentStep === step.number
                          ? 'bg-[#F05137] text-white ring-[3px] ring-[#F05137]/20'
                          : 'bg-gray-200 text-gray-500'
                      }
                    `}
                  >
                    {currentStep > step.number ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`
                      mt-1.5 text-[11px] font-medium whitespace-nowrap text-center transition-colors duration-200
                      ${currentStep === step.number ? 'text-gray-900' : 'text-gray-500'}
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
        <div className="mt-5">{renderStep()}</div>
      </div>
    </div>
  );
}






