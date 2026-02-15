'use client';

import { Doctor } from '../../../lib/types/doctor.types';
import Image from 'next/image';
import { formatTimeSlot } from '../../lib/utils/dateUtils';

interface DoctorProfileHeaderProps {
    doctor: Doctor;
}

export default function DoctorProfileHeader({ doctor }: DoctorProfileHeaderProps) {
    return (
        <div className="bg-white rounded-[16px] px-2 py-4 sm:px-2 sm:py-4 border-2 border-orange-100/30 shadow-sm relative overflow-hidden w-full lg:w-[698px] h-auto lg:h-[355.5px] group mx-auto lg:mx-0">
            {/* Share Icon in Top Right */}
            <div className="absolute top-8 right-8 text-[#F05137] cursor-pointer hover:scale-110 transition-transform z-20">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor" />
                </svg>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start h-full relative z-10 px-4">
                {/* Profile Image with Exact Accents */}
                <div className="relative w-60 h-60 flex-shrink-0 flex items-center justify-center">
                    {/* Floating Orange Accents (Left/Right bars) */}
                    <div className="absolute left-0 top-[35%] w-4 h-36 bg-[#F05137] rounded-full -z-10" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 85%, 0 15%)' }}></div>
                    <div className="absolute right-0 top-[20%] w-5 h-32 bg-[#F05137] rounded-full -z-10" style={{ clipPath: 'polygon(100% 15%, 100% 85%, 0 100%, 0 0)' }}></div>

                    {/* Main Hexagon Image Container */}
                    <div className="w-[88%] h-[88%] relative bg-white p-[2px] shadow-sm" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                        <div className="w-full h-full relative overflow-hidden bg-gray-50" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                            <Image
                                src={doctor.imageUrl || '/doctors/placeholder.jpg'}
                                alt={doctor.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Doctor Info */}
                <div className="flex-1 space-y-2 pt-1">
                    <div className="space-y-0.5">
                        <h1 className="text-3xl sm:text-[38px] font-semibold text-black tracking-tight leading-tight">{doctor.name}</h1>
                        <p className="text-lg text-gray-800 leading-tight">{doctor.specialization}</p>
                    </div>

                    <div className="h-[1px] bg-gray-200/50 w-full mb-3"></div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">{doctor.experience}</h2>
                        <div className="max-w-xl">
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {doctor.education?.join(', ')}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        {/* Languages Row */}
                        <div className="flex items-center gap-3">
                            <div className="text-[#F05137]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM11.4 13H9.6L10.5 10.5H13.5L14.4 13H12.6L11.7 10.5H10.3L11.4 13ZM12 4.5C10.62 4.5 9.5 5.62 9.5 7C9.5 8.38 10.62 9.5 12 9.5C13.38 9.5 14.5 8.38 14.5 7C14.5 5.62 13.38 4.5 12 4.5Z" />
                                </svg>
                            </div>
                            <div className="flex items-center gap-3 text-base text-gray-800">
                                {doctor.languages?.map((lang, idx) => (
                                    <span key={lang}>
                                        {lang}{idx < (doctor.languages?.length || 0) - 1 ? '  •' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Hours Row */}
                        <div className="flex items-center gap-3">
                            <div className="text-[#F05137]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V9H19V19ZM12 11C10.34 11 9 12.34 9 14C9 15.66 10.34 17 12 17C13.66 17 15 15.66 15 14C15 12.34 13.66 11 12 11ZM12 16C10.9 16 10 15.1 10 14C10 12.9 10.9 12 12 12C13.1 12 14 12.9 14 14C14 15.1 13.1 16 12 16Z" />
                                </svg>
                            </div>
                            <div className="flex items-center gap-3 text-base text-gray-800">
                                <span>{formatTimeSlot(`${doctor.workingHours.start}-${doctor.workingHours.end}`)}</span>
                                <span className="text-gray-400 font-normal">  •</span>
                                <span>Mon - Sat</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
