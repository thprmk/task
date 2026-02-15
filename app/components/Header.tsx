'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="relative flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          {/* Logo Placeholder */}
          <div className="bg-gray-200 rounded-lg px-4 py-2.5 sm:px-5 sm:py-3 flex-shrink-0">
            <span className="text-black font-medium text-sm sm:text-base">logo</span>
          </div>

          {/* Main Navigation Bar - Centered */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
            <div 
              className="flex items-center gap-4 lg:gap-6 xl:gap-8 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-full border-2 bg-white"
              style={{ borderColor: '#F05137' }}
            >
              <Link 
                href="/" 
                className="text-black text-sm lg:text-base font-normal hover:text-[#F05137] transition-colors whitespace-nowrap"
              >
                Discover Hospital
              </Link>
              <Link 
                href="/doctors" 
                className="text-black text-sm lg:text-base font-normal hover:text-[#F05137] transition-colors whitespace-nowrap"
              >
                Find Doctors
              </Link>
              <Link 
                href="/services" 
                className="text-black text-sm lg:text-base font-normal hover:text-[#F05137] transition-colors whitespace-nowrap"
              >
                Medical Services
              </Link>
              <Link 
                href="/contact" 
                className="text-black text-sm lg:text-base font-normal hover:text-[#F05137] transition-colors whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation - Simplified */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
            <div 
              className="flex items-center gap-2 px-3 py-2 rounded-full border-2 bg-white overflow-x-auto"
              style={{ borderColor: '#F05137' }}
            >
              <Link 
                href="/" 
                className="text-black text-xs font-normal hover:text-[#F05137] transition-colors whitespace-nowrap"
              >
                Discover
              </Link>
              <Link 
                href="/doctors" 
                className="text-black text-xs font-normal hover:text-[#F05137] transition-colors whitespace-nowrap"
              >
                Doctors
              </Link>
              <Link 
                href="/services" 
                className="text-black text-xs font-normal hover:text-[#F05137] transition-colors whitespace-nowrap"
              >
                Services
              </Link>
              <Link 
                href="/contact" 
                className="text-black text-xs font-normal hover:text-[#F05137] transition-colors whitespace-nowrap"
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
            {/* Phone Icon - Dark Blue Circle */}
            <div 
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              style={{ backgroundColor: '#010043' }}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-6 sm:h-6"
              >
                <path 
                  d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" 
                  fill="white"
                />
              </svg>
            </div>

            {/* Medical Emergency Button */}
            <button
              className="flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-full border-2 bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
              style={{ borderColor: '#F05137' }}
            >
              {/* Modern Telephone Icon - Orange Red */}
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-5 sm:h-5 flex-shrink-0"
              >
                <path 
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" 
                  fill="#F05137"
                />
              </svg>
              <span 
                className="text-xs sm:text-sm lg:text-base font-normal whitespace-nowrap hidden sm:inline"
                style={{ color: '#F05137' }}
              >
                Medical Emergency
              </span>
              <span 
                className="text-xs font-normal sm:hidden"
                style={{ color: '#F05137' }}
              >
                Emergency
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

