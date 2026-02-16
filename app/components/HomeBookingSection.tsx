'use client';

import { useState } from 'react';
import DoctorProfile from './DoctorProfile';
import BookAppointmentCard from './BookAppointmentCard';
import BookingModal from './BookingModal';

export default function HomeBookingSection() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start justify-start gap-8 lg:gap-12 mb-8 w-full">
        <DoctorProfile />
        <BookAppointmentCard onBookAppointmentClick={() => setBookingModalOpen(true)} />
      </div>
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </>
  );
}
