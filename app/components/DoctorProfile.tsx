'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DoctorProfile() {
    return (
        <motion.div
            className="bg-white shadow-sm relative overflow-hidden flex flex-row flex-shrink-0 box-border"
            style={{
                width: 698,
                height: 355.52,
                opacity: 1,
                borderRadius: 23.7012,
                border: '2.37012px solid rgba(240, 81, 55, 0.22)',
            }}
            whileHover={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
            transition={{ duration: 0.2 }}
        >
            {/* Watermark - behind photo area (left) */}
            <div
                className="absolute inset-0 pointer-events-none z-0 flex items-center justify-start pl-8"
            >
                <div
                    className="relative z-0"
                    style={{ width: 298.32, height: 311.67, opacity: 0.1 }}
                >
                    <Image
                        src="/watermark.png"
                        alt=""
                        fill
                        className="object-contain"
                        aria-hidden
                        sizes="298px"
                    />
                </div>
            </div>

            {/* Share icon - top right */}
            <motion.div
                className="absolute top-6 right-6 z-20 text-[#F05137] cursor-pointer"
                aria-hidden
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 16.08c-.7 0-1.37.27-1.89.77l-7.07-4.42c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.07-4.42c.52.5 1.19.77 1.89.77 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.22-.08.45-.08.68 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92 0-1.61-1.31-2.92-2.92-2.92z" />
                </svg>
            </motion.div>

            {/* Left: doctor image - Rectangle 66 dimensions */}
            <div className="relative flex-shrink-0 z-10 flex items-center justify-center" style={{ width: 298.32, height: 311.67 }}>
                <div className="relative w-full h-full">
                    <Image
                        src="/doctors/dr-raghul.png"
                        alt="Dr. Raghul"
                        fill
                        className="object-contain object-center"
                        priority
                    />
                </div>
            </div>

            {/* Right section: text content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center pl-10 pr-4 py-8 min-w-0">
                <h1
                    className="text-black mb-1"
                    style={{
                        fontFamily: "'Helonik', sans-serif",
                        fontWeight: 500,
                        fontSize: 28.7028,
                        lineHeight: '37px',
                    }}
                >
                    Dr. Raghull
                </h1>
                <p
                    className="text-black mb-3"
                    style={{
                        fontFamily: "'Helonik', sans-serif",
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: '23px',
                    }}
                >
                    Senior Consultant – Obstetrics & Gynaecology
                </p>

                {/* Line 13 - separator */}
                <div
                    className="flex-shrink-0 mb-4"
                    style={{
                        width: '100%',
                        maxWidth: 359.07,
                        borderTop: '1.18506px solid #E2E2E2',
                    }}
                />

                <p
                    className="text-black mb-2"
                    style={{
                        fontFamily: "'Helonik', sans-serif",
                        fontWeight: 500,
                        fontSize: 18.961,
                        lineHeight: '15px',
                    }}
                >
                    5+ Years experience
                </p>
                <p
                    className="text-black text-sm leading-relaxed mb-5"
                    style={{
                        fontFamily: "'Helonik', sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: 1.4,
                    }}
                >
                    MBBS, MS (O&G), F.MAS, F.ART, Diploma in Advanced Laparoscopy (Kiel, Germany), Diploma in Cosmetic Gynaecology
                </p>

                {/* Frame 67 - Languages, gap 9.48px */}
                <div
                    className="flex flex-row items-center flex-shrink-0 mb-3"
                    style={{ gap: 9.48 }}
                >
                    <span className="text-[#F05137] flex-shrink-0" aria-hidden style={{ width: 23.7, height: 21.04 }}>
                        <svg width="24" height="21" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                        </svg>
                    </span>
                    <span
                        style={{
                            fontFamily: "'Helonik', sans-serif",
                            fontWeight: 400,
                            fontSize: 15.6475,
                            lineHeight: '23px',
                            color: '#000000',
                        }}
                    >
                        English • Hindi • Tam
                    </span>
                </div>

                {/* Frame 68 - Availability, gap 10.67px */}
                <div
                    className="flex flex-row items-center flex-shrink-0"
                    style={{ gap: 10.67 }}
                >
                    <span className="text-[#F05137] flex-shrink-0" aria-hidden style={{ width: 22.52, height: 20.64 }}>
                        <svg width="23" height="21" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                        </svg>
                    </span>
                    <span
                        style={{
                            fontFamily: "'Helonik', sans-serif",
                            fontWeight: 400,
                            fontSize: 15.6475,
                            lineHeight: '23px',
                            color: '#000000',
                        }}
                    >
                        16:00 -18:00 • Mon - Sat
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
