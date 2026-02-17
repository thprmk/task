'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DoctorProfile() {
  return (
    <motion.div
      className="w-full max-w-[698px] min-w-0 min-h-0 bg-white shadow-sm relative overflow-hidden flex flex-col lg:flex-row flex-shrink-0 box-border"
      style={{
        borderRadius: '23.7012px',
        border: '2.37012px solid rgba(240, 81, 55, 0.22)',
        minHeight: '355.52px',
      }}
      whileHover={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Share icon - top right */}
      <motion.div
        className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center text-[#F05137] cursor-pointer rounded-full hover:bg-[#F05137]/10"
        aria-label="Share profile"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        <svg width="20" height="20" className="lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 16.08c-.7 0-1.37.27-1.89.77l-7.07-4.42c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.07-4.42c.52.5 1.19.77 1.89.77 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.22-.08.45-.08.68 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92 0-1.61-1.31-2.92-2.92-2.92z" />
        </svg>
      </motion.div>

      {/* Doctor image: full-width block on mobile, fixed width on desktop */}
      <div 
        className="relative flex-shrink-0 z-10 w-full lg:w-[298.32px] h-[200px] sm:h-[240px] lg:h-[311.67px] self-start pt-0 pb-0 overflow-hidden" 
        style={{ 
          maxWidth: '298.32px', 
          maxHeight: '311.67px',
          boxSizing: 'border-box'
        }}
      >
        <div className="absolute inset-0 w-full h-full" style={{ maxWidth: '298.32px', maxHeight: '311.67px' }}>
          <Image
            src="/doctors/dr-raghul.png"
            alt="Dr. Raghul"
            fill
            className="object-contain object-top"
            priority
            sizes="(max-width: 1024px) 100vw, 298.32px"
            style={{ 
              objectPosition: 'center top',
              objectFit: 'contain',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      </div>

      {/* Text content - watermark behind this block (right side on desktop) */}
      <div className="relative flex-1 flex flex-col justify-center min-w-0 overflow-hidden">
        {/* Watermark - left side, behind Dr. Raghull / Senior Consultant text */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-start pl-4 opacity-10">
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 lg:w-56 lg:h-56">
            <Image
              src="/watermark.png"
              alt=""
              fill
              className="object-contain object-left"
              aria-hidden
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, 224px"
            />
          </div>
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:pl-4 lg:pr-4 py-5 sm:py-6 lg:py-8">
        <h1
          className="text-black mb-1 text-xl sm:text-2xl"
          style={{ 
            fontFamily: "'Helonik', sans-serif", 
            fontWeight: 500,
            fontSize: '28.7028px',
            lineHeight: '37px'
          }}
        >
          Dr. Raghull
        </h1>
        <p
          className="text-black mb-3 text-sm sm:text-base"
          style={{ 
            fontFamily: "'Helonik', sans-serif", 
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '23px'
          }}
        >
          Senior Consultant – Obstetrics & Gynaecology
        </p>

        <div 
          className="w-full max-w-[359.07px] my-3 lg:mb-4"
          style={{ borderTop: '1.18506px solid #E2E2E2' }}
        />

        <p
          className="text-black mb-2"
          style={{ 
            fontFamily: "'Helonik', sans-serif", 
            fontWeight: 500,
            fontSize: '18.961px',
            lineHeight: '15px'
          }}
        >
          5+ Years experience
        </p>
        <p
          className="text-black text-xs sm:text-sm leading-relaxed mb-4 lg:mb-5"
          style={{ fontFamily: "'Helonik', sans-serif", fontWeight: 400 }}
        >
          MBBS, MS (O&G), F.MAS, F.ART, Diploma in Advanced Laparoscopy (Kiel, Germany), Diploma in Cosmetic Gynaecology
        </p>

        <div className="flex flex-row items-center mb-2" style={{ gap: '9.48px' }}>
          <span className="text-[#F05137] flex-shrink-0 w-5 h-5 sm:w-6 sm:h-5" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </span>
          <span 
            className="text-black" 
            style={{ 
              fontFamily: "'Helonik', sans-serif", 
              fontWeight: 400,
              fontSize: '15.6475px',
              lineHeight: '23px'
            }}
          >
            English • Hindi • Tam
          </span>
        </div>

        <div className="flex flex-row items-center" style={{ gap: '10.67px' }}>
          <span className="text-[#F05137] flex-shrink-0 w-5 h-5 sm:w-6 sm:h-5" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
            </svg>
          </span>
          <span 
            className="text-black" 
            style={{ 
              fontFamily: "'Helonik', sans-serif", 
              fontWeight: 400,
              fontSize: '15.6475px',
              lineHeight: '23px'
            }}
          >
            16:00 - 18:00 • Mon - Sat
          </span>
        </div>
        </div>
      </div>
    </motion.div>
  );
}