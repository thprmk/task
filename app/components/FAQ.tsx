'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'How can I book an appointment?',
    answer: 'Yes, you can directly book an appointment with a specialist at Hospitals without needing a local referral. Our team will guide you to the right expert based on your condition.',
  },
  {
    id: 2,
    question: 'Can I seek an appointment with a specialist at Hospitals?',
    answer: 'Yes, you can book appointments with specialists directly through our online booking system. Simply select your department, choose a doctor, pick a date and time slot, and complete your booking.',
  },
  {
    id: 3,
    question: 'Does Hospitals offer second opinions or online consultations?',
    answer: 'Yes, we offer both second opinions and online consultations. You can schedule these through our booking system by selecting the appropriate consultation type.',
  },
  {
    id: 4,
    question: 'Will I be informed about the cost of treatment and duration of stay at e Hospitals?',
    answer: 'Yes, our team will provide you with detailed information about treatment costs and estimated duration of stay during your consultation. You can also contact our billing department for more details.',
  },
  {
    id: 5,
    question: 'What documents do I need to bring for my appointment?',
    answer: 'Please bring a valid ID, insurance card (if applicable), any previous medical records, and a list of current medications. This will help our doctors provide the best care.',
  },
  {
    id: 6,
    question: 'Can I cancel or reschedule my appointment?',
    answer: 'Yes, you can cancel or reschedule your appointment through our online system or by calling our appointment desk. We recommend doing so at least 24 hours in advance.',
  },
  {
    id: 7,
    question: 'What are the visiting hours at Hospitals?',
    answer: 'Our visiting hours are from 9:00 AM to 8:00 PM daily. However, visiting hours may vary for different departments. Please check with the specific department for their schedule.',
  },
  {
    id: 8,
    question: 'Does Hospitals accept insurance?',
    answer: 'Yes, we accept most major insurance plans. Please contact our billing department or check with your insurance provider to confirm coverage before your visit.',
  },
  {
    id: 9,
    question: 'How do I access my medical records?',
    answer: 'You can access your medical records through our patient portal or by requesting them from our medical records department. You may need to fill out a release form.',
  },
  {
    id: 10,
    question: 'What emergency services are available?',
    answer: 'We have a 24/7 emergency department that handles all types of medical emergencies. Our emergency team is always ready to provide immediate care.',
  },
  {
    id: 11,
    question: 'Can I get a prescription refill online?',
    answer: "Yes, you can request prescription refills through our patient portal or by contacting your doctor's office directly. Some prescriptions may require a follow-up appointment.",
  },
  {
    id: 12,
    question: 'What parking facilities are available?',
    answer: 'We have ample parking available on-site with both covered and open parking areas. Valet parking is also available for patients with mobility issues.',
  },
  {
    id: 13,
    question: 'Are there any special accommodations for disabled patients?',
    answer: 'Yes, our hospital is fully accessible with wheelchair ramps, elevators, and accessible restrooms. We also provide sign language interpreters and other accommodations upon request.',
  },
  {
    id: 14,
    question: 'What payment methods are accepted?',
    answer: 'We accept cash, credit cards, debit cards, and most insurance plans. Payment plans are also available for eligible patients. Contact our billing department for more information.',
  },
  {
    id: 15,
    question: 'Can family members accompany me during my appointment?',
    answer: 'Yes, family members are welcome to accompany you during your appointment. However, please check with the specific department as some areas may have visitor restrictions.',
  },
  {
    id: 16,
    question: 'How do I find a specific doctor or specialist?',
    answer: 'You can search for doctors by name, specialty, or department through our online directory. You can also call our appointment desk for assistance in finding the right specialist.',
  },
  {
    id: 17,
    question: 'What should I do if I need to contact my doctor after hours?',
    answer: 'For urgent matters after hours, please call our main number and you will be connected to the on-call physician. For emergencies, please visit our emergency department or call 911.',
  },
  {
    id: 18,
    question: 'Are telemedicine appointments available?',
    answer: 'Yes, we offer telemedicine appointments for many specialties. You can schedule a virtual consultation through our booking system by selecting the telemedicine option.',
  },
  {
    id: 19,
    question: "What is the hospital's policy on visitors?",
    answer: 'Visitors are welcome during visiting hours. We typically allow 2 visitors per patient at a time. Special arrangements can be made for extended family visits with prior approval.',
  },
  {
    id: 20,
    question: 'How can I provide feedback about my experience?',
    answer: 'We value your feedback! You can provide feedback through our patient satisfaction survey, online portal, or by contacting our patient relations department directly.',
  },
];

const CARD_RADIUS = 20;

function getItemsPerPage(width: number) {
  if (width < 640) return 4;
  if (width < 1024) return 4;
  return 4;
}

const PAGINATION_MOBILE_MAX = 5;

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setItemsPerPage(getItemsPerPage(w));
      setIsMobile(w < 640);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalPages = Math.ceil(faqData.length / itemsPerPage);

  const visiblePageNumbers = (() => {
    if (!isMobile || totalPages <= PAGINATION_MOBILE_MAX) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - PAGINATION_MOBILE_MAX + 1));
    const end = Math.min(totalPages, start + PAGINATION_MOBILE_MAX - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  })();

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaqItems = faqData.slice(startIndex, endIndex);

  return (
    <div className="bg-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6 flex justify-center">
      <div
        className="w-full max-w-[948px] mx-auto"
        style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
      >
        <h1
          className="text-black text-center mb-6 sm:mb-8 lg:mb-10 text-2xl sm:text-3xl lg:text-[40px] leading-tight lg:leading-[45px] font-medium"
          style={{ fontFamily: "'Helonik', sans-serif" }}
        >
          Frequently Asked Questions
        </h1>

        <div className="space-y-4 sm:space-y-6 lg:space-y-[28px] mb-8 sm:mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="space-y-4 sm:space-y-6 lg:space-y-[28px]"
            >
              {currentFaqItems.map((item, index) => {
                const isOpen = openItem === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: index * 0.03 }}
                    className="w-full"
                  >
                    <div
                      className={`w-full flex items-center justify-between gap-3 cursor-pointer px-4 py-4 sm:px-5 sm:py-0 lg:px-6 min-h-[60px] sm:min-h-[75px] bg-[#E6E6E6] ${isOpen ? 'rounded-t-xl sm:rounded-t-[20px] rounded-b-none' : 'rounded-xl sm:rounded-[20px]'}`}
                      onClick={() => toggleItem(item.id)}
                    >
                      <span
                        className="flex-1 min-w-0 pr-2 sm:pr-4 text-left text-sm sm:text-base lg:text-xl font-medium leading-snug lg:leading-[27px] text-black"
                        style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif', letterSpacing: '-0.02em' }}
                      >
                        {startIndex + index + 1}. {item.question}
                      </span>
                      <motion.div
                        className="flex-shrink-0 w-5 h-5 sm:w-[18px] sm:h-[35px] flex items-center justify-center"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <svg
                          className="w-4 h-4 sm:w-[18.27px] sm:h-[35.13px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ color: isOpen ? '#F05137' : '#191919' }}
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Answer: Rectangle 118 — bg #F9F9F9, radius 0 0 20px 20px */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-4 py-4 sm:px-5 sm:pt-4 sm:pb-5 lg:px-6 bg-[#F9F9F9] rounded-b-xl sm:rounded-b-[20px]"
                          >
                            <p
                              className="text-justify text-sm sm:text-base lg:text-[17px] leading-relaxed lg:leading-[35px] font-medium text-[#3E3E3E]"
                              style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif', letterSpacing: '-0.02em' }}
                            >
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-row items-center justify-center flex-wrap gap-2 sm:gap-[22px] min-h-[34px] py-2">
          {isMobile && totalPages > PAGINATION_MOBILE_MAX && (
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                setOpenItem(null);
              }}
              disabled={currentPage === 1}
              className="rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-medium text-sm border border-[#E2E2E2] bg-white text-black disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              ‹
            </button>
          )}
          {visiblePageNumbers.map((page) => {
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                type="button"
                onClick={() => {
                  setCurrentPage(page);
                  setOpenItem(null);
                }}
                className="rounded-full w-8 h-8 sm:w-[33px] sm:h-[33px] flex items-center justify-center transition-colors shrink-0 font-medium text-sm sm:text-base text-black border border-[#E2E2E2]"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  background: isActive ? '#F05137' : '#FFFFFF',
                  border: isActive ? 'none' : '1px solid #E2E2E2',
                  boxShadow: isActive ? '0px 0px 4px rgba(0, 0, 0, 0.1)' : undefined,
                  color: isActive ? '#FFFFFF' : '#000000',
                }}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            );
          })}
          {isMobile && totalPages > PAGINATION_MOBILE_MAX && (
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                setOpenItem(null);
              }}
              disabled={currentPage === totalPages}
              className="rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-medium text-sm border border-[#E2E2E2] bg-white text-black disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              ›
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
