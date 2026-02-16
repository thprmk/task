import Link from "next/link";
import TabbedSection from "./components/TabbedSection";
import HomeBookingSection from "./components/HomeBookingSection";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb + Doctor Profile + Book Appointment - centered on desktop */}
      <section className="bg-white pb-0 flex justify-center px-4 sm:px-6 lg:px-8">
        <div
          className="w-full flex flex-col items-start"
          style={{ paddingTop: 94, paddingLeft: 62, maxWidth: 1120 }}
        >
          {/* 1. Breadcrumb - Figma Group 1000001853 / Rectangle 75 */}
          <nav
            className="flex flex-row items-center mb-6 box-border"
            style={{
              width: 403,
              height: 46,
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 77,
              paddingLeft: 25,
              paddingRight: 25,
              gap: 5,
            }}
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="flex-none hover:text-[#F05137] transition-colors"
              style={{
                fontFamily: "'Helonik', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '16px',
                color: '#000000',
              }}
            >
              Home
            </Link>
            <span className="flex-none w-4 h-4 flex items-center justify-center text-black" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
            <Link
              href="/doctors"
              className="flex-none hover:text-[#F05137] transition-colors"
              style={{
                fontFamily: "'Helonik', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: '16px',
                color: '#000000',
              }}
            >
              Doctors
            </Link>
            <span className="flex-none w-4 h-4 flex items-center justify-center text-black" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
            <span
              className="flex-none"
              style={{
                fontFamily: "'Helonik', sans-serif",
                fontWeight: 400,
                fontSize: 14,
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
