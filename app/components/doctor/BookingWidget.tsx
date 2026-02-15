'use client';

import { useState, useEffect, useRef } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { formatTimeSlot } from '../../lib/utils/dateUtils';
import { Doctor } from '../../../lib/types/doctor.types';
import Button from '../ui/Button';

interface BookingWidgetProps {
    doctor: Doctor;
    onBookClick: (date: Date, slot: string) => void;
}

export default function BookingWidget({ doctor, onBookClick }: BookingWidgetProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [slots, setSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Generate next 14 days
    const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

    useEffect(() => {
        fetchSlots(selectedDate);
    }, [selectedDate, doctor._id]);

    const fetchSlots = async (date: Date) => {
        if (!doctor._id) return;
        try {
            setLoading(true);
            const dateStr = date.toISOString().split('T')[0];
            const response = await fetch(`/api/slots?doctorId=${doctor._id}&date=${dateStr}`);
            const data = await response.json();
            if (data.success) {
                setSlots(data.data.slots);
            }
        } catch (error) {
            console.error('Error fetching slots:', error);
        } finally {
            setLoading(false);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-gray-100 rounded-[40px] p-6 sm:p-8 border border-gray-200 shadow-sm h-full flex flex-col">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Book an appointment</h2>

            {/* Date Selection */}
            <div className="mb-8 relative">
                <label className="block text-sm font-bold text-gray-900 mb-4 ml-1">Select Date</label>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-1 hover:bg-white rounded-full transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-3 overflow-x-auto no-scrollbar py-1 flex-1"
                    >
                        {dates.map((date) => {
                            const isSelected = isSameDay(date, selectedDate);
                            return (
                                <button
                                    key={date.toString()}
                                    onClick={() => setSelectedDate(date)}
                                    className={`
                    flex flex-col items-center justify-center min-w-[70px] h-[90px] rounded-xl border-2 transition-all flex-shrink-0
                    ${isSelected
                                            ? 'bg-[#F05137] border-[#F05137] text-white shadow-lg scale-105'
                                            : 'bg-white border-transparent text-gray-600 hover:border-gray-200'
                                        }
                  `}
                                >
                                    <span className="text-[10px] font-bold uppercase opacity-80">{format(date, 'MMM')}</span>
                                    <span className="text-xl font-black">{format(date, 'dd')}</span>
                                    <span className="text-[10px] font-bold uppercase opacity-80">{format(date, 'EEE')}</span>
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        className="p-1 hover:bg-white rounded-full transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="h-px bg-gray-200 w-full mb-8"></div>

            {/* Available Slots */}
            <div className="flex-1">
                <label className="block text-sm font-bold text-gray-900 mb-4 ml-1">Available Slots</label>

                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F05137]"></div>
                    </div>
                ) : slots.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
                        No slots available for this date
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {slots.map((slot) => {
                            const isSelected = selectedSlot === slot;
                            return (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`
                    py-3 px-2 rounded-lg text-[13px] font-bold transition-all border-2
                    ${isSelected
                                            ? 'bg-[#F05137] border-[#F05137] text-white shadow-md'
                                            : 'bg-white border-transparent text-gray-600 hover:border-gray-200'
                                        }
                  `}
                                >
                                    {formatTimeSlot(slot).split(' - ')[0]}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-8">
                <Button
                    variant="outline"
                    className="rounded-full py-4 text-gray-900 border-gray-300 hover:bg-white text-lg font-bold"
                >
                    Call
                </Button>
                <Button
                    variant="primary"
                    disabled={!selectedSlot}
                    onClick={() => selectedSlot && onBookClick(selectedDate, selectedSlot)}
                    className="rounded-full py-4 bg-[#F05137] hover:bg-[#D9442C] text-lg font-bold shadow-lg"
                >
                    Book Appointments
                </Button>
            </div>
        </div>
    );
}
