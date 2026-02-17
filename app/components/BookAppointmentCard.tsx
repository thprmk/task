'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '../lib/stores/bookingStore';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const TIME_SLOTS = [
  '06:00 AM', '07:00 AM', '07:30 AM', '08:00 AM', '09:00 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
];

const SLIDE_TRANSITION = { type: 'tween' as const, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };
const HOVER_TRANSITION = { type: 'tween' as const, duration: 0.22, ease: [0.4, 0, 0.2, 1] as const };
const TAP_TRANSITION = { type: 'tween' as const, duration: 0.15, ease: [0.4, 0, 0.2, 1] as const };

function useResponsiveConfig() {
  const [width, setWidth] = useState(1024);
  useEffect(() => {
    setWidth(window.innerWidth);
    const w = () => setWidth(window.innerWidth);
    window.addEventListener('resize', w);
    return () => window.removeEventListener('resize', w);
  }, []);
  return useMemo(() => {
    const isNarrow = width < 640;
    const isMedium = width >= 640 && width < 1024;
    return {
      datesToShow: isNarrow ? 3 : isMedium ? 4 : 6,
      dateChipWidth: isNarrow ? 44 : isMedium ? 48 : 51.4,
      dateGap: 6,
      slotCols: isNarrow ? 2 : isMedium ? 3 : 4,
      slotRows: isNarrow ? 4 : 2,
      slotWidth: isNarrow ? 72 : isMedium ? 76 : 80.99,
      slotGap: 6,
      slotHeight: isNarrow ? 28 : 24.3,
    };
  }, [width]);
}

function getDates(count: number) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      month: MONTHS[d.getMonth()],
      day: String(d.getDate()).padStart(2, '0'),
      dayName: DAYS[d.getDay()],
      value: d.toISOString().slice(0, 10),
    });
  }
  return dates;
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

/** Convert display time "09:00 AM" to slot format "09:00-09:30" (30 min slots). */
function toSlotRange(displayTime: string): string {
  const match = displayTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return '09:00-09:30';
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (match[3].toUpperCase() === 'PM' && h !== 12) h += 12;
  if (match[3].toUpperCase() === 'AM' && h === 12) h = 0;
  const start = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  let endM = m + 30;
  let endH = h;
  if (endM >= 60) {
    endM -= 60;
    endH += 1;
  }
  const end = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  return `${start}-${end}`;
}

interface BookAppointmentCardProps {
  onBookAppointmentClick?: () => void;
}

export default function BookAppointmentCard({ onBookAppointmentClick }: BookAppointmentCardProps) {
  const config = useResponsiveConfig();
  const dates = getDates(30);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [dateScroll, setDateScroll] = useState(0);
  const [timeScroll, setTimeScroll] = useState(0);
  const setDate = useBookingStore((s) => s.setDate);
  const setSlot = useBookingStore((s) => s.setSlot);

  const slotsVisible = config.slotCols * config.slotRows;
  const maxDateScroll = Math.max(0, dates.length - config.datesToShow);
  const timePageCount = Math.ceil(TIME_SLOTS.length / slotsVisible);
  const maxTimeScroll = Math.max(0, timePageCount - 1);
  const slotPadCount = (slotsVisible - (TIME_SLOTS.length % slotsVisible)) % slotsVisible;
  const slotsForView = useMemo(
    () => (slotPadCount === 0 ? TIME_SLOTS : [...TIME_SLOTS, ...Array(slotPadCount).fill(null)]),
    [slotPadCount]
  );

  const dateViewportWidth = config.datesToShow * config.dateChipWidth + (config.datesToShow - 1) * config.dateGap;
  const dateStep = config.dateChipWidth + config.dateGap;
  const slotViewportWidth = config.slotCols * config.slotWidth + (config.slotCols - 1) * config.slotGap;
  const slotViewportHeight = config.slotRows * config.slotHeight + (config.slotRows - 1) * config.slotGap;
  const timeStep = slotViewportWidth;

  const handleBookAppointments = () => {
    const dateStr = dates[selectedDate]?.value;
    const timeDisplay = TIME_SLOTS[selectedTime];
    if (dateStr) setDate(new Date(dateStr + 'T00:00:00'));
    if (timeDisplay) setSlot(toSlotRange(timeDisplay));
    onBookAppointmentClick?.();
  };

  return (
    <div
      className="flex-shrink-0 flex flex-col overflow-hidden book-appointment-card w-full max-w-[390px] min-h-[320px] sm:w-[390px] sm:h-[356px] bg-[#EDEDED] rounded-[24px]"
    >
      <div className="flex flex-col flex-1 min-h-0 px-3 sm:px-4 pt-4 sm:pt-5 pb-3 sm:pb-4">
        <h2
          className="text-center text-black mb-3 sm:mb-4 text-lg sm:text-[22px] sm:leading-[37px] font-medium"
          style={{ fontFamily: "'Helonik', sans-serif", fontWeight: 500 }}
        >
          Book an appointment
        </h2>

        <h3 className="text-black mb-2 font-medium text-xs sm:text-sm leading-snug" style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 500, fontSize: 14, lineHeight: '29px' }}>
          Select Date
        </h3>

        <div className="flex items-center gap-1 sm:gap-1.5 mb-4 sm:mb-5">
          <motion.button
            type="button"
            onClick={() => setDateScroll((s) => Math.max(0, s - 1))}
            className="p-1.5 sm:p-1 text-black flex-shrink-0 touch-manipulation rounded"
            aria-label="Previous dates"
            whileHover={{ scale: 1.05, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.97, transition: TAP_TRANSITION }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <div className="overflow-hidden flex-1 min-w-0" style={{ width: dateViewportWidth }}>
            <motion.div
              className="flex gap-1.5"
              style={{ width: dates.length * config.dateChipWidth + (dates.length - 1) * config.dateGap }}
              animate={{ x: -dateScroll * dateStep }}
              transition={SLIDE_TRANSITION}
            >
              {dates.map((d, globalIdx) => {
                const isSelected = selectedDate === globalIdx;
                return (
                  <motion.button
                    key={d.value}
                    type="button"
                    onClick={() => setSelectedDate(globalIdx)}
                    className="flex flex-col items-center justify-center flex-shrink-0 box-border min-h-[50px] sm:min-h-[55px]"
                    style={{
                      width: config.dateChipWidth,
                      height: 55.48,
                      background: isSelected ? '#F05137' : '#FFFFFF',
                      fontFamily: "'General Sans', sans-serif",
                      border: '1.1517px solid #FFFFFF',
                      borderRadius: 5.96988,
                      boxShadow: '0px 0px 1.81173px rgba(0, 0, 0, 0.16)',
                    }}
                    whileHover={{ scale: 1.02, transition: HOVER_TRANSITION }}
                    whileTap={{ scale: 0.98, transition: TAP_TRANSITION }}
                  >
                    <span className={isSelected ? 'text-white' : 'text-[#555555]'} style={{ fontWeight: 500, fontSize: 8.8269, lineHeight: '12px' }}>
                      {d.month}
                    </span>
                    <span className={isSelected ? 'text-white' : 'text-[#555555]'} style={{ fontWeight: 600, fontSize: 13.8708, lineHeight: '19px' }}>
                      {d.day}
                    </span>
                    <span className={isSelected ? 'text-white' : 'text-[#555555]'} style={{ fontWeight: 500, fontSize: 8.19641, lineHeight: '11px' }}>
                      {d.dayName}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
          <motion.button
            type="button"
            onClick={() => setDateScroll((s) => Math.min(maxDateScroll, s + 1))}
            className="p-1.5 sm:p-1 text-black flex-shrink-0 touch-manipulation rounded"
            aria-label="Next dates"
            whileHover={{ scale: 1.05, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.97, transition: TAP_TRANSITION }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex-shrink-0 mb-3 border-t border-[#E0E0E0] w-full" />

        <h3 className="text-black mb-2 font-medium text-xs sm:text-sm leading-snug" style={{ fontFamily: "'General Sans', sans-serif", fontWeight: 500, fontSize: 14, lineHeight: '29px' }}>
          Available Slots
        </h3>

        <div className="flex items-center gap-1 sm:gap-1.5 mb-3 sm:mb-4">
          <motion.button
            type="button"
            onClick={() => setTimeScroll((s) => Math.max(0, s - 1))}
            className="p-1.5 sm:p-1 text-black flex-shrink-0 touch-manipulation rounded"
            aria-label="Previous slots"
            whileHover={{ scale: 1.05, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.97, transition: TAP_TRANSITION }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex-1 min-w-0 overflow-hidden" style={{ width: slotViewportWidth, height: slotViewportHeight }}>
            <motion.div
              className="flex h-full"
              style={{
                width: timePageCount * timeStep,
                height: '100%',
              }}
              animate={{ x: -timeScroll * timeStep }}
              transition={SLIDE_TRANSITION}
            >
              {Array.from({ length: timePageCount }).map((_, page) => (
                <div
                  key={page}
                  className="grid flex-shrink-0 gap-1.5 h-full"
                  style={{
                    gridTemplateColumns: `repeat(${config.slotCols}, ${config.slotWidth}px)`,
                    gridTemplateRows: `repeat(${config.slotRows}, ${config.slotHeight}px)`,
                    width: slotViewportWidth,
                  }}
                >
                  {slotsForView.slice(page * slotsVisible, page * slotsVisible + slotsVisible).map((time, idx) => {
                    const globalIdx = page * slotsVisible + idx;
                    const isPlaceholder = time === null;
                    const isSelected = !isPlaceholder && selectedTime === globalIdx;
                    return (
                      <motion.button
                        key={isPlaceholder ? `pad-${page}-${idx}` : `${time}-${globalIdx}`}
                        type="button"
                        disabled={isPlaceholder}
                        onClick={() => !isPlaceholder && setSelectedTime(globalIdx)}
                        className="flex items-center justify-center box-border text-[7px] sm:text-[8.77443px] leading-tight font-medium disabled:pointer-events-none"
                        style={{
                          width: config.slotWidth,
                          height: config.slotHeight,
                          background: isPlaceholder ? '#F5F5F5' : isSelected ? '#F05137' : '#FFFFFF',
                          border: isPlaceholder ? '0.674956px solid #E8E8E8' : isSelected ? 'none' : '0.674956px solid #BCBABA',
                          borderRadius: 3.37478,
                          fontFamily: "'General Sans', sans-serif",
                          color: isSelected ? '#FFFFFF' : '#000000',
                          boxShadow: 'none',
                        }}
                        whileHover={isPlaceholder ? undefined : { scale: 1.02, transition: HOVER_TRANSITION }}
                        whileTap={isPlaceholder ? undefined : { scale: 0.98, transition: TAP_TRANSITION }}
                      >
                        {isPlaceholder ? '\u2014' : time}
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </div>
          <motion.button
            type="button"
            onClick={() => setTimeScroll((s) => Math.min(maxTimeScroll, s + 1))}
            className="p-1.5 sm:p-1 text-black flex-shrink-0 touch-manipulation rounded"
            aria-label="Next slots"
            whileHover={{ scale: 1.05, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.97, transition: TAP_TRANSITION }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-[9px] mt-auto items-stretch sm:items-center justify-center">
          <motion.button
            type="button"
            className="flex items-center justify-center min-h-[38.4px] sm:min-h-[38px] sm:h-[38px] px-4 sm:px-2.5 py-2.5 sm:py-1.5 bg-white flex-1 sm:flex-none sm:w-[140px] font-medium text-xs sm:text-[11px] text-black text-center"
            style={{
              fontFamily: "'Helonik', sans-serif",
              fontWeight: 500,
              border: '1.7486px solid #F05137',
              borderRadius: 83.7161,
              boxShadow: '0px 0px 2.45131px rgba(0, 0, 0, 0.22)',
            }}
            whileHover={{ scale: 1.02, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.99, transition: TAP_TRANSITION }}
          >
            Call
          </motion.button>
          <motion.button
            type="button"
            onClick={handleBookAppointments}
            className="flex items-center justify-center min-h-[38.4px] sm:min-h-[38px] sm:h-[38px] px-4 sm:px-2.5 py-2.5 sm:py-1.5 bg-[#F05137] flex-1 sm:flex-none sm:w-[170px] font-medium text-xs sm:text-[11px] text-white text-center"
            style={{
              fontFamily: "'Helonik', sans-serif",
              fontWeight: 500,
              border: '1.7486px solid #FFFFFF',
              borderRadius: 83.7161,
              boxShadow: '0px 0px 2.45131px rgba(0, 0, 0, 0.22)',
            }}
            whileHover={{ scale: 1.02, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.99, transition: TAP_TRANSITION }}
          >
            Book Appointments
          </motion.button>
        </div>
      </div>
    </div>
  );
}