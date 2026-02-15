'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Doctor } from '../../lib/types/doctor.types';

export default function DoctorsListPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('/api/doctors');
            const data = await response.json();
            if (data.success) {
                setDoctors(data.data);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F05137]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Specialists</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doctor) => (
                        <Link
                            key={doctor._id}
                            href={`/doctors/${doctor._id}`}
                            className="group bg-white rounded-[30px] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100">
                                    <Image
                                        src={doctor.imageUrl || '/doctors/placeholder.jpg'}
                                        alt={doctor.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#F05137] transition-colors">
                                        {doctor.name}
                                    </h2>
                                    <p className="text-sm text-gray-500 font-medium">{doctor.specialization}</p>
                                </div>
                            </div>

                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-bold text-[#F05137]">{doctor.experience || 'Experienced'}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {doctor.languages?.map(lang => (
                                        <span key={lang} className="px-2 py-1 bg-gray-100 rounded-md text-[10px] uppercase font-bold text-gray-500">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-400">
                                    {doctor.workingHours.start} - {doctor.workingHours.end}
                                </span>
                                <span className="text-[#F05137] font-bold text-sm group-hover:translate-x-1 transition-transform">
                                    Book Profile →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
