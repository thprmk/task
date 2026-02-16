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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Minimal progress: compact stepper */}
        {currentStep < 7 && (
          <div className="mb-6">
            <div className="flex items-center gap-1">
              {steps.slice(0, 6).map((step, index) => (
                <div key={step.number} className="flex items-center flex-1 min-w-0">
                  <div
                    className={`
                      flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                      ${currentStep > step.number ? 'bg-[#F05137] text-white' : ''}
                      ${currentStep === step.number ? 'bg-[#F05137] text-white ring-2 ring-[#F05137]/30' : ''}
                      ${currentStep < step.number ? 'bg-gray-200 text-gray-500' : ''}
                    `}
                  >
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  {index < 5 && (
                    <div
                      className={`
                        flex-1 h-0.5 mx-0.5 rounded
                        ${currentStep > step.number ? 'bg-[#F05137]' : 'bg-gray-200'}
                      `}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500 text-center">
              {steps[currentStep - 1]?.title}
            </p>
          </div>
        )}

        {/* Step Content */}
        <div className="mt-6">{renderStep()}</div>
      </div>
    </div>
  );
}






