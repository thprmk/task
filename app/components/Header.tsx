'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Discover Hospital', href: '/' },
  { label: 'Find Doctors', href: '/doctors' },
  { label: 'Medical Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [pillNoTransition, setPillNoTransition] = useState(true);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const prevPathnameRef = useRef<string | null>(null);
  const pillRafIdRef = useRef<number | null>(null);

  const activeIndex = NAV_LINKS.findIndex((l) => {
    if (l.href === '/') return pathname === '/';
    return pathname.startsWith(l.href);
  });

  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const displayIndex = hoveredIndex !== null
    ? hoveredIndex
    : (clickedIndex !== null
      ? clickedIndex
      : (activeIndex >= 0 ? activeIndex : -1));

  // Position pill. On route change: jump instantly (no slide). On hover: slide smoothly.
  useLayoutEffect(() => {
    const container = navContainerRef.current;
    const link = navLinkRefs.current[displayIndex];
    if (!container || !link) {
      if (displayIndex === -1) {
        prevPathnameRef.current = pathname;
      }
      return;
    }
    const cr = container.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    const newStyle = { left: lr.left - cr.left, width: lr.width };
    const pathnameJustChanged = prevPathnameRef.current !== pathname;

    if (pathnameJustChanged || pillNoTransition) {
      prevPathnameRef.current = pathname;
      if (pillRafIdRef.current !== null) {
        cancelAnimationFrame(pillRafIdRef.current);
        pillRafIdRef.current = null;
      }
      queueMicrotask(() => {
        flushSync(() => {
          setPillStyle(newStyle);
          setPillNoTransition(true);
        });
        pillRafIdRef.current = requestAnimationFrame(() => {
          setPillNoTransition(false);
          pillRafIdRef.current = null;
        });
      });
      return () => {
        if (pillRafIdRef.current !== null) {
          cancelAnimationFrame(pillRafIdRef.current);
          pillRafIdRef.current = null;
        }
      };
    }
    setPillStyle(newStyle);
  }, [displayIndex, pathname]);

  useEffect(() => {
    const onResize = () => {
      const container = navContainerRef.current;
      const link = navLinkRefs.current[displayIndex];
      if (!container || !link) return;
      const cr = container.getBoundingClientRect();
      const lr = link.getBoundingClientRect();
      setPillStyle({ left: lr.left - cr.left, width: lr.width });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [displayIndex]);

  // Lock page scroll when mobile menu is open (html + body so background doesn't scroll)
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.setAttribute('data-scroll-locked', '');
    } else {
      const scrollY = document.body.style.top ? Math.abs(parseInt(document.body.style.top, 10)) : 0;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.removeAttribute('data-scroll-locked');
      if (scrollY) window.scrollTo(0, scrollY);
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.removeAttribute('data-scroll-locked');
    };
  }, [menuOpen]);

  // On route change: close menu and reset hover/click states
  useEffect(() => {
    setMenuOpen(false);
    setHoveredIndex(null);
    setClickedIndex(null);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white w-full min-w-0 overflow-x-hidden shadow-sm lg:shadow-none py-3 sm:py-4 px-4 sm:px-6 lg:px-[87px] relative lg:min-h-[92px]">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between box-border relative">
        {/* Logo - on desktop aligned with doctor profile / main content start (centered 1120px block) */}
        <Link
          href="/"
          className="flex-shrink-0 relative z-20 transition-transform duration-300 hover:scale-105 active:scale-95 w-auto h-10 sm:h-12 lg:absolute lg:top-[14px] lg:w-[149px] lg:h-[62px] lg:left-[max(0px,calc((100vw-1294px)/2))]"
          onClick={closeMenu}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={149}
            height={62}
            className="w-auto h-full object-contain object-left"
            priority
          />
        </Link>
        {/* Spacer on desktop so nav/right align correctly when logo is absolute */}
        <div className="hidden lg:block w-[149px] flex-shrink-0" aria-hidden />

        {/* Group 1203 - Desktop nav: exact dimensions and position from design */}
        <nav
          className="hidden lg:block absolute z-10"
          style={{
            width: '558.8px',
            height: '46px',
            left: 'calc(50% - 558.8px / 2 + 0.4px)',
            top: '23px',
          }}
          aria-label="Main navigation"
        >
          <div
            ref={navContainerRef}
            className="relative w-full h-full flex items-center justify-center bg-white border border-[#F05137] rounded-[23px] overflow-hidden"
            style={{ boxSizing: 'border-box' }}
          >
            {/* Sliding pill: instant jump on route change, smooth slide on hover */}
            <div
              className="absolute rounded-[23px] bg-[#F05137] z-0 pointer-events-none"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                top: 2,
                bottom: 2,
                opacity: displayIndex === -1 ? 0 : 1,
                transition: pillNoTransition ? 'none' : 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
              }}
            />
            {NAV_LINKS.map((link, index) => {
              const isHighlighted = index === displayIndex;
              return (
                <Link
                  key={link.href}
                  ref={(el) => { navLinkRefs.current[index] = el; }}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setClickedIndex(index)}
                  className={`relative z-10 flex-1 flex items-center justify-center h-full text-sm font-medium rounded-[23px] select-none transition-colors duration-300 hover:no-underline active:scale-[0.98] no-underline ${isHighlighted ? 'nav-pill-active' : ''}`}
                  style={{
                    fontFamily: "'Helonik', sans-serif",
                    ...(isHighlighted ? { color: '#ffffff' } : {}),
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right: Desktop actions / Mobile hamburger */}
        <div className="flex items-center gap-3 sm:gap-4 z-20">
          {/* Desktop: Call (32×32) + gap + Medical Emergency */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+911234567890"
              className="absolute bg-[#010043] rounded-full flex items-center justify-center text-white transition-[transform,box-shadow] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-lg hover:shadow-[#010043]/30 active:scale-[0.97]"
              style={{
                width: '32px',
                height: '32px',
                right: 'max(221px, calc((100vw - 1294px) / 2 + 195px + 10px - 16px))',
                top: '35px',
              }}
              aria-label="Call"
            >
              <Phone size={16} fill="currentColor" />
            </a>
            <div className="w-8 h-8 flex-shrink-0" aria-hidden />
            <a
              href="tel:+911234567890"
              className="absolute flex items-center justify-center gap-2 bg-white border-2 border-[#F05137] rounded-full text-[#F05137] transition-[background-color,color,transform,box-shadow] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#F05137] hover:text-white hover:shadow-md active:scale-[0.98] group box-border px-6 py-2"
              style={{
                width: '195px',
                minHeight: '38px',
                right: 'max(16px, calc((100vw - 1294px) / 2 - 16px))',
                top: '29px',
              }}
              aria-label="Medical Emergency - Call"
            >
              <div className="w-5 h-5 bg-[#F05137] rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#F05137] shrink-0">
                <Phone size={12} fill="currentColor" />
              </div>
              <span
                className="uppercase whitespace-nowrap leading-tight"
                style={{
                  fontFamily: "'Helonik', sans-serif",
                  fontWeight: 500,
                  fontStyle: 'normal',
                  fontSize: '12px',
                  lineHeight: '1.2',
                  letterSpacing: '0%',
                }}
              >
                Medical Emergency
              </span>
            </a>
          </div>

          {/* Mobile: Hamburger */}
          <button
            type="button"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay + panel */}
      {/* Mobile menu overlay + panel with Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-md touch-none overflow-hidden"
              onClick={closeMenu}
              onTouchMove={(e) => e.preventDefault()}
              aria-hidden="true"
            />

            {/* Slide panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Heavy damping easing for smooth "fluid" feel
              style={{ willChange: 'transform' }} // Hint for GPU acceleration
              className="lg:hidden fixed top-0 right-0 z-40 h-full w-full max-w-[360px] bg-white flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-6 sm:py-8">
                <span
                  className="text-2xl font-bold text-[#010043] tracking-tight"
                  style={{ fontFamily: "'Helonik', sans-serif" }}
                >
                  Menu
                </span>
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <X size={22} strokeWidth={2} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-6" aria-label="Mobile navigation">
                <ul className="space-y-4">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={`block text-[28px] sm:text-[32px] leading-tight font-medium transition-colors duration-300
                            ${isActive ? 'text-[#F05137]' : 'text-[#010043] hover:text-[#F05137]'}`}
                          style={{ fontFamily: "'Helonik', sans-serif" }}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer CTAs - Aligned minimally at bottom */}
              <div className="p-6 mt-auto flex items-center gap-4">
                {/* Call Button (Icon Only) */}
                <a
                  href="tel:+911234567890"
                  className="w-12 h-12 bg-[#010043] rounded-full flex items-center justify-center text-white shrink-0 transition-[transform,box-shadow] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-lg hover:shadow-[#010043]/30 active:scale-[0.97]"
                  aria-label="Call Hospital"
                  onClick={closeMenu}
                >
                  <Phone size={20} fill="currentColor" />
                </a>

                {/* Medical Emergency - opens phone app with dummy number */}
                <a
                  href="tel:+911234567890"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-white border-[3px] border-[#F05137] rounded-full text-[#F05137] transition-[background-color,color,transform,box-shadow] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#F05137] hover:text-white hover:shadow-lg hover:shadow-[#F05137]/25 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] group box-border"
                  style={{ minHeight: '48px' }}
                  onClick={closeMenu}
                  aria-label="Medical Emergency - Call"
                >
                  <div className="w-9 h-9 bg-[#F05137] rounded-full flex items-center justify-center text-white transition-[background-color,color,transform] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:rotate-12 group-hover:bg-white group-hover:text-[#F05137] shrink-0">
                    <Phone size={16} fill="currentColor" />
                  </div>
                  <span
                    className="uppercase whitespace-nowrap leading-tight"
                    style={{
                      fontFamily: "'Helonik', sans-serif",
                      fontWeight: 500,
                      fontStyle: 'normal',
                      fontSize: '12px',
                      lineHeight: '1.2',
                      letterSpacing: '0%',
                    }}
                  >
                    Medical Emergency
                  </span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
