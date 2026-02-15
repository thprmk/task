'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  content: {
    title: string;
    paragraphs: string[];
  };
}

const tabsData: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: {
      title: 'Brief Summary',
      paragraphs: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      ],
    },
  },
  {
    id: 'expertise',
    label: 'Areas of Expertise',
    content: {
      title: 'Areas of Expertise',
      paragraphs: [
        'Our hospital specializes in a wide range of medical disciplines including cardiology, neurology, oncology, orthopedics, and pediatrics. Our team of experienced specialists provides comprehensive care across all these areas.',
        'We are committed to staying at the forefront of medical innovation, continuously updating our practices and technologies to provide the best possible care for our patients.',
        'Each department is staffed with board-certified physicians and supported by state-of-the-art medical equipment and facilities.',
      ],
    },
  },
  {
    id: 'qualifications',
    label: 'Qualifications',
    content: {
      title: 'Professional Qualifications',
      paragraphs: [
        'All our medical professionals hold advanced degrees from accredited institutions and maintain active board certifications in their respective specialties.',
        'Our team regularly participates in continuing medical education programs and professional development to ensure they stay current with the latest medical advances and best practices.',
        'We are accredited by major healthcare organizations and maintain the highest standards of medical care and patient safety.',
      ],
    },
  },
  {
    id: 'memberships',
    label: 'Memberships',
    content: {
      title: 'Professional Memberships',
      paragraphs: [
        'Our hospital and medical staff are members of prestigious professional organizations including the American Medical Association, American Hospital Association, and various specialty-specific medical societies.',
        'These memberships ensure we maintain the highest standards of care and have access to the latest research, best practices, and professional networks.',
        'We actively participate in medical conferences, research collaborations, and professional development programs through these memberships.',
      ],
    },
  },
];

export default function TabbedSection() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeTabPosition, setActiveTabPosition] = useState({ left: 0, width: 0 });
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const currentTab = tabsData.find((tab) => tab.id === activeTab) || tabsData[0];

  useEffect(() => {
    const updateActiveTabPosition = () => {
      const activeButton = document.querySelector(`[data-tab-id="${activeTab}"]`) as HTMLElement;
      const container = tabsContainerRef.current;
      
      if (activeButton && container) {
        const buttonRect = activeButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        setActiveTabPosition({
          left: buttonRect.left - containerRect.left,
          width: buttonRect.width,
        });
      }
    };

    setTimeout(updateActiveTabPosition, 0);
    window.addEventListener('resize', updateActiveTabPosition);
    return () => window.removeEventListener('resize', updateActiveTabPosition);
  }, [activeTab]);

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Outer wrapper with continuous border around everything */}
        <div
          className="border-2 rounded-xl relative overflow-hidden"
          style={{ borderColor: '#F05137' }}
        >
          {/* Tabs Navigation */}
          <div className="relative px-6 sm:px-8 pt-6 sm:pt-8 pb-0" ref={tabsContainerRef}>
            <div className="flex flex-wrap gap-0">
              {tabsData.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    data-tab-id={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-normal transition-all relative z-10
                      ${
                        isActive
                          ? 'text-[#F05137]'
                          : 'text-black hover:text-gray-600'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area - border connects seamlessly to active tab */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 relative">
            {/* Active tab border connection - creates folder tab effect */}
            <motion.div
              className="absolute top-0"
              style={{ 
                left: `${activeTabPosition.left}px`,
                width: `${activeTabPosition.width}px`,
                height: '2px',
                backgroundColor: '#F05137',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                zIndex: 20,
              }}
              initial={false}
              animate={{
                left: `${activeTabPosition.left}px`,
                width: `${activeTabPosition.width}px`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            
            <div
              className="border-2 rounded-b-xl p-6 sm:p-8 lg:p-10 bg-white relative"
              style={{ 
                borderColor: '#F05137',
                borderTop: 'none',
                marginTop: '-2px',
              }}
            >
              {/* Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative z-10"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8">
                  {currentTab.content.title}
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  {currentTab.content.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base sm:text-lg text-black leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
