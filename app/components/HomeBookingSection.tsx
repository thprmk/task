'use client';

import { useState } from 'react';
import DoctorProfile from './DoctorProfile';
import BookAppointmentCard from './BookAppointmentCard';
import BookingModal from './BookingModal';
import { useBookingStore } from '../lib/stores/bookingStore';

export default function HomeBookingSection() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const reset = useBookingStore((s) => s.reset);

  const openBookingModal = () => {
    reset();
    setBookingModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-stretch sm:items-start justify-start gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8 w-full min-w-0">
        <DoctorProfile />
        <div className="w-full min-w-0 flex justify-center lg:justify-start">
          <BookAppointmentCard onBookAppointmentClick={openBookingModal} />
        </div>
      </div>
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </>
  );
}
