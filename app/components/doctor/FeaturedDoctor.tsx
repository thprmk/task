'use client';

import { useState, useEffect } from 'react';
import { Doctor } from '../../../lib/types/doctor.types';
import DoctorProfileHeader from './DoctorProfileHeader';
import BookingWidget from './BookingWidget';
import Modal from '../ui/Modal';
import Link from 'next/link';
import ButtonUI from '../ui/Button';
import Step5PatientDetails from '../booking/Step5PatientDetails';
import Step6Confirm from '../booking/Step6Confirm';
import Step7Success from '../booking/Step7Success';
import { useBookingStore } from '../../lib/stores/bookingStore';

export default function FeaturedDoctor() {
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        setDoctor: setStoreDoctor,
        setDate: setStoreDate,
        setSlot: setStoreSlot,
        currentStep,
        setStep
    } = useBookingStore();

    useEffect(() => {
        fetchFeaturedDoctor();
    }, []);

    const fetchFeaturedDoctor = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/doctors');
            const data = await response.json();
            if (data.success && data.data.length > 0) {
                // Find Dr. Raghul or any one doctor
                const raghul = data.data.find((d: Doctor) => d.name.includes('Raghul')) || data.data[0];
                setDoctor(raghul);
                setStoreDoctor(raghul);
            }
        } catch (error) {
            console.error('Error fetching featured doctor:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = (date: Date, slot: string) => {
        setStoreDate(date);
        setStoreSlot(slot);
        setStep(5);
        setIsModalOpen(true);
    };

    if (loading || !doctor) return null;

    return (
        <section id="featured-doctor" className="pt-[159px] pb-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:pl-[83px] sm:pr-6 lg:pl-[83px] lg:pr-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Profile Section */}
                    <div className="lg:col-span-8 flex justify-start">
                        <DoctorProfileHeader doctor={doctor} />
                    </div>

                    {/* Fixed Booking Section */}
                    <div className="lg:col-span-4 mt-4 lg:mt-0">
                        <BookingWidget doctor={doctor} onBookClick={handleBookClick} />
                    </div>
                </div>

            </div>

            {/* Booking Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentStep === 7 ? 'Success' : 'Complete Your Booking'}
                size="lg"
            >
                <div className="py-2">
                    {currentStep === 5 && <Step5PatientDetails />}
                    {currentStep === 6 && <Step6Confirm />}
                    {currentStep === 7 && <Step7Success />}
                </div>
            </Modal>
        </section>
    );
}
