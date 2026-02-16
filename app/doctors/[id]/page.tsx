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
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                @media (min-width: 1024px) {
                    main .doctor-profile-page {
                        margin-left: -174px !important;
                        margin-right: -87px !important;
                        width: calc(100% + 261px) !important;
                        max-width: none !important;
                    }
                    main .doctor-profile-page .doctor-profile-block {
                        padding-left: 111px !important;
                    }
                }
            `}} />
            <div className="doctor-profile-page min-h-screen bg-gray-50 pb-20 pt-10">
                <section className="doctor-profile-block w-full">
                    <div className="w-full max-w-[1120px] flex flex-col items-start pt-6">
                    <Breadcrumbs doctorName={doctor.name} />

                    <div className="flex flex-col lg:flex-row items-stretch gap-8 w-full">
                        <div className="w-full lg:w-[698px] lg:min-w-[698px] lg:max-w-[698px] h-full">
                            <DoctorProfileHeader doctor={doctor} />
                        </div>
                        <div className="w-full lg:w-[390px] lg:min-w-[390px] lg:max-w-[390px] lg:shrink-0 h-full">
                            <BookingWidget doctor={doctor} onBookClick={handleBookClick} />
                        </div>
                    </div>
                </div>
                </section>

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
        </>
    );
}
