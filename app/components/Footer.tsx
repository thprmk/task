'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white w-full min-w-0 overflow-x-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10 lg:py-12 box-border">
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 lg:gap-24 xl:gap-32">
          {/* Left Column - Company Info & Social Media */}
          <div className="space-y-3 sm:space-y-5 lg:max-w-xs min-w-0">
            <div className="mb-1 sm:mb-4">
              <Link href="/" className="inline-block touch-manipulation">
                <Image
                  src="/logo.png"
                  alt="SRM Prime Hospital"
                  width={149}
                  height={62}
                  className="rounded-[7px] w-[100px] h-[42px] sm:w-[149px] sm:h-[62px] object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Description Text */}
            <div className="space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-black leading-relaxed max-w-full">
              <p>Lorem ipsum dolor sit amet, consectetur</p>
              <p>adipiscing elit, sed do eiusmod</p>
            </div>

            {/* Social Media */}
            <div className="pt-0 sm:pt-2">
              <h3 className="font-bold text-black mb-2 sm:mb-4 text-sm sm:text-base">Social Media</h3>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {/* Facebook */}
                <a
                  href="#"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center text-black hover:text-blue-600 active:opacity-80 transition-colors touch-manipulation rounded"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </a>

                {/* Twitter/X */}
                <a
                  href="#"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center text-black hover:text-gray-900 active:opacity-80 transition-colors touch-manipulation rounded"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center text-black hover:text-pink-600 active:opacity-80 transition-colors touch-manipulation rounded"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372.853.038 1.126.048 3.299.048 2.173 0 2.445-.01 3.298-.048.852-.04 1.434-.175 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8c0-2.172-.01-2.445-.048-3.297-.04-.852-.175-1.433-.372-1.942a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.999 0h.001zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center text-black hover:text-blue-700 active:opacity-80 transition-colors touch-manipulation rounded"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - All Link Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 sm:gap-8 lg:gap-8 lg:flex-1 lg:justify-end lg:ml-auto min-w-0">
            {/* Second Column - Community */}
            <div className="min-w-0">
              <h3 className="font-semibold text-black mb-2 sm:mb-4 text-sm sm:text-lg">Community</h3>
              <ul className="space-y-0.5 sm:space-y-2.5">
                <li>
                  <Link href="#" className="text-gray-900 hover:text-black active:opacity-80 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Doctors
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Site Map
                  </Link>
                </li>
              </ul>
            </div>

            {/* Third Column - About */}
            <div>
              <h3 className="font-semibold text-black mb-2 sm:mb-4 text-sm sm:text-lg">About</h3>
              <ul className="space-y-1.5 sm:space-y-2.5">
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Specilatices
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Areas Of Care
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Volunteers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Fourth Column - Support */}
            <div>
              <h3 className="font-semibold text-black mb-2 sm:mb-4 text-sm sm:text-lg">Support</h3>
              <ul className="space-y-1.5 sm:space-y-2.5">
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Visitor Information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Emergency Care
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Online Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Pay Your Bills
                  </Link>
                </li>
              </ul>
            </div>

            {/* Fifth Column - Trust & Legal */}
            <div>
              <h3 className="font-semibold text-black mb-2 sm:mb-4 text-sm sm:text-lg">Trust & Legal</h3>
              <ul className="space-y-1.5 sm:space-y-2.5">
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-black hover:opacity-80 active:opacity-70 transition-colors text-xs sm:text-sm block py-2 sm:py-0.5 touch-manipulation">
                    Hospital Stay
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="py-3 sm:py-4" style={{ backgroundColor: '#F05137' }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <p className="text-white text-center text-xs sm:text-sm leading-relaxed break-words">
            <span className="block sm:inline">© 2026 Hospitals. All rights reserved.</span>{' '}
            <span className="underline block sm:inline mt-0.5 sm:mt-0">Designed & Developed by Xtracut</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

