'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

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
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const activeIndex = NAV_LINKS.findIndex((l) => l.href === pathname);
  const displayIndex = hoveredIndex !== null ? hoveredIndex : (activeIndex >= 0 ? activeIndex : 0);

  // Position sliding pill on hover/active change
  useLayoutEffect(() => {
    const container = navContainerRef.current;
    const link = navLinkRefs.current[displayIndex];
    if (!container || !link) return;
    const cr = container.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    setPillStyle({ left: lr.left - cr.left, width: lr.width });
  }, [displayIndex]);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu on route change (e.g. after clicking a link)
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white w-full min-w-0 overflow-x-hidden shadow-sm py-3 sm:py-4 px-4 sm:px-6 lg:px-[87px] relative">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between box-border">
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 relative z-20 transition-transform duration-300 hover:scale-105 active:scale-95"
          onClick={closeMenu}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={149}
            height={62}
            className="w-auto h-10 sm:h-12 lg:h-[62px] object-contain"
            priority
          />
        </Link>

        {/* Main Navigation - Desktop only: sliding pill swap on hover */}
        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10" aria-label="Main navigation">
          <div
            ref={navContainerRef}
            className="relative flex items-center gap-0.5 px-1.5 py-1.5 bg-white border-2 border-[#F05137] rounded-full transition-shadow duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-md hover:shadow-[#F05137]/12"
          >
            {/* Sliding pill background - swaps to hovered or active item */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-[#F05137] z-0 pointer-events-none"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
                  className={`relative z-10 px-5 py-2.5 text-sm font-medium rounded-full select-none
                    transition-[color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isHighlighted ? 'text-white' : 'text-[#333333]'}
                    hover:no-underline active:scale-[0.98]`}
                  style={{ fontFamily: "'Helonik', sans-serif" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right: Desktop actions / Mobile hamburger */}
        <div className="flex items-center gap-3 sm:gap-4 z-20">
          {/* Desktop: Phone + Medical Emergency */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              type="button"
              className="w-10 h-10 bg-[#010043] rounded-full flex items-center justify-center text-white transition-[transform,box-shadow] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-lg hover:shadow-[#010043]/30 active:scale-[0.97]"
              aria-label="Call"
            >
              <Phone size={18} fill="currentColor" />
            </button>
            <button
              type="button"
              className="flex items-center gap-3 pl-1.5 pr-5 py-1.5 bg-white border-2 border-[#F05137] rounded-full text-[#F05137] transition-[background-color,color,transform,box-shadow] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#F05137] hover:text-white hover:shadow-lg hover:shadow-[#F05137]/25 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] group"
            >
              <div className="w-8 h-8 bg-[#F05137] rounded-full flex items-center justify-center text-white transition-[background-color,color,transform] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:rotate-12 group-hover:bg-white group-hover:text-[#F05137] shrink-0">
                <Phone size={14} fill="currentColor" />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-wide whitespace-nowrap"
                style={{ fontFamily: "'Helonik', sans-serif" }}
              >
                Medical Emergency
              </span>
            </button>
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
      <div
        className={`lg:hidden fixed inset-0 z-30 transition-[opacity,visibility] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop with blur */}
        <button
          type="button"
          className="absolute inset-0 bg-black/40 backdrop-blur-sm focus:outline-none transition-opacity duration-300"
          onClick={closeMenu}
          aria-label="Close menu"
        />

        {/* Slide panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-[300px] sm:max-w-[320px] bg-white flex flex-col shadow-2xl shadow-black/20 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header with accent bar */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100 bg-gray-50/80">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">Menu</span>
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm active:scale-95 transition-all duration-200 touch-manipulation"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
          <div className="h-0.5 w-full bg-[#F05137]" aria-hidden />

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex items-center rounded-xl px-4 py-3.5 text-[15px] font-medium select-none touch-manipulation
                        transition-[background-color,color,transform] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${isActive
                          ? 'bg-[#F05137] text-white shadow-sm shadow-[#F05137]/25'
                          : 'text-gray-700 hover:bg-[#F05137] hover:text-white active:scale-[0.98] active:bg-[#F05137]/90'
                      }`}
                      style={isActive ? { fontFamily: "'Helonik', sans-serif" } : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer CTAs */}
          <div className="p-4 sm:p-5 pt-4 pb-6 sm:pb-8 border-t border-gray-100 bg-gray-50/50 space-y-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-1 pb-1">Quick actions</p>
            <a
              href="tel:+911234567890"
              className="flex items-center justify-center gap-2.5 w-full h-12 bg-[#010043] text-white rounded-xl font-medium text-sm shadow-md shadow-[#010043]/20 hover:opacity-95 hover:shadow-lg hover:shadow-[#010043]/25 active:scale-[0.98] transition-[opacity,transform,box-shadow] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] touch-manipulation"
              onClick={closeMenu}
            >
              <Phone size={18} fill="currentColor" />
              Call Hospital
            </a>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 w-full h-12 border-2 border-[#F05137] text-[#F05137] rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-[#F05137] hover:text-white active:scale-[0.98] active:bg-[#F05137]/90 transition-[background-color,color,transform] duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] touch-manipulation"
              style={{ fontFamily: "'Helonik', sans-serif" }}
              onClick={closeMenu}
            >
              <Phone size={16} fill="currentColor" />
              Medical Emergency
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
