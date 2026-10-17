import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { socialLinks } from '@/data/socialLinks';
import { cn } from '@/lib/utils';
import webdoraLogo from '@/assets/webdora-logo.png';

// Authentic Feather/Lucide-compatible SVGs for social brands
function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function GithubIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer9({ onCtaClick }) {
  const currentYear = new Date().getFullYear();

  const connectItems = [
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      url: socialLinks.email ? `mailto:${socialLinks.email.trim()}` : null,
      isEmail: true,
      ariaLabel: socialLinks.email ? `Send email to ${socialLinks.email}` : 'Webdora Email',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: InstagramIcon,
      url: socialLinks.instagram && socialLinks.instagram.trim() ? socialLinks.instagram.trim() : null,
      isEmail: false,
      ariaLabel: 'Webdora on Instagram (opens in new tab)',
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: GithubIcon,
      url: socialLinks.github && socialLinks.github.trim() ? socialLinks.github.trim() : null,
      isEmail: false,
      ariaLabel: 'Webdora on GitHub (opens in new tab)',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: LinkedinIcon,
      url: socialLinks.linkedin && socialLinks.linkedin.trim() ? socialLinks.linkedin.trim() : null,
      isEmail: false,
      ariaLabel: 'Webdora on LinkedIn (opens in new tab)',
    },
  ];

  return (
    <footer className="relative w-full border-t border-[#636564]/30 bg-[#20150d] text-[#FAFAF8] overflow-hidden select-text">
      {/* Top Sitemap & Studio Details Section */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Brand & Studio Brief (Left Column: 4 cols) */}
          <div className="md:col-span-4 lg:col-span-4 space-y-5">
            <Link
              to="/"
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded-lg"
              aria-label="Webdora Home"
            >
              <img
                src={webdoraLogo}
                alt="Webdora"
                className="h-8 w-auto max-w-[155px] object-contain"
              />
            </Link>

            <p className="text-sm text-[#D6CFC7] leading-relaxed max-w-sm">
              Engineering precision, bespoke interface design, and high-performance digital platforms. Built to scale your business and elevate customer experience.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/60 bg-[#322214]/60 px-3 py-1 text-xs text-[#93A3B1] font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Select Engagements</span>
              </div>
            </div>
          </div>

          {/* Sitemap & Connect Columns (Right Columns: 8 cols) */}
          <div className="md:col-span-8 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
            
            {/* Column 1: Explore */}
            <div className="space-y-4">
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#7C898B]">
                Explore
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-[#D6CFC7] hover:text-[#FAFAF8] transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-[#D6CFC7] hover:text-[#FAFAF8] transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/work"
                    className="text-[#D6CFC7] hover:text-[#FAFAF8] transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-[#D6CFC7] hover:text-[#FAFAF8] transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-4">
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#7C898B]">
                Company
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/contact"
                    className="text-[#D6CFC7] hover:text-[#FAFAF8] transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inquiry"
                    className="text-[#D6CFC7] hover:text-[#FAFAF8] transition-colors inline-flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded"
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight className="h-3 w-3 text-[#93A3B1] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Connect With Us (Configurable Social & Contact Links) */}
            <div className="space-y-4">
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#7C898B]">
                Connect With Us
              </p>
              <ul className="space-y-2.5 text-sm">
                {connectItems.map((item) => {
                  const Icon = item.icon;
                  const isConfigured = Boolean(item.url);

                  return (
                    <li key={item.id}>
                      {isConfigured ? (
                        <a
                          href={item.url}
                          target={item.isEmail ? undefined : "_blank"}
                          rel={item.isEmail ? undefined : "noopener noreferrer"}
                          aria-label={item.ariaLabel}
                          className="group inline-flex items-center gap-2 text-[#D6CFC7] hover:text-[#FAFAF8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded py-0.5"
                        >
                          <span className="text-[#93A3B1] group-hover:text-[#FAFAF8] transition-colors">
                            <Icon className="h-4 w-4 shrink-0" />
                          </span>
                          <span>{item.label}</span>
                          {!item.isEmail && (
                            <ArrowUpRight className="h-3 w-3 text-[#7C898B] group-hover:text-[#FAFAF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          )}
                        </a>
                      ) : (
                        <div
                          className="inline-flex items-center gap-2 text-[#7C898B]/70 select-none cursor-default py-0.5"
                          title={`${item.label} link can be configured in src/data/socialLinks.js`}
                          aria-disabled="true"
                        >
                          <span className="text-[#7C898B]/60">
                            <Icon className="h-4 w-4 shrink-0" />
                          </span>
                          <span>{item.label}</span>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#322214] text-[#7C898B]/60 border border-[#636564]/30">
                            Pending
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="space-y-4">
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#7C898B]">
                Legal
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/terms"
                    className="text-[#D6CFC7] hover:text-[#FAFAF8] transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Giant Responsive WEBDORA Wordmark (Defining Footer 9 Specification) */}
      <div className="w-full overflow-hidden border-t border-[#636564]/20 py-4 sm:py-6 lg:py-8 select-none pointer-events-none">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <span
            className="w-full text-center font-serif font-black tracking-[-0.04em] sm:tracking-[-0.03em] leading-none uppercase text-[#FAFAF8]/[0.08] transition-colors duration-500"
            style={{
              fontSize: 'clamp(3.2rem, 13vw, 11rem)',
            }}
          >
            WEBDORA
          </span>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="relative z-10 border-t border-[#636564]/25 bg-[#1a110a] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D6CFC7]">
          <p className="text-center sm:text-left">
            &copy; {currentYear} Webdora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/terms"
              className="text-[#D6CFC7] hover:text-[#FAFAF8] transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer9;
