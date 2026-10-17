import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import webdoraLogo from '@/assets/webdora-logo.png';
import webdoraLogoDark from '@/assets/webdora-logo-dark.png';

const LEFT_NAV_ITEMS = [
  { id: 'overview', label: 'Overview', to: '/', note: 'Studio Flagship & Vision' },
  { id: 'services', label: 'Services', to: '/services', note: 'Engineering & SEO' },
  { id: 'work', label: 'Work', to: '/work', note: 'Selected Case Studies' },
];

const RIGHT_NAV_ITEMS = [
  { id: 'pricing', label: 'Pricing', to: '/pricing', note: 'Packages & Rates' },
  { id: 'inquiry', label: 'Inquiry', to: '/inquiry', note: 'Consultation & Scope' },
  { id: 'contact', label: 'Contact', to: '/contact', note: 'Connect With Studio' },
];

const ALL_NAV_ITEMS = [...LEFT_NAV_ITEMS, ...RIGHT_NAV_ITEMS];

export function Navbar13({ onCtaClick }) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);

  // Exact hero boundary detection using IntersectionObserver:
  // On homepage ('/'), observe #hero for transparent-to-light boundary transition.
  // On all other routes, default directly to the readable light state.
  useEffect(() => {
    if (location.pathname !== '/') {
      setIsPastHero(true);
      return;
    }

    const heroEl = document.getElementById('hero');
    if (!heroEl) {
      // If hero isn't found even on home route, fallback to light navbar
      setIsPastHero(false);
      return;
    }

    const checkHeroPosition = () => {
      const rect = heroEl.getBoundingClientRect();
      setIsPastHero(rect.bottom <= 70);
    };

    // Initial check
    checkHeroPosition();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPastHero(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '-70px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(heroEl);

    return () => observer.disconnect();
  }, [location.pathname]);

  // Keyboard navigation: Escape key closes mobile overlay menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile full-screen overlay is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Check if a nav item matches the current route
  const isItemActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
    >
      <header
        style={{
          background: isPastHero ? '#FAFAF8' : 'transparent',
          backgroundColor: isPastHero ? '#FAFAF8' : 'transparent',
        }}
        className={cn(
          "pointer-events-auto w-full transition-[background-color,border-color,box-shadow,color] duration-300 ease-out",
          isPastHero
            ? "border-b border-[#E5E7EB] shadow-[0_4px_24px_-4px_rgba(50,34,20,0.08)] text-[#322214]"
            : "border-b border-transparent shadow-none text-[#FAFAF8]"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Grid Layout: [Left Nav] [Centered Branding] [Right Nav + Action] */}
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
            
            {/* 1. Left Navigation Links (Desktop) */}
            <nav aria-label="Primary Left" className="hidden items-center gap-1 md:flex">
              {LEFT_NAV_ITEMS.map((item) => {
                const isActive = isItemActive(item.to);
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      "inline-flex h-9 items-center rounded-lg px-3 text-[13px] font-medium tracking-tight transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1]",
                      isPastHero
                        ? isActive
                          ? "bg-[#322214]/10 text-[#322214] font-semibold"
                          : "text-[#4C443C] hover:bg-[#322214]/5 hover:text-[#322214]"
                        : isActive
                          ? "bg-[#4C443C]/60 text-[#FAFAF8] font-semibold"
                          : "text-[#D6CFC7] hover:bg-white/10 hover:text-[#FAFAF8]"
                    )}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Hamburger Button (Left-aligned on mobile) */}
            <div className="flex items-center md:hidden justify-self-start">
              <button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1]",
                  isPastHero
                    ? "border-[#E5E7EB] bg-white text-[#322214] hover:bg-[#E5E7EB]"
                    : "border-[#636564]/50 bg-transparent text-[#FAFAF8] hover:bg-white/10"
                )}
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>

            {/* 2. Centered Prominent Branding (Wordmark + Logo Icon, +15-20% Larger) */}
            <Link
              to="/"
              className="justify-self-center inline-flex items-center rounded-lg py-1 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] transition-transform duration-150 hover:scale-[1.02]"
              aria-label="Webdora Home"
            >
              <div className="relative flex items-center justify-center h-9 sm:h-10">
                {/* State 1: Over Hero (White wordmark + Grey/Cool Steel mark) */}
                <img
                  src={webdoraLogo}
                  alt="Webdora"
                  className={cn(
                    "h-8 sm:h-9 md:h-9.5 w-auto max-w-[150px] sm:max-w-[175px] md:max-w-[195px] object-contain transition-opacity duration-300",
                    isPastHero ? "opacity-0 absolute inset-0 pointer-events-none" : "opacity-100 relative"
                  )}
                />

                {/* State 2: After Hero (Dark Coffee wordmark + Dark Coffee mark on light surface) */}
                <img
                  src={webdoraLogoDark}
                  alt="Webdora"
                  className={cn(
                    "h-8 sm:h-9 md:h-9.5 w-auto max-w-[150px] sm:max-w-[175px] md:max-w-[195px] object-contain transition-opacity duration-300",
                    isPastHero ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"
                  )}
                />
              </div>
            </Link>

            {/* 3. Right Navigation Links & Primary Action (Desktop + Mobile Action) */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 justify-self-end">
              <nav aria-label="Primary Right" className="hidden items-center gap-1 md:flex">
                {RIGHT_NAV_ITEMS.map((item) => {
                  const isActive = isItemActive(item.to);
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        "inline-flex h-9 items-center rounded-lg px-3 text-[13px] font-medium tracking-tight transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1]",
                        isPastHero
                          ? isActive
                            ? "bg-[#322214]/10 text-[#322214] font-semibold"
                            : "text-[#4C443C] hover:bg-[#322214]/5 hover:text-[#322214]"
                          : isActive
                            ? "bg-[#4C443C]/60 text-[#FAFAF8] font-semibold"
                            : "text-[#D6CFC7] hover:bg-white/10 hover:text-[#FAFAF8]"
                      )}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Primary Action Button: Start a Project */}
              <button
                type="button"
                onClick={onCtaClick}
                className={cn(
                  "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl px-3 sm:px-4 text-[12px] sm:text-[13px] font-semibold transition-[background-color,transform,box-shadow,color] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1]",
                  isPastHero
                    ? "bg-[#322214] text-[#FAFAF8] shadow-sm hover:bg-[#4C443C]"
                    : "bg-[#93A3B1] text-[#322214] shadow-[0_0_16px_rgba(147,163,177,0.3)] hover:bg-[#a5b4c1]"
                )}
              >
                <span className="hidden xs:inline">Start a Project</span>
                <span className="xs:hidden">Start</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Staggered Full-Screen / Overlay Navigation Menu (Navbar 13 Architecture) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
            }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto fixed inset-0 z-50 flex flex-col bg-[#322214] text-[#FAFAF8]"
          >
            {/* Overlay Header with Logo and Close Button */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#636564]/40 px-4 sm:px-6">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 py-1"
              >
                <img
                  src={webdoraLogo}
                  alt="Webdora"
                  className="h-8 w-auto max-w-[155px] object-contain"
                />
              </Link>

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#636564]/50 text-[#D6CFC7] hover:bg-[#4C443C] hover:text-[#FAFAF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Staggered Menu Items */}
            <nav
              aria-label="Site overlay"
              className="min-h-0 flex-1 overflow-y-auto px-4 py-8 sm:px-6 space-y-2"
            >
              <p className="px-3 text-[11px] font-mono tracking-widest uppercase text-[#7C898B]">
                Navigation Index
              </p>

              <div className="mt-3 space-y-1">
                {ALL_NAV_ITEMS.map((item, idx) => {
                  const isActive = isItemActive(item.to);
                  return (
                    <motion.div
                      key={item.id}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 12 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.28,
                        ease: [0.23, 1, 0.32, 1],
                        delay: shouldReduceMotion ? 0 : 0.04 + 0.04 * idx,
                      }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "group flex w-full items-baseline justify-between rounded-xl px-4 py-3.5 transition-colors",
                          isActive
                            ? "bg-[#4C443C] text-[#FAFAF8]"
                            : "text-[#D6CFC7] hover:bg-[#4C443C]/40 hover:text-[#FAFAF8]"
                        )}
                      >
                        <span className="font-serif text-2xl font-bold tracking-tight">
                          {item.label}
                        </span>
                        <span className="text-xs font-mono text-[#7C898B] group-hover:text-[#93A3B1]">
                          {item.note}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Consultation Action */}
              <div className="mt-8 pt-6 border-t border-[#636564]/30 px-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onCtaClick) onCtaClick();
                  }}
                  className="w-full inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#93A3B1] px-4 font-semibold text-[#322214] shadow-lg hover:bg-[#a5b4c1] active:scale-[0.98]"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar13;
