'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { patientDetailsSchema, PatientDetailsFormData } from '../../lib/utils/validation';
import { cn } from '@/app/lib/utils';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import Textarea from '../ui/Textarea';

export default function Step5PatientDetails() {
  const { patientDetails, setPatientDetails, setStep } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PatientDetailsFormData>({
    resolver: zodResolver(patientDetailsSchema),
    defaultValues: patientDetails as PatientDetailsFormData,
  });

  const onSubmit = (data: PatientDetailsFormData) => {
    setPatientDetails(data);
    setStep(6);
  };

  const handleBack = () => {
    setStep(4);
  };

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-2 space-y-8">
      <header className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#010043] font-helonik tracking-tight">Patient Details</h2>
        <p className="text-gray-500 font-medium">Enter your information for the appointment.</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Input
              label="Full Name"
              {...register('name')}
              error={errors.name?.message}
              required
              className="h-12"
            />
          </div>

          <Input
            type="number"
            label="Age"
            {...register('age', { valueAsNumber: true })}
            error={errors.age?.message}
            required
            min={1}
            max={120}
            className="h-12"
          />

          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-800">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={cn("h-12 border-gray-200 bg-white", errors.gender && "border-red-500 ring-1 ring-red-500")}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="py-2.5">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.gender?.message && (
                  <p className="mt-1 text-sm text-red-600 font-medium">{errors.gender.message}</p>
                )}
              </div>
            )}
          />

          <Input
            type="tel"
            label="Phone Number"
            {...register('phone')}
            error={errors.phone?.message}
            required
            placeholder="+1234567890"
            className="h-12"
          />

          <Input
            type="email"
            label="Email"
            {...register('email')}
            error={errors.email?.message}
            required
            placeholder="patient@example.com"
            className="h-12"
          />

          <div className="md:col-span-2">
            <Textarea
              label="Reason for Visit"
              {...register('reason')}
              error={errors.reason?.message}
              required
              rows={3}
              placeholder="Please describe the reason for your visit..."
              className="resize-none"
            />
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleBack}
            className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-full h-12 px-6"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="min-w-[160px] h-12 text-base font-bold shadow-lg shadow-[#F05137]/20 rounded-full"
          >
            Review Details
          </Button>
        </div>
      </form>
    </div>
  );
}