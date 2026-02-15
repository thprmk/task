'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { patientDetailsSchema, PatientDetailsFormData } from '../../lib/utils/validation';
import { Card } from '../ui';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';

export default function Step5PatientDetails() {
  const { patientDetails, setPatientDetails, setStep } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
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
    <Card title="Step 5: Patient Details" className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          {...register('name')}
          error={errors.name?.message}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Age"
            {...register('age', { valueAsNumber: true })}
            error={errors.age?.message}
            required
            min={1}
            max={120}
          />

          <Select
            label="Gender"
            options={genderOptions}
            {...register('gender')}
            error={errors.gender?.message}
            required
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
          rows={4}
          placeholder="Please describe the reason for your visit..."
        />

        <div className="flex justify-between gap-3 mt-6">
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Next
          </Button>
        </div>
      </form>
    </Card>
  );
}






