'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header
      className="bg-white w-full shadow-sm pl-4 pr-4 sm:pl-12 sm:pr-12 lg:pl-[87px] lg:pr-[87px] pt-[14px] pb-[14px]"
    >
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="relative flex items-center justify-between min-h-[76px]">
          {/* Logo - Group 1000002335: 149×62, left 87 (via header padding), top 14 */}
          <Link
            href="/"
            className="flex-shrink-0 relative flex items-center"
            style={{ width: 149, height: 62 }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={149}
              height={62}
              className="w-full h-full object-contain object-left"
              priority
            />
          </Link>

          {/* Main Navigation - Group 1203: 558.8×46, centered, top 23px */}
          <nav
            className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex"
            style={{ top: 23 }}
          >
            <div
              className="flex flex-row items-center box-border flex-none"
              style={{
                width: 558.8,
                height: 46,
                paddingLeft: 24,
                paddingRight: 24,
                background: '#FFFFFF',
                border: '0.821429px solid #F05137',
                borderRadius: 77,
                gap: 32.06,
              }}
            >
              <Link
                href="/"
                className="flex-none hover:text-[#F05137] transition-colors whitespace-nowrap"
                style={{
                  fontFamily: "'Helonik', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '16px',
                  color: '#000000',
                }}
              >
                Discover Hospital
              </Link>
              <Link
                href="/doctors"
                className="flex-none hover:text-[#F05137] transition-colors whitespace-nowrap"
                style={{
                  fontFamily: "'Helonik', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '16px',
                  color: '#000000',
                }}
              >
                Find Doctors
              </Link>
              <Link
                href="/services"
                className="flex-none hover:text-[#F05137] transition-colors whitespace-nowrap"
                style={{
                  fontFamily: "'Helonik', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '16px',
                  color: '#000000',
                }}
              >
                Medical Services
              </Link>
              <Link
                href="/contact"
                className="flex-none hover:text-[#F05137] transition-colors whitespace-nowrap"
                style={{
                  fontFamily: "'Helonik', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '16px',
                  color: '#000000',
                }}
              >
                Contact Us
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation - same 4 items */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
            <div
              className="flex items-center overflow-x-auto"
              style={{
                height: 46,
                paddingLeft: 12,
                paddingRight: 12,
                gap: 12,
                background: '#FFFFFF',
                border: '0.821429px solid #F05137',
                borderRadius: 77,
              }}
            >
              <Link href="/" className="text-black text-xs font-normal hover:text-[#F05137] transition-colors whitespace-nowrap" style={{ fontFamily: "'Helonik', sans-serif" }}>
                Discover
              </Link>
              <Link href="/doctors" className="text-black text-xs font-normal hover:text-[#F05137] transition-colors whitespace-nowrap" style={{ fontFamily: "'Helonik', sans-serif" }}>
                Doctors
              </Link>
              <Link href="/services" className="text-black text-xs font-normal hover:text-[#F05137] transition-colors whitespace-nowrap" style={{ fontFamily: "'Helonik', sans-serif" }}>
                Services
              </Link>
              <Link href="/contact" className="text-black text-xs font-normal hover:text-[#F05137] transition-colors whitespace-nowrap" style={{ fontFamily: "'Helonik', sans-serif" }}>
                Contact
              </Link>
            </div>
          </nav>

          {/* Right Side Actions - Group 1216 (phone) left 983, Group 1209 (btn) left 1029 → gap 14px */}
          <div
            className="flex items-center flex-shrink-0"
            style={{ gap: 14 }}
          >
            {/* Phone Icon - Figma Group 1216 / Frame 6 */}
            <div
              className="flex items-center justify-center flex-shrink-0 cursor-pointer hover:brightness-110 transition-[filter]"
              style={{
                width: 32,
                height: 32,
                padding: 8.40656,
                background: '#010043',
                borderRadius: 63.0492,
                opacity: 1,
              }}
              aria-label="Phone"
            >
              <svg
                width="15.16"
                height="15.16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 1 }}
              >
                <path
                  d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                  fill="#FFFFFF"
                  fillOpacity={1}
                />
              </svg>
            </div>

            {/* Medical Emergency Button - Figma Group 1209 / Frame 4 */}
            <button
              type="button"
              className="flex flex-row items-center bg-white hover:bg-gray-50 transition-colors flex-shrink-0"
              style={{
                padding: 8.66926,
                gap: 8.67,
                width: 163,
                height: 33,
                border: '0.722438px solid #F05137',
                borderRadius: 65.0194,
              }}
            >
              {/* Group 1208: 28×28, red circle, white landline (handset + keypad) */}
              <span
                className="flex-none flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  background: '#F05137',
                  borderRadius: '50%',
                  flexGrow: 0,
                }}
              >
                <svg
                  width="15.89"
                  height="15.89"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Handset (left) */}
                  <path
                    d="M8 5v1.5c0 .83.67 1.5 1.5 1.5.45 0 .87-.2 1.15-.52l.7.7c.2.2.51.2.71 0l1.41-1.41c.2-.2.2-.51 0-.71l-.7-.7c.32-.28.52-.7.52-1.15V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2z"
                    fill="#FFFFFF"
                  />
                  {/* Base outline (right) so keypad shows through */}
                  <path
                    d="M18 4H10c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                  />
                  <rect x="11.5" y="8" width="1.5" height="1.5" rx="0.25" fill="#FFFFFF" />
                  <rect x="13.5" y="8" width="1.5" height="1.5" rx="0.25" fill="#FFFFFF" />
                  <rect x="15.5" y="8" width="1.5" height="1.5" rx="0.25" fill="#FFFFFF" />
                  <rect x="11.5" y="10" width="1.5" height="1.5" rx="0.25" fill="#FFFFFF" />
                  <rect x="13.5" y="10" width="1.5" height="1.5" rx="0.25" fill="#FFFFFF" />
                  <rect x="15.5" y="10" width="1.5" height="1.5" rx="0.25" fill="#FFFFFF" />
                  <rect x="11.5" y="12" width="1.5" height="1.5" rx="0.25" fill="#FFFFFF" />
                  <rect x="13.5" y="12" width="1.5" height="1.5" rx="0.25" fill="#FFFFFF" />
                  <rect x="15.5" y="12" width="1.5" height="1.5" rx="0.25" fill="#FFFFFF" />
                </svg>
              </span>
              <span
                className="whitespace-nowrap"
                style={{
                  fontFamily: "'Helonik', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: '14px',
                  color: '#F05137',
                }}
              >
                Medical Emergency
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

