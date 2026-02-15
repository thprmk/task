'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  // Page 1
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
  // Page 2
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
  // Page 3
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
    answer: 'Yes, you can request prescription refills through our patient portal or by contacting your doctor\'s office directly. Some prescriptions may require a follow-up appointment.',
  },
  {
    id: 12,
    question: 'What parking facilities are available?',
    answer: 'We have ample parking available on-site with both covered and open parking areas. Valet parking is also available for patients with mobility issues.',
  },
  // Page 4
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
  // Page 5
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
    question: 'What is the hospital\'s policy on visitors?',
    answer: 'Visitors are welcome during visiting hours. We typically allow 2 visitors per patient at a time. Special arrangements can be made for extended family visits with prior approval.',
  },
  {
    id: 20,
    question: 'How can I provide feedback about my experience?',
    answer: 'We value your feedback! You can provide feedback through our patient satisfaction survey, online portal, or by contacting our patient relations department directly.',
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(faqData.length / itemsPerPage);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  // Calculate which items to show based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaqItems = faqData.slice(startIndex, endIndex);

  return (
    <div className="bg-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-black text-center mb-8 sm:mb-10 lg:mb-12 px-2">
          Frequently Asked Questions
        </h1>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 lg:mb-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="space-y-3 sm:space-y-4"
            >
              {currentFaqItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1, delay: index * 0.03 }}
                  className="bg-gray-200 rounded-2xl p-4 sm:p-5 lg:p-6 cursor-pointer transition-all"
                >
              <div
                className="flex items-start justify-between gap-3 sm:gap-4"
                onClick={() => toggleItem(item.id)}
              >
                <h3 className="text-sm sm:text-base lg:text-lg font-normal text-black flex-1 leading-snug sm:leading-normal">
                  {startIndex + index + 1}. {item.question}
                </h3>
                <motion.div
                  className="flex-shrink-0 mt-0.5 sm:mt-0"
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    style={{ color: openItem === item.id ? '#F05137' : '#000000' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </div>
              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                     <div className="mt-3 sm:mt-4 pt-3 sm:pt-4">
                       <motion.p
                         initial={{ y: -10 }}
                         animate={{ y: 0 }}
                         exit={{ y: -10 }}
                         transition={{ duration: 0.2 }}
                         className="text-sm sm:text-base text-gray-900 leading-relaxed"
                       >
                         {item.answer}
                       </motion.p>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 flex-wrap px-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                setOpenItem(null); // Close any open items when changing page
              }}
              className={`
                w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-normal transition-colors border
                ${
                  currentPage === page
                    ? 'text-white border-transparent'
                    : 'bg-white text-black border-gray-300 hover:border-gray-400'
                }
              `}
              style={
                currentPage === page
                  ? { backgroundColor: '#F05137' }
                  : undefined
              }
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

