import React, { useState } from 'react';
import { Sparkles, ArrowRight, HelpCircle, ChevronDown, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pricing7 } from '../components/pricing-7';

const FAQS = [
  {
    q: 'What is included in every Webdora web development package?',
    a: 'Every package includes full source code ownership, mobile-first responsive architecture, baseline SEO schema markup, sub-second Core Web Vitals performance tuning, and direct developer communication throughout the project lifecycle.',
  },
  {
    q: 'How does the payment schedule work?',
    a: 'Our standard terms are 50% upon project kickoff and 50% upon final client sign-off and production deployment. Custom milestone schedules can also be arranged for enterprise or phased scopes.',
  },
  {
    q: 'Do you offer ongoing post-launch maintenance?',
    a: 'Yes. In addition to our 30-day post-launch warranty included with all packages, we offer monthly retainers for continuous feature engineering, telemetry monitoring, and search optimization.',
  },
  {
    q: 'Can we migrate our existing content and domain?',
    a: 'Absolutely. We handle domain DNS configuration, 301 redirect mapping, semantic URL restructuring, and content migration to ensure zero loss in existing search engine authority.',
  },
];

export function PricingPage({ onSelectPlan, onCtaClick }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="w-full bg-[#322214] text-[#FAFAF8] min-h-screen pt-24 sm:pt-28">
      {/* Page Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-[#636564]/30">
        <div className="max-w-[1360px] mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#93A3B1] mb-6">
            <Link to="/" className="hover:text-[#FAFAF8] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FAFAF8]">Pricing</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
              <Sparkles className="h-3.5 w-3.5 text-[#93A3B1]" />
              <span>Investment & Packages</span>
            </div>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAFAF8] leading-[1.1]">
              Predictable, Transparent Investment for Digital Flagships.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#D6CFC7] leading-relaxed">
              No hidden fees, no unnecessary vendor lock-in. Choose the architectural scope that matches your business phase, or consult with us for a custom requirement.
            </p>
          </div>
        </div>
      </section>

      {/* Main Pricing 7 Component */}
      <Pricing7 onSelectPlan={onSelectPlan} />

      {/* Frequently Asked Questions */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 bg-[#291b10] border-t border-[#636564]/30">
        <div className="max-w-[1360px] mx-auto">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
              <HelpCircle className="h-3.5 w-3.5 text-[#93A3B1]" />
              <span>Common Questions</span>
            </div>
            <h2 className="mt-4 font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFAF8]">
              Everything You Need to Know
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#D6CFC7] leading-relaxed">
              Clear answers regarding our deliverables, technical commitments, and client onboarding workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-[#636564]/50 bg-[#322214] p-6 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-start justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#FAFAF8]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#93A3B1] shrink-0 transition-transform duration-200 mt-0.5 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-4 text-sm text-[#D6CFC7] leading-relaxed border-t border-[#636564]/30 pt-4">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need a Custom Plan Box */}
          <div className="mt-16 rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-8 sm:p-12 text-[#322214] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7C898B] mb-2">
                <ShieldCheck className="h-4 w-4 text-[#93A3B1]" />
                <span>Custom Engineering Scopes</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#322214]">
                Require a specialized API integration or custom workflow?
              </h3>
              <p className="mt-2 text-sm text-[#4C443C] max-w-xl">
                We regularly build custom web platforms with bespoke auth, database structures, and third-party SaaS integrations.
              </p>
            </div>

            <button
              type="button"
              onClick={onCtaClick}
              className="cursor-pointer shrink-0 inline-flex items-center gap-2 rounded-xl bg-[#322214] px-6 py-3.5 text-sm font-semibold text-[#FAFAF8] hover:bg-[#4C443C] transition-all shadow-md"
            >
              <span>Request Custom Proposal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom of page content */}
    </div>
  );
}

export default PricingPage;
