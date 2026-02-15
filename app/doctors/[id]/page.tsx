'use client';

import { useState, useEffect, use } from 'react';
import { useBookingStore } from '../../lib/stores/bookingStore';
import { Doctor } from '../../../lib/types/doctor.types';
import Breadcrumbs from '../../components/doctor/Breadcrumbs';
import DoctorProfileHeader from '../../components/doctor/DoctorProfileHeader';
import BookingWidget from '../../components/doctor/BookingWidget';
import Modal from '../../components/ui/Modal';
import Step5PatientDetails from '../../components/booking/Step5PatientDetails';
import Step6Confirm from '../../components/booking/Step6Confirm';
import Step7Success from '../../components/booking/Step7Success';

export default function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
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
        fetchDoctor();
    }, [id]);

    const fetchDoctor = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/doctors/${id}`);
            const data = await response.json();
            if (data.success) {
                setDoctor(data.data);
                // Sync with store for the wizard steps
                setStoreDoctor(data.data);
            }
        } catch (error) {
            console.error('Error fetching doctor:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = (date: Date, slot: string) => {
        setStoreDate(date);
        setStoreSlot(slot);
        setStep(5); // Start at patient details
        setIsModalOpen(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F05137]"></div>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-800">Doctor not found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs doctorName={doctor.name} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-8 h-full">
                        <DoctorProfileHeader doctor={doctor} />
                    </div>
                    <div className="lg:col-span-4 h-full">
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
        </div>
    );
}
