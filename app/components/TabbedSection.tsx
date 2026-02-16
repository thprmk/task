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

/* Figma design tokens – Vector 3: border 2.34466px #F05137, radius 23.4466px, bg #FAFAFA */
const TABBED_SECTION_CSS = {
  cardWidth: 1103.48,
  cardHeight: 463.84,
  borderRadius: 23.4466,
  borderWidth: 2.34466,
  contentLeft: 134,
  tabGap: 120,
  tabHeight: 67,
  tabWidth: 200,
  contentMaxWidth: 1017,
  tabFont: {
    fontFamily: "'Helonik', sans-serif",
    fontWeight: 500,
    fontSize: '18.7573px',
    lineHeight: '66px',
  },
  titleFont: {
    fontFamily: "'Helonik', sans-serif",
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: '31.26px',
    lineHeight: '57.05px',
    letterSpacing: '0%',
    color: '#000000',
  },
  bodyFont: {
    fontFamily: "'Helonik', sans-serif",
    fontWeight: 400,
    fontSize: '12.5049px',
    lineHeight: '25px',
    color: '#000000',
  },
  borderColor: '#F05137',
  vectorBg: '#FAFAFA',
} as const;

/* Exact card shape from design (folder tab + content area) – one path */
const CARD_SHAPE_PATH =
  'M1098.5 83.2646L1098.77 431.279C1098.78 444.242 1088.27 454.753 1075.31 454.744L24.894 454.009C11.9584 454 1.47387 443.516 1.46371 430.58L1.17239 59L1.1785 24.6364C1.18079 11.6809 11.6899 1.18277 24.6453 1.19393L158.522 1.30933L217.564 1.29864L274.187 1.1724C287.158 1.14348 297.688 11.6519 297.686 24.6233L297.683 36.2837C297.681 49.2413 308.19 59.7441 321.147 59.7346L677.767 59.4738L870.783 59.648L1075.07 59.8364C1088 59.8484 1098.49 70.331 1098.5 83.2646Z';

export default function TabbedSection() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const currentTab = tabsData.find((tab) => tab.id === activeTab) || tabsData[0];
  const s = TABBED_SECTION_CSS;

  const isOverviewActive = activeTab === 'overview';

  return (
    <section className="tabbed-section py-8 sm:py-12 px-3 sm:px-6 flex justify-center">
      {/* Card: SVG draws exact border + shape; content on top */}
      <div
        className="tabbed-section__card relative w-full max-w-[1103.48px] flex flex-col overflow-hidden min-h-0 lg:min-h-[463.84px]"
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1100 456"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d={CARD_SHAPE_PATH}
            fill="#FFFFFF"
            stroke="#F05137"
            strokeWidth="2.34466"
          />
        </svg>

        {/* Menus header: scrollable on mobile, Overview + other tabs */}
        <div
          className="tabbed-section__tabs relative flex flex-row items-stretch flex-none z-10 h-14 sm:h-[67px] flex-nowrap overflow-x-auto scrollbar-hide"
        >
          {/* Overview tab – width matches SVG tab on desktop; fixed min on mobile */}
          <div
            className="flex items-center justify-center flex-none shrink-0 w-[27%] min-w-[100px] sm:min-w-[140px] lg:min-w-[180px] max-w-[300px] h-full"
          >
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="w-full h-full flex items-center justify-center transition-colors hover:opacity-90 touch-manipulation text-sm sm:text-base lg:text-[18.7573px]"
              style={{
                fontFamily: s.tabFont.fontFamily,
                fontWeight: s.tabFont.fontWeight,
                lineHeight: '1.2',
                color: isOverviewActive ? s.borderColor : '#000000',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                padding: 0,
              }}
            >
              {tabsData[0].label}
            </button>
          </div>

          {/* Other tabs: horizontal scroll on mobile, gap scales */}
          <div
            className="flex flex-row items-center flex-1 gap-5 sm:gap-8 lg:gap-[120px] overflow-x-auto pl-4 sm:pl-6 lg:pl-8 min-w-0 shrink min-h-[3.25rem] sm:min-h-0 h-full scrollbar-hide"
          >
            {tabsData.slice(1).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="tabbed-section__tab flex items-center justify-center flex-none h-full transition-colors hover:opacity-90 whitespace-nowrap touch-manipulation text-sm sm:text-base lg:text-[18.7573px] py-0 px-2 sm:px-3"
                  style={{
                    fontFamily: s.tabFont.fontFamily,
                    fontWeight: s.tabFont.fontWeight,
                    lineHeight: '1.2',
                    color: isActive ? s.borderColor : '#000000',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content – responsive padding and typography */}
        <div
          className="tabbed-section__content relative flex-1 flex flex-col min-h-0 pb-6 pt-4 pr-4 sm:pb-10 sm:pt-6 sm:pr-6 lg:pr-12 pl-4 sm:pl-8 lg:pl-[134px] z-10"
        >
          <h2
            className="mb-3 sm:mb-4 w-[233px] max-w-full text-center text-xl sm:text-2xl lg:text-[31.26px] lg:leading-[57.05px]"
            style={{
              fontFamily: s.titleFont.fontFamily,
              fontWeight: s.titleFont.fontWeight,
              fontStyle: s.titleFont.fontStyle,
              letterSpacing: s.titleFont.letterSpacing,
              color: s.titleFont.color,
              textAlign: 'center',
              lineHeight: s.titleFont.lineHeight,
            }}
          >
            {currentTab.content.title}
          </h2>
          <div
            className="max-w-[1017px] text-xs sm:text-[12.5049px] leading-relaxed sm:leading-[25px]"
            style={{
              fontFamily: s.bodyFont.fontFamily,
              fontWeight: s.bodyFont.fontWeight,
              color: s.bodyFont.color,
            }}
          >
            {currentTab.content.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-3 sm:mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
