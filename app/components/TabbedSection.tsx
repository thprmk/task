'use client';

import { useState, useCallback } from 'react';

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

const TABLIST_ID = 'tabbed-section-tablist';
const TABPANEL_ID = 'tabbed-section-tabpanel';

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
    fontStyle: 'normal',
    fontSize: '18.7573px',
    lineHeight: '66px',
  },
  titleFont: {
    fontFamily: "'Helonik', sans-serif",
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: '31.2622px',
    lineHeight: '57px',
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

  const handleKeyDownFirst = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveTab(tabsData[1].id);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveTab(tabsData[tabsData.length - 1].id);
    }
  }, []);

  const handleKeyDownRest = useCallback((e: React.KeyboardEvent, tabIndex: number) => {
    const index = tabIndex + 1;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveTab(tabsData[index - 1].id);
    } else if (e.key === 'ArrowRight' && index < tabsData.length - 1) {
      e.preventDefault();
      setActiveTab(tabsData[index + 1].id);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveTab(tabsData[0].id);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveTab(tabsData[tabsData.length - 1].id);
    }
  }, []);

  return (
    <section className="tabbed-section py-6 sm:py-12 px-3 sm:px-6 flex justify-center overflow-x-hidden min-w-0 w-full">
      {/* ——— Responsive only (mobile/tablet): simple card, same border ——— */}
      <div className="lg:hidden w-full max-w-[1103.48px] min-w-0">
        <div
          className="rounded-2xl border-2 border-[#F05137] bg-[#FAFAFA] overflow-hidden flex flex-col min-h-0"
          style={{ borderWidth: 2.34466 }}
        >
          {/* Tabs: single row, scrollable, same border color */}
          <div
            id={`${TABLIST_ID}-resp`}
            role="tablist"
            aria-label="Section tabs"
            className="flex bg-white/80 overflow-x-auto scrollbar-hide shrink-0"
            style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          >
            {tabsData.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const isFirst = idx === 0;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}-resp`}
                  aria-selected={isActive}
                  aria-controls={`${TABPANEL_ID}-resp`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={isFirst ? handleKeyDownFirst : (e) => handleKeyDownRest(e, idx - 1)}
                  className="flex-shrink-0 min-h-[48px] px-4 py-3 text-left text-sm font-medium whitespace-nowrap transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05137] focus-visible:ring-inset"
                  style={{
                    fontFamily: s.tabFont.fontFamily,
                    color: isActive ? s.borderColor : '#000000',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          {/* Content */}
          <div
            id={`${TABPANEL_ID}-resp`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}-resp`}
            className="flex-1 min-h-0 px-4 py-5 overflow-y-auto"
            style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          >
            <h2
              className="mb-3 text-left text-lg font-semibold text-black"
              style={{ fontFamily: s.titleFont.fontFamily }}
            >
              {currentTab.content.title}
            </h2>
            <div
              className="text-left text-sm leading-relaxed text-black break-words"
              style={{
                fontFamily: s.bodyFont.fontFamily,
                lineHeight: 1.6,
              }}
            >
              {currentTab.content.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ——— Desktop only: original design (do not touch) ——— */}
      <div className="hidden lg:block w-full max-w-[1103.48px] min-w-0">
        <div
          className="tabbed-section__card relative w-full flex flex-col overflow-hidden min-h-[463.84px]"
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
              fill="#FAFAFA"
              stroke="#F05137"
              strokeWidth="2.34466"
            />
          </svg>

          <div
            id={TABLIST_ID}
            role="tablist"
            aria-label="Section tabs"
            className="tabbed-section__tabs relative flex flex-row items-stretch justify-start flex-none z-10 h-[67px] flex-nowrap"
          >
            <div className="flex items-center justify-center flex-none shrink-0 w-[27%] min-w-[180px] max-w-[300px] h-full relative">
              <button
                type="button"
                role="tab"
                id={`tab-${tabsData[0].id}`}
                aria-selected={isOverviewActive}
                aria-controls={TABPANEL_ID}
                tabIndex={isOverviewActive ? 0 : -1}
                onClick={() => setActiveTab('overview')}
                onKeyDown={handleKeyDownFirst}
                className="w-full h-full flex items-center justify-center transition-colors rounded-t focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05137] focus-visible:ring-offset-2"
                style={{
                  fontFamily: s.tabFont.fontFamily,
                  fontWeight: s.tabFont.fontWeight,
                  fontStyle: s.tabFont.fontStyle,
                  fontSize: s.tabFont.fontSize,
                  lineHeight: s.tabFont.lineHeight,
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
            <div className="flex flex-row items-center flex-1 gap-[120px] pl-8 min-w-0 shrink h-full">
              {tabsData.slice(1).map((tab, idx) => {
                const isActive = activeTab === tab.id;
                return (
                  <div key={tab.id} className="relative flex items-center justify-center flex-none h-full">
                    <button
                      type="button"
                      role="tab"
                      id={`tab-${tab.id}`}
                      aria-selected={isActive}
                      aria-controls={TABPANEL_ID}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveTab(tab.id)}
                      onKeyDown={(e) => handleKeyDownRest(e, idx)}
                      className="tabbed-section__tab flex items-center justify-center flex-none h-full transition-colors whitespace-nowrap py-0 px-3 rounded-t focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F05137] focus-visible:ring-offset-2"
                      style={{
                        fontFamily: s.tabFont.fontFamily,
                        fontWeight: s.tabFont.fontWeight,
                        fontStyle: s.tabFont.fontStyle,
                        fontSize: s.tabFont.fontSize,
                        lineHeight: s.tabFont.lineHeight,
                        color: isActive ? s.borderColor : '#000000',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {tab.label}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            id={TABPANEL_ID}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="tabbed-section__content relative flex-1 flex flex-col items-start justify-start min-h-0 pb-10 pt-6 pr-12 pl-8 z-10 min-w-0 text-left"
            style={{ alignItems: 'flex-start', textAlign: 'left' }}
          >
            <h2
              className="mb-4 w-[233px] max-w-full text-left self-start"
              style={{
                fontFamily: s.titleFont.fontFamily,
                fontWeight: s.titleFont.fontWeight,
                fontStyle: s.titleFont.fontStyle,
                fontSize: s.titleFont.fontSize,
                lineHeight: s.titleFont.lineHeight,
                letterSpacing: s.titleFont.letterSpacing,
                color: s.titleFont.color,
                textAlign: 'left',
              }}
            >
              {currentTab.content.title}
            </h2>
            <div
              className="max-w-[1017px] w-full min-w-0 flex flex-col items-start justify-start text-left self-start"
              style={{
                fontFamily: s.bodyFont.fontFamily,
                fontWeight: s.bodyFont.fontWeight,
                fontSize: s.bodyFont.fontSize,
                lineHeight: s.bodyFont.lineHeight,
                color: s.bodyFont.color,
                textAlign: 'left',
              }}
            >
              {currentTab.content.paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0 text-left">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
