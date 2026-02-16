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
      <div className="flex flex-col lg:flex-row items-start justify-start gap-8 lg:gap-12 mb-8 w-full">
        <DoctorProfile />
        <BookAppointmentCard onBookAppointmentClick={openBookingModal} />
      </div>
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </>
  );
}
