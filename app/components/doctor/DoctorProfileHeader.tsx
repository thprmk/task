'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Doctor } from '../../../lib/types/doctor.types';
import { formatTimeSlot } from '../../lib/utils/dateUtils';

interface DoctorProfileHeaderProps {
  doctor: Doctor;
}

const BORDER_RADIUS = 23.7012;

const FLUID = {
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.4,
  stagger: 0.06,
} as const;

export default function DoctorProfileHeader({ doctor }: DoctorProfileHeaderProps) {
  return (
    <motion.div
      className="relative overflow-hidden box-border w-full max-w-[698px] rounded-2xl border-2 border-[#F05137]/20 bg-gradient-to-br from-white to-gray-50/50 shadow-sm"
      style={{ borderRadius: BORDER_RADIUS }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: FLUID.duration, ease: FLUID.ease }}
      whileHover={{
        boxShadow: '0 20px 50px rgba(0,0,0,0.08), 0 0 0 1px rgba(240, 81, 55, 0.08)',
        borderColor: 'rgba(240, 81, 55, 0.35)',
      }}
    >
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 z-0 rounded-l-[22px] bg-gradient-to-b from-[#F05137]/40 to-[#F05137]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: FLUID.duration * 0.5, duration: 0.3 }}
      />

      <motion.div
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer select-none text-[#F05137] hover:bg-[#F05137]/10"
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        aria-label="Share profile"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor" />
        </svg>
      </motion.div>

      <div className="flex flex-col lg:flex-row min-h-0">
        {/* Text content: first on mobile, left on desktop */}
        <motion.div
          className="flex-1 flex flex-col justify-center order-2 lg:order-1 px-4 sm:pl-5 sm:pr-4 py-5 sm:py-6 min-w-0"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: FLUID.stagger } },
            hidden: {},
          }}
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: FLUID.duration, ease: FLUID.ease }}
            className="text-black tracking-tight text-xl sm:text-2xl lg:text-[28.7px] leading-tight lg:leading-[37px]"
            style={{ fontFamily: "'Helonik', sans-serif", fontWeight: 600 }}
          >
            {doctor.name}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: FLUID.duration, ease: FLUID.ease }}
            className="mt-1 text-gray-700 text-sm sm:text-base"
            style={{ fontFamily: "'Helonik', sans-serif", fontWeight: 400 }}
          >
            {doctor.specialization}
          </motion.p>

          {/* Line 13 — 1.18506px solid #E2E2E2 */}
          <motion.div
            variants={{ hidden: { opacity: 0, scaleX: 0.97 }, visible: { opacity: 1, scaleX: 1 } }}
            transition={{ duration: FLUID.duration, ease: FLUID.ease }}
            className="w-full my-3"
            style={{
              transformOrigin: 'left',
              borderBottom: '1.18506px solid #E2E2E2',
              width: '100%',
              maxWidth: 359.07,
            }}
          />

          <motion.div
            variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: FLUID.duration, ease: FLUID.ease }}
            className="inline-flex items-center mt-2 px-2.5 py-1 rounded-md w-fit bg-[#F05137]/5 border border-[#F05137]/20"
          >
            <span className="text-black text-base sm:text-lg" style={{ fontFamily: "'Helonik', sans-serif", fontWeight: 600 }}>
              {doctor.experience}
            </span>
          </motion.div>

          {doctor.education && doctor.education.length > 0 && (
            <motion.p
              variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
              transition={{ duration: FLUID.duration, ease: FLUID.ease }}
              className="text-black mt-2 text-xs sm:text-sm"
              style={{ fontFamily: "'Helonik', sans-serif", fontWeight: 400 }}
            >
              {doctor.education.join(', ')}
            </motion.p>
          )}

          <motion.div
            className="flex flex-row items-center mt-4 sm:mt-5 gap-2 rounded-lg py-2 pr-3 -ml-1 w-fit"
            variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: FLUID.duration, ease: FLUID.ease }}
          >
            <div className="text-[#F05137] flex-shrink-0 w-5 h-5 sm:w-6 sm:h-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-90">
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM11.4 13H9.6L10.5 10.5H13.5L14.4 13H12.6L11.7 10.5H10.3L11.4 13ZM12 4.5C10.62 4.5 9.5 5.62 9.5 7C9.5 8.38 10.62 9.5 12 9.5C13.38 9.5 14.5 8.38 14.5 7C14.5 5.62 13.38 4.5 12 4.5Z" />
              </svg>
            </div>
            <span className="text-gray-800 text-xs sm:text-[15.6px]" style={{ fontFamily: "'Helonik', sans-serif", fontWeight: 400 }}>
              {doctor.languages?.join(' • ') ?? '—'}
            </span>
          </motion.div>

          <motion.div
            className="flex flex-row items-center mt-2 gap-2 rounded-lg py-2 pr-3 -ml-1 w-fit"
            variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: FLUID.duration, ease: FLUID.ease }}
          >
            <div className="text-[#F05137] flex-shrink-0 w-5 h-5 sm:w-6 sm:h-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-90">
                <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V9H19V19ZM12 11C10.34 11 9 12.34 9 14C9 15.66 10.34 17 12 17C13.66 17 15 15.66 15 14C15 12.34 13.66 11 12 11Z" />
              </svg>
            </div>
            <span className="text-gray-800 text-xs sm:text-[15.6px]" style={{ fontFamily: "'Helonik', sans-serif", fontWeight: 400 }}>
              {formatTimeSlot(`${doctor.workingHours?.start ?? '09:00'}-${doctor.workingHours?.end ?? '17:00'}`)} • Mon - Sat
            </span>
          </motion.div>
        </motion.div>

        {/* Image: on top on mobile (order-1), right on desktop */}
        <motion.div
          className="flex-shrink-0 order-1 lg:order-2 relative flex items-center justify-center overflow-hidden w-full lg:w-[298px] h-[200px] sm:h-[240px] lg:h-[312px] lg:min-h-[355px]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: FLUID.duration + 0.1, ease: FLUID.ease }}
        >
          {doctor.imageUrl ? (
            <motion.div
              className="relative w-full h-full lg:rounded-r-[20px] overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: FLUID.ease }}
            >
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 298px"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 to-transparent lg:rounded-r-[20px]" />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 lg:rounded-r-[20px]">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
