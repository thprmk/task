'use client';

import { useState } from 'react';

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
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in',
      ],
    },
  },
  {
    id: 'expertise',
    label: 'Areas of Expertise',
    content: {
      title: 'Areas of Expertise',
      paragraphs: [
        'Our hospital specializes in a wide range of medical disciplines including cardiology, neurology, oncology, orthopedics, and pediatrics.',
      ],
    },
  },
  {
    id: 'qualifications',
    label: 'Qualifications',
    content: {
      title: 'Professional Qualifications',
      paragraphs: [
        'All our medical professionals hold advanced degrees from accredited institutions and maintain active board certifications.',
      ],
    },
  },
  {
    id: 'memberships',
    label: 'Memberships',
    content: {
      title: 'Professional Memberships',
      paragraphs: [
        'Our hospital and medical staff are members of prestigious professional organizations including the American Medical Association.',
      ],
    },
  },
];

const TAB_FONT = {
  fontFamily: "'Helonik', sans-serif",
  fontWeight: 500,
  fontSize: 18.7573,
  lineHeight: '66px',
} as const;

export default function TabbedSection() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const currentTab = tabsData.find((tab) => tab.id === activeTab) || tabsData[0];

  return (
    <section className="bg-white py-12 px-4 flex justify-center">
      {/* Group 1000002333: width 1103.48px, centered, min-height 463.84px */}
      <div
        className="relative flex flex-col w-full"
        style={{
          maxWidth: 1103.48,
          minHeight: 463.84,
        }}
      >
        {/* Vector 3: vertical bar - left 88px, #FAFAFA, border #F05137, radius 23.4466px */}
        <div
          className="absolute top-0 bottom-0 hidden sm:block"
          style={{
            left: 88,
            width: 10,
            top: 0,
            height: '100%',
            minHeight: 463.84,
            background: '#FAFAFA',
            border: '2.34466px solid #F05137',
            borderRadius: 23.4466,
          }}
          aria-hidden
        />

        {/* Frame 110: Tabs row - gap 120px, left 430.39 */}
        <div
          className="flex flex-row items-center flex-wrap gap-8 sm:gap-[120px] z-10 mb-0 pl-4 sm:pl-0 sm:ml-[430px]"
          style={{
            minHeight: 67,
          }}
        >
          {tabsData.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="transition-colors hover:opacity-80"
                style={{
                  ...TAB_FONT,
                  color: isActive ? '#F05137' : '#000000',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content box: title at 134px, body at 134px - same left padding */}
        <div
          className="relative z-10 border border-[#F05137] bg-[#FAFAFA] flex-1 min-h-[380px] pl-6 sm:pl-[134px]"
          style={{
            borderWidth: 2.34466,
            borderRadius: 23.4466,
            marginTop: -2.34,
            paddingRight: 52,
            paddingTop: 24,
            paddingBottom: 40,
          }}
        >
          {/* Brief Summary - Helonik 500 31.2622px, line-height 57px */}
          <h2
            className="text-black mb-6"
            style={{
              fontFamily: "'Helonik', sans-serif",
              fontWeight: 500,
              fontSize: 31.2622,
              lineHeight: '57px',
            }}
          >
            {currentTab.content.title}
          </h2>
          {/* Body - Helonik 400 12.5049px, line-height 25px, max-width 1017px */}
          <div className="max-w-[1017px]">
            {currentTab.content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-black mb-4 last:mb-0"
                style={{
                  fontFamily: "'Helonik', sans-serif",
                  fontWeight: 400,
                  fontSize: 12.5049,
                  lineHeight: '25px',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
