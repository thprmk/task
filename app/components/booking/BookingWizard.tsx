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
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        {currentStep < 7 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.slice(0, 6).map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-semibold
                        ${
                          currentStep >= step.number
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }
                      `}
                    >
                      {step.number}
                    </div>
                    <span className="mt-2 text-xs text-gray-600 hidden sm:block">
                      {step.title}
                    </span>
                  </div>
                  {index < 5 && (
                    <div
                      className={`
                        h-1 flex-1 mx-2
                        ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'}
                      `}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="mt-8">{renderStep()}</div>
      </div>
    </div>
  );
}






