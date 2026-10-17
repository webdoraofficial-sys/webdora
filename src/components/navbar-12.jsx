import React, { useState, useEffect, useRef, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import webdoraLogo from '@/assets/webdora-logo.png';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', href: '#' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'inquiry', label: 'Inquiry', href: '#inquiry' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export function Navbar12({ onCtaClick }) {
  const shouldReduceMotion = useReducedMotion();
  const navId = useId();
  const [activeItem, setActiveItem] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);

  // Floating navbar lift on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
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

  const springTransition = {
    type: 'spring',
    bounce: 0,
    duration: 0.35,
  };

  const easeInOutCubic = [0.23, 1, 0.32, 1];

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4 pointer-events-none"
    >
      <header
        style={{ background: 'transparent', backgroundColor: 'transparent' }}
        className="pointer-events-auto flex h-14 w-full max-w-[840px] items-center justify-between gap-3 px-3 sm:px-4 bg-transparent border-0 shadow-none transition-none"
      >
        {/* Official Webdora Transparent Logo - Direct presentation without background box */}
        <a
          href="#"
          className="inline-flex shrink-0 items-center rounded-lg py-1 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1]"
          aria-label="Webdora Home"
        >
          <img
            src={webdoraLogo}
            alt="Webdora"
            className="h-7 sm:h-8 w-auto max-w-[130px] sm:max-w-[155px] object-contain transition-opacity duration-150 hover:opacity-90"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveItem(item.id)}
                className={cn(
                  "relative inline-flex h-8 items-center rounded-lg px-3 text-[13px] font-medium tracking-tight transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1]",
                  isActive
                    ? "text-[#FAFAF8]"
                    : "text-[#D6CFC7] hover:text-[#FAFAF8]"
                )}
              >
                {isActive && (
                  <motion.span
                    aria-hidden="true"
                    layoutId={`${navId}-pill`}
                    transition={shouldReduceMotion ? { duration: 0 } : springTransition}
                    className="absolute inset-0 rounded-lg bg-[#4C443C] border border-[#636564]/70 shadow-inner"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Primary Action: Start a Project */}
          <button
            type="button"
            onClick={onCtaClick}
            className="hidden sm:inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl bg-[#93A3B1] px-4 text-[13px] font-semibold text-[#322214] shadow-[0_0_16px_rgba(147,163,177,0.3)] transition-[background-color,transform,box-shadow] duration-150 ease-out hover:bg-[#a5b4c1] hover:shadow-[0_0_24px_rgba(147,163,177,0.5)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#322214]"
          >
            <span>Start a Project</span>
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#636564]/50 bg-transparent text-[#D6CFC7] hover:bg-[#4C443C]/50 hover:text-[#FAFAF8] sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1]"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              aria-hidden="true"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.16, ease: easeInOutCubic } }}
              transition={{ duration: 0.24, ease: easeInOutCubic }}
              className="pointer-events-auto fixed inset-0 z-50 bg-black/75 backdrop-blur-md sm:hidden"
            />

            {/* Drawer Sheet */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0, transition: { duration: 0.14 } }
                  : { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.16, ease: easeInOutCubic } }
              }
              transition={{ duration: 0.26, ease: easeInOutCubic }}
              className="pointer-events-auto fixed inset-x-3 top-3 z-50 origin-top rounded-2xl border border-[#636564] bg-[#322214] p-4 shadow-2xl sm:hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#636564]/50">
                <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex py-1 px-1">
                  <img
                    src={webdoraLogo}
                    alt="Webdora"
                    className="h-7 w-auto max-w-[130px] object-contain"
                  />
                </a>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#D6CFC7] hover:bg-[#4C443C] hover:text-[#FAFAF8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav aria-label="Mobile Navigation" className="mt-3 flex flex-col space-y-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setActiveItem(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex h-11 items-center rounded-xl px-3 text-sm font-medium transition-colors",
                      activeItem === item.id
                        ? "bg-[#4C443C] text-[#FAFAF8] font-semibold"
                        : "text-[#D6CFC7] hover:bg-[#4C443C]/40 hover:text-[#FAFAF8]"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 pt-3 border-t border-[#636564]/50">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onCtaClick) onCtaClick();
                  }}
                  className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#93A3B1] px-4 text-sm font-semibold text-[#322214] shadow-[0_0_16px_rgba(147,163,177,0.3)] hover:bg-[#a5b4c1] active:scale-[0.98]"
                >
                  <span>Start a Project</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar12;
