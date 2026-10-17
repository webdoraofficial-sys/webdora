import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

// Authentic Tech Logo Icons
function Html5Icon() {
  return (
    <svg viewBox="0 0 512 512" className="h-10 w-10 shrink-0" aria-label="HTML5">
      <path fill="#E34F26" d="M71 460L30 0h452l-41 460-185 52z" />
      <path fill="#EF652A" d="M256 472l149-41 35-391H256v432z" />
      <path fill="#ECECEC" d="M256 176h-80l-6-64h86V48H104l16 192h136v-64zm0 136h-76l-5-56h-64l10 112 135 37.5V312z" />
      <path fill="#FFF" d="M256 176v64h75l-7 78-68 18.5V401l122-34 17-191H256zm0-128v64h138l5-64H256z" />
    </svg>
  );
}

function Css3Icon() {
  return (
    <svg viewBox="0 0 512 512" className="h-10 w-10 shrink-0" aria-label="CSS3">
      <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52z" />
      <path fill="#33A9DC" d="M256 472l149-41 35-391H256v432z" />
      <path fill="#ECECEC" d="M256 176h-80l-6-64h86V48H104l16 192h136v-64zm0 136h-76l-5-56h-64l10 112 135 37.5V312z" />
      <path fill="#FFF" d="M256 176v64h75l-7 78-68 18.5V401l122-34 17-191H256zm0-128v64h138l5-64H256z" />
    </svg>
  );
}

function JavaScriptIcon() {
  return (
    <svg viewBox="0 0 512 512" className="h-10 w-10 rounded-lg shrink-0" aria-label="JavaScript">
      <path fill="#F7DF1E" d="M0 0h512v512H0z" />
      <path d="M274 388c5 9 13 16 26 16 14 0 22-7 22-26V238h45v139c0 44-25 64-64 64-34 0-54-18-64-40zm128-4c8 14 22 25 46 25 20 0 33-10 33-24 0-17-14-23-38-34l-13-6c-38-16-63-36-63-79 0-39 30-69 77-69 34 0 58 12 73 38l-35 23c-7-12-17-18-38-18-18 0-29 9-29 22 0 15 11 21 34 31l13 6c44 19 68 38 68 83 0 47-37 72-83 72-47 0-77-23-89-54z" />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="-11.5 -10.232 23 20.463" className="h-10 w-10 shrink-0" aria-label="React">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function WebdoraBrandIcon() {
  return (
    <div className="flex items-center justify-center h-full w-full p-2">
      <img
        src="/images/webdora-logo.png"
        alt="Webdora"
        className="h-6 w-auto max-w-[85px] object-contain"
      />
    </div>
  );
}

// 4 Columns of Marquee Tiles with Technology and Webdora Assets
const MARQUEE_COLUMN_1 = [
  { id: 'c1-1', label: 'React', shape: 'circle', component: <ReactIcon /> },
  { id: 'c1-2', label: 'Webdora', shape: 'square', component: <WebdoraBrandIcon /> },
  { id: 'c1-3', label: 'JavaScript', shape: 'square', component: <JavaScriptIcon /> },
  { id: 'c1-4', label: 'HTML5', shape: 'circle', component: <Html5Icon /> },
  { id: 'c1-5', label: 'CSS3', shape: 'square', component: <Css3Icon /> },
];

const MARQUEE_COLUMN_2 = [
  { id: 'c2-1', label: 'HTML5', shape: 'square', component: <Html5Icon /> },
  { id: 'c2-2', label: 'CSS3', shape: 'circle', component: <Css3Icon /> },
  { id: 'c2-3', label: 'Webdora', shape: 'circle', component: <WebdoraBrandIcon /> },
  { id: 'c2-4', label: 'React', shape: 'square', component: <ReactIcon /> },
  { id: 'c2-5', label: 'JavaScript', shape: 'circle', component: <JavaScriptIcon /> },
];

const MARQUEE_COLUMN_3 = [
  { id: 'c3-1', label: 'JavaScript', shape: 'circle', component: <JavaScriptIcon /> },
  { id: 'c3-2', label: 'React', shape: 'square', component: <ReactIcon /> },
  { id: 'c3-3', label: 'CSS3', shape: 'circle', component: <Css3Icon /> },
  { id: 'c3-4', label: 'Webdora', shape: 'square', component: <WebdoraBrandIcon /> },
  { id: 'c3-5', label: 'HTML5', shape: 'circle', component: <Html5Icon /> },
];

const MARQUEE_COLUMN_4 = [
  { id: 'c4-1', label: 'Webdora', shape: 'square', component: <WebdoraBrandIcon /> },
  { id: 'c4-2', label: 'HTML5', shape: 'circle', component: <Html5Icon /> },
  { id: 'c4-3', label: 'JavaScript', shape: 'circle', component: <JavaScriptIcon /> },
  { id: 'c4-4', label: 'CSS3', shape: 'square', component: <Css3Icon /> },
  { id: 'c4-5', label: 'React', shape: 'circle', component: <ReactIcon /> },
];

// Single Vertical Scrolling Column
function MarqueeColumn({ items, duration = 24, reverse = false }) {
  const shouldReduceMotion = useReducedMotion();
  // Duplicate for seamless loop
  const duplicatedItems = [...items, ...items];
  const itemHeight = 124; // 100px tile + 24px gap
  const totalTravel = itemHeight * items.length;

  if (shouldReduceMotion) {
    return (
      <div className="relative h-full overflow-hidden flex flex-col gap-6">
        {items.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className={cn(
              "w-24 h-24 shrink-0 overflow-hidden flex items-center justify-center border border-[#E5E7EB] bg-white shadow-sm transition-all",
              item.shape === 'circle' ? "rounded-full" : "rounded-2xl"
            )}
          >
            {item.component}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="flex flex-col gap-6"
        animate={{
          y: reverse ? [0, -totalTravel] : [-totalTravel, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className={cn(
              "w-24 h-24 shrink-0 overflow-hidden flex items-center justify-center border border-[#E5E7EB] bg-white hover:border-[#93A3B1] transition-all shadow-sm hover:shadow-md",
              item.shape === 'circle' ? "rounded-full" : "rounded-2xl"
            )}
          >
            {item.component}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Waitlist1() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceInterest: 'standard-web',
    agreed: false,
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Field validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus('error');
      setErrorMessage('Please provide your full name.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    if (!formData.agreed) {
      setStatus('error');
      setErrorMessage('Please confirm agreement to project consultation.');
      return;
    }

    setStatus('loading');

    // Simulate honest frontend submission
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      serviceInterest: 'standard-web',
      agreed: false,
    });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section
      id="inquiry"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-t border-[#E5E7EB] overflow-hidden"
    >

      <div className="relative z-10 max-w-[1360px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#4C443C] shadow-xs w-fit mb-4">
              <Sparkles className="h-3.5 w-3.5 text-[#93A3B1]" />
              <span>Project Inquiries & Consultation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#322214] leading-tight">
              Start Your Next Web Project With Webdora.
            </h2>

            <p className="mt-4 text-base text-[#4C443C] leading-relaxed max-w-xl">
              Tell us about your brand and digital goals. We will analyze your scope, assess requirements, and outline a tailored technical roadmap within 24 hours.
            </p>

            {/* Inquiry Form Card */}
            <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-[0_12px_40px_rgba(50,34,20,0.06)]">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success-state"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="py-6 text-center space-y-4"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#322214]">
                      Inquiry Received
                    </h3>

                    <p className="text-sm text-[#4C443C] max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-[#322214] font-semibold">{formData.name}</span>! We have logged your inquiry for <span className="text-[#322214] font-semibold">{formData.email}</span>. A Webdora engineer will review your scope and follow up shortly.
                    </p>

                    {/* Honest Frontend Demo State Disclosure */}
                    <div className="mt-4 p-4 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] text-left max-w-md mx-auto">
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="h-4 w-4 text-[#93A3B1] shrink-0 mt-0.5" />
                        <div className="text-[11px] text-[#4C443C] leading-relaxed">
                          <strong className="text-[#322214]">Frontend Demo State:</strong> Form validation and state workflows are verified. To connect real automated email delivery, integrate your chosen email service provider (e.g. Resend, SendGrid, or custom backend API route).
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#4C443C] px-5 py-2.5 text-xs font-semibold text-[#FAFAF8] hover:bg-[#636564] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1]"
                      >
                        <span>Submit Another Inquiry</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    key="inquiry-form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                    aria-label="Webdora Project Inquiry Form"
                  >
                    {/* Error Banner */}
                    {status === 'error' && errorMessage && (
                      <div
                        role="alert"
                        className="flex items-center gap-2.5 p-3 rounded-xl border border-red-500/30 bg-red-50 text-red-700 text-xs"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Full Name Input */}
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#4C443C] mb-2"
                      >
                        Full Name <span className="text-[#93A3B1]">*</span>
                      </label>
                      <input
                        type="text"
                        id="inquiry-name"
                        name="name"
                        required
                        aria-required="true"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        autoComplete="name"
                        disabled={status === 'loading'}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] text-[#322214] placeholder-[#7C898B] text-sm focus:border-[#93A3B1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#93A3B1] transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="inquiry-email"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#4C443C] mb-2"
                      >
                        Work Email <span className="text-[#93A3B1]">*</span>
                      </label>
                      <input
                        type="email"
                        id="inquiry-email"
                        name="email"
                        required
                        aria-required="true"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        autoComplete="email"
                        disabled={status === 'loading'}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] text-[#322214] placeholder-[#7C898B] text-sm focus:border-[#93A3B1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#93A3B1] transition-colors disabled:opacity-50"
                      />
                    </div>

                    {/* Package / Service Interest */}
                    <div>
                      <label
                        htmlFor="inquiry-service"
                        className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#4C443C] mb-2"
                      >
                        Primary Package or Service Interest
                      </label>
                      <select
                        id="inquiry-service"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        disabled={status === 'loading'}
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] text-[#322214] text-sm focus:border-[#93A3B1] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#93A3B1] transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <option value="basic-web">Basic — Simple Showcase Website</option>
                        <option value="standard-web">Standard — Enhanced Website (Recommended)</option>
                        <option value="premium-web">Premium — Full Website Solution (Backend & Auth)</option>
                        <option value="ui-design">Bespoke UI/UX & Brand Design</option>
                        <option value="seo-speed">Technical SEO & Speed Optimization Audit</option>
                      </select>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-3 pt-1">
                      <div className="relative flex items-center justify-center pt-0.5">
                        <input
                          type="checkbox"
                          id="inquiry-agree"
                          name="agreed"
                          required
                          aria-required="true"
                          checked={formData.agreed}
                          onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                          disabled={status === 'loading'}
                          className="h-4 w-4 rounded border-[#E5E7EB] bg-white text-[#93A3B1] focus:ring-[#93A3B1] focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                        />
                      </div>
                      <label htmlFor="inquiry-agree" className="text-xs text-[#4C443C] leading-relaxed cursor-pointer">
                        I agree to receive a tailored project consultation and scope analysis from the Webdora team.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3.5 px-6 rounded-xl text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-200 bg-[#93A3B1] text-[#322214] hover:bg-[#8292a0] shadow-[0_4px_16px_rgba(147,163,177,0.3)] hover:shadow-[0_6px_24px_rgba(147,163,177,0.45)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {status === 'loading' ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#322214] border-t-transparent" />
                            <span>Sending Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5" />
                            <span>Send Project Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Authentic 4-Column Vertical Marquee with Fade Masks */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Desktop / Tablet Vertical Infinite Marquee */}
            <div className="hidden md:flex relative h-[560px] w-full gap-4 items-center justify-center overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F4F4F1] p-4 shadow-inner">
              {/* Top & Bottom Gradient Fade Masks */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAFAF8] via-[#FAFAF8]/90 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/90 to-transparent pointer-events-none z-10" />

              {/* 4 Scrolling Columns */}
              <MarqueeColumn items={MARQUEE_COLUMN_1} duration={26} reverse={false} />
              <MarqueeColumn items={MARQUEE_COLUMN_2} duration={22} reverse={true} />
              <MarqueeColumn items={MARQUEE_COLUMN_3} duration={28} reverse={false} />
              <MarqueeColumn items={MARQUEE_COLUMN_4} duration={24} reverse={true} />
            </div>

            {/* Mobile Fallback: Responsive Technology Strip */}
            <div className="flex md:hidden flex-col items-center w-full rounded-2xl border border-[#E5E7EB] bg-[#F4F4F1] p-5 text-center">
              <span className="text-[11px] font-mono uppercase text-[#4C443C] tracking-wider mb-4">
                Powered by Modern Web Technologies
              </span>
              <div className="grid grid-cols-4 gap-3 w-full">
                <div className="p-3 rounded-xl border border-[#E5E7EB] bg-white shadow-xs flex items-center justify-center">
                  <Html5Icon />
                </div>
                <div className="p-3 rounded-xl border border-[#E5E7EB] bg-white shadow-xs flex items-center justify-center">
                  <Css3Icon />
                </div>
                <div className="p-3 rounded-xl border border-[#E5E7EB] bg-white shadow-xs flex items-center justify-center">
                  <JavaScriptIcon />
                </div>
                <div className="p-3 rounded-xl border border-[#E5E7EB] bg-white shadow-xs flex items-center justify-center">
                  <ReactIcon />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E5E7EB] w-full flex items-center justify-center gap-2">
                <span className="text-xs text-[#7C898B]">Official studio branding:</span>
                <img
                  src="/images/webdora-logo.png"
                  alt="Webdora"
                  className="h-5 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Waitlist1;
