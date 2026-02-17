import Link from "next/link";
import TabbedSection from "./components/TabbedSection";
import HomeBookingSection from "./components/HomeBookingSection";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 min-w-0">
      {/* Breadcrumb + Doctor Profile + Book Appointment - centered on desktop */}
      <section className="bg-white pb-0 flex justify-center px-4 sm:px-6 lg:px-8 min-w-0">
        <div
          className="w-full flex flex-col items-start min-w-0 pt-8 sm:pt-20 lg:pt-[94px] pl-2 sm:pl-3 lg:pl-[10px] max-w-[1120px]"
        >
          {/* 1. Breadcrumb - Figma Group 1000001853 / Rectangle 75 */}
          <nav
            className="flex flex-row flex-wrap items-center gap-1 sm:gap-1.5 mb-4 sm:mb-6 box-border w-full max-w-full min-h-[40px] sm:min-h-[46px] py-2 sm:py-0 px-3 sm:px-6"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="flex-none hover:text-[#F05137] transition-colors text-xs sm:text-sm"
              style={{
                fontFamily: "'Helonik', sans-serif",
                fontWeight: 400,
                lineHeight: '16px',
                color: '#000000',
              }}
            >
              Home
            </Link>
            <span className="flex-none w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-black shrink-0" aria-hidden>
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
            <Link
              href="/doctors"
              className="flex-none hover:text-[#F05137] transition-colors text-xs sm:text-sm"
              style={{
                fontFamily: "'Helonik', sans-serif",
                fontWeight: 400,
                lineHeight: '16px',
                color: '#000000',
              }}
            >
              Doctors
            </Link>
            <span className="flex-none w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-black shrink-0" aria-hidden>
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
            <span
              className="flex-none text-xs sm:text-sm"
              style={{
                fontFamily: "'Helonik', sans-serif",
                fontWeight: 400,
                lineHeight: '16px',
                color: '#F05137',
              }}
            >
              Raghul
            </span>
          </nav>

          {/* 2. Doctor Profile + 3. Book Appointment - Book Appointments opens smooth modal */}
          <HomeBookingSection />
        </div>
      </section>

      {/* Tabbed Section */}
      <section className="bg-white">
        <TabbedSection />
      </section>

      {/* FAQ Section */}
      <section className="bg-white">
        <FAQ />
      </section>
    </div>
  );
}
