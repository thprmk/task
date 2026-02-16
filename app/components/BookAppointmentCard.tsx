'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '../lib/stores/bookingStore';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const TIME_SLOTS = [
  '06:00 AM', '07:00 AM', '07:30 AM', '08:00 AM', '09:00 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
];

const DATES_TO_SHOW = 6;
const SLOTS_GRID_COLS = 4;
const SLOTS_GRID_ROWS = 2;
const SLOTS_VISIBLE = SLOTS_GRID_COLS * SLOTS_GRID_ROWS;
const DATE_CHIP_WIDTH = 51.4;
const DATE_GAP = 6;
const SLOT_WIDTH = 80.99;
const SLOT_GAP = 6;
const SLIDE_TRANSITION = { type: 'tween' as const, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const };
const HOVER_TRANSITION = { type: 'tween' as const, duration: 0.28, ease: [0.33, 1, 0.68, 1] as const };
const DATE_CHIP_HOVER = { type: 'tween' as const, duration: 0.36, ease: [0.22, 1, 0.36, 1] as const };
const TAP_TRANSITION = { type: 'tween' as const, duration: 0.12, ease: [0.4, 0, 0.2, 1] as const };

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
  const dates = getDates(30);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [dateScroll, setDateScroll] = useState(0);
  const [timeScroll, setTimeScroll] = useState(0);
  const setDate = useBookingStore((s) => s.setDate);
  const setSlot = useBookingStore((s) => s.setSlot);

  const maxDateScroll = Math.max(0, dates.length - DATES_TO_SHOW);
  const maxTimeScroll = Math.max(0, TIME_SLOTS.length - SLOTS_VISIBLE);

  const handleBookAppointments = () => {
    const dateStr = dates[selectedDate]?.value;
    const timeDisplay = TIME_SLOTS[selectedTime];
    if (dateStr) setDate(new Date(dateStr + 'T00:00:00'));
    if (timeDisplay) setSlot(toSlotRange(timeDisplay));
    onBookAppointmentClick?.();
  };

  return (
    <div
      className="flex-shrink-0 flex flex-col overflow-hidden book-appointment-card"
      style={{
        width: 390,
        height: 356,
        background: '#EDEDED',
        borderRadius: 24,
      }}
    >
      <div className="flex flex-col flex-1 min-h-0 px-4 pt-5 pb-4">
        {/* Title - Helonik 500 22px, line-height 37px, center, #000 */}
        <h2
          className="text-center text-black mb-4"
          style={{
            fontWeight: 500,
            fontSize: 22,
            lineHeight: '37px',
          }}
        >
          Book an appointment
        </h2>

        {/* Select Date label - General Sans 500 14px, line-height 29px, #000 */}
        <h3
          className="text-black mb-2"
          style={{
            fontFamily: 'General Sans, sans-serif',
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '29px',
          }}
        >
          Select Date
        </h3>

        {/* Date row: arrows + sliding date chips */}
        <div className="flex items-center gap-1.5 mb-5">
          <motion.button
            type="button"
            onClick={() => setDateScroll((s) => Math.max(0, s - 1))}
            className="p-1 text-black flex-shrink-0 touch-manipulation"
            aria-label="Previous dates"
            whileHover={{ scale: 1.08, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.96, transition: TAP_TRANSITION }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <div
            className="overflow-hidden flex-1 min-w-0"
            style={{ width: DATES_TO_SHOW * DATE_CHIP_WIDTH + (DATES_TO_SHOW - 1) * DATE_GAP }}
          >
            <motion.div
              className="flex gap-1.5"
              style={{ width: dates.length * DATE_CHIP_WIDTH + (dates.length - 1) * DATE_GAP }}
              animate={{ x: -dateScroll * (DATE_CHIP_WIDTH + DATE_GAP) }}
              transition={SLIDE_TRANSITION}
            >
              {dates.map((d, globalIdx) => {
                const isSelected = selectedDate === globalIdx;
                return (
                  <motion.button
                    key={d.value}
                    type="button"
                    onClick={() => setSelectedDate(globalIdx)}
                    className="flex flex-col items-center justify-center flex-shrink-0 box-border"
                    style={{
                      width: DATE_CHIP_WIDTH,
                      height: 55.48,
                      background: isSelected ? '#F05137' : '#FFFFFF',
                      border: '1.1517px solid #FFFFFF',
                      boxShadow: '0px 0px 1.81173px rgba(0, 0, 0, 0.16)',
                      borderRadius: 5.96988,
                    }}
                    whileHover={{ scale: 1.03, transition: DATE_CHIP_HOVER }}
                    whileTap={{ scale: 0.98, transition: TAP_TRANSITION }}
                  >
                    <span
                      style={{
                        fontFamily: 'General Sans, sans-serif',
                        fontWeight: 500,
                        fontSize: 8.8269,
                        lineHeight: '12px',
                        color: isSelected ? '#FFFFFF' : '#555555',
                      }}
                    >
                      {d.month}
                    </span>
                    <span
                      style={{
                        fontFamily: 'General Sans, sans-serif',
                        fontWeight: 600,
                        fontSize: 13.8708,
                        lineHeight: '19px',
                        color: isSelected ? '#FFFFFF' : '#555555',
                      }}
                    >
                      {d.day}
                    </span>
                    <span
                      style={{
                        fontFamily: 'General Sans, sans-serif',
                        fontWeight: 500,
                        fontSize: 8.19641,
                        lineHeight: '11px',
                        color: isSelected ? '#FFFFFF' : '#555555',
                      }}
                    >
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
            className="p-1 text-black flex-shrink-0 touch-manipulation"
            aria-label="Next dates"
            whileHover={{ scale: 1.08, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.96, transition: TAP_TRANSITION }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Separator - Line 15 */}
        <div
          className="flex-shrink-0 mb-3"
          style={{ height: 0, borderTop: '1px solid #E0E0E0', width: '100%' }}
        />

        {/* Available Slots label */}
        <h3
          className="text-black mb-2"
          style={{
            fontFamily: 'General Sans, sans-serif',
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '29px',
          }}
        >
          Available Slots
        </h3>

        {/* Time slots: arrows + sliding 4x2 grid */}
        <div className="flex items-center gap-1.5 mb-4">
          <motion.button
            type="button"
            onClick={() => setTimeScroll((s) => Math.max(0, s - 1))}
            className="p-1 text-black flex-shrink-0 touch-manipulation"
            aria-label="Previous slots"
            whileHover={{ scale: 1.08, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.96, transition: TAP_TRANSITION }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <div
            className="flex-1 min-w-0 overflow-hidden"
            style={{
              width: SLOTS_GRID_COLS * SLOT_WIDTH + (SLOTS_GRID_COLS - 1) * SLOT_GAP,
              height: SLOTS_GRID_ROWS * 24.3 + (SLOTS_GRID_ROWS - 1) * SLOT_GAP,
            }}
          >
            <motion.div
              className="flex"
              style={{
                width: Math.ceil(TIME_SLOTS.length / SLOTS_VISIBLE) * (SLOTS_GRID_COLS * SLOT_WIDTH + (SLOTS_GRID_COLS - 1) * SLOT_GAP),
                height: '100%',
              }}
              animate={{
                x: -timeScroll * (SLOTS_GRID_COLS * SLOT_WIDTH + (SLOTS_GRID_COLS - 1) * SLOT_GAP),
              }}
              transition={SLIDE_TRANSITION}
            >
              {Array.from({ length: Math.ceil(TIME_SLOTS.length / SLOTS_VISIBLE) }).map((_, page) => (
                <div
                  key={page}
                  className="grid flex-shrink-0 gap-1.5"
                  style={{
                    gridTemplateColumns: `repeat(${SLOTS_GRID_COLS}, ${SLOT_WIDTH}px)`,
                    width: SLOTS_GRID_COLS * SLOT_WIDTH + (SLOTS_GRID_COLS - 1) * SLOT_GAP,
                  }}
                >
                  {TIME_SLOTS.slice(page * SLOTS_VISIBLE, page * SLOTS_VISIBLE + SLOTS_VISIBLE).map((time, idx) => {
                    const globalIdx = page * SLOTS_VISIBLE + idx;
                    const isSelected = selectedTime === globalIdx;
                    return (
                      <motion.button
                        key={`${time}-${globalIdx}`}
                        type="button"
                        onClick={() => setSelectedTime(globalIdx)}
                        className="flex items-center justify-center box-border"
                        style={{
                          width: SLOT_WIDTH,
                          height: 24.3,
                          background: isSelected ? '#F05137' : '#FFFFFF',
                          border: isSelected ? 'none' : '0.674956px solid #BCBABA',
                          borderRadius: 3.37478,
                          fontFamily: 'General Sans, sans-serif',
                          fontWeight: 500,
                          fontSize: 8.77443,
                          lineHeight: '12px',
                          color: isSelected ? '#FFFFFF' : '#000000',
                        }}
                        whileHover={{ scale: 1.03, transition: HOVER_TRANSITION }}
                        whileTap={{ scale: 0.98, transition: TAP_TRANSITION }}
                      >
                        {time}
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
            className="p-1 text-black flex-shrink-0 touch-manipulation"
            aria-label="Next slots"
            whileHover={{ scale: 1.08, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.96, transition: TAP_TRANSITION }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Buttons row - gap 9px, Call + Book Appointments */}
        <div className="flex gap-[9px] mt-auto items-center justify-center">
          <motion.button
            type="button"
            className="font-helonik flex items-center justify-center box-border"
            style={{
              width: 153.62,
              height: 38.4,
              padding: 11.1621,
              background: '#FFFFFF',
              border: '1.7486px solid #F05137',
              boxShadow: '0px 0px 2.45131px rgba(0, 0, 0, 0.22)',
              borderRadius: 83.7161,
              fontWeight: 500,
              fontSize: 12.6178,
              lineHeight: '49px',
              color: '#000000',
            }}
            whileHover={{ scale: 1.02, transition: HOVER_TRANSITION }}
            whileTap={{ scale: 0.99, transition: TAP_TRANSITION }}
          >
            Call
          </motion.button>
          <motion.button
            type="button"
            onClick={handleBookAppointments}
            className="font-helonik flex items-center justify-center box-border"
            style={{
              width: 178.13,
              height: 38.4,
              padding: 11.1621,
              background: '#F05137',
              border: '1.7486px solid #FFFFFF',
              boxShadow: '0px 0px 2.45131px rgba(0, 0, 0, 0.22), inset 0px 0px 14.7078px #F05137',
              borderRadius: 83.7161,
              fontWeight: 500,
              fontSize: 12.6178,
              lineHeight: '49px',
              color: '#FFFFFF',
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
