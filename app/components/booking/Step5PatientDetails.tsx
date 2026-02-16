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
    <div className="max-w-2xl mx-auto px-1">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Patient Details</h2>
        <p className="text-sm text-gray-500 mt-0.5">Enter your information for the appointment</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          label="Full Name"
          {...register('name')}
          error={errors.name?.message}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            type="number"
            label="Age"
            {...register('age', { valueAsNumber: true })}
            error={errors.age?.message}
            required
            min={1}
            max={120}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className={cn(errors.gender && "border-red-500")}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.gender?.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <Input
          type="tel"
          label="Phone Number"
          {...register('phone')}
          error={errors.phone?.message}
          required
          placeholder="+1234567890"
        />

        <Input
          type="email"
          label="Email"
          {...register('email')}
          error={errors.email?.message}
          required
          placeholder="patient@example.com"
        />

        <Textarea
          label="Reason for Visit"
          {...register('reason')}
          error={errors.reason?.message}
          required
          rows={3}
          placeholder="Please describe the reason for your visit..."
        />

        <div className="flex justify-between gap-3 mt-4">
          <Button type="button" variant="outline" size="lg" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}






