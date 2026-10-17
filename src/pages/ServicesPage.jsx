import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Cpu, Code2, Layers, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServicesSection } from '../components/services-section';

export function ServicesPage({ onCtaClick }) {
  const processSteps = [
    {
      step: '01',
      title: 'Architectural Discovery',
      description: 'We audit your technical requirements, analyze target user personas, and establish strict performance and SEO benchmarks.',
      badge: 'Week 1',
    },
    {
      step: '02',
      title: 'System & Interface Design',
      description: 'Bespoke Figma component systems, interactive typography hierarchy, and fluid responsive behaviors aligned with your brand identity.',
      badge: 'Weeks 2–3',
    },
    {
      step: '03',
      title: 'Full-Stack Engineering',
      description: 'Modern React/Vite architecture, semantic HTML5, zero unnecessary runtime dependencies, and seamless API integrations.',
      badge: 'Weeks 3–5',
    },
    {
      step: '04',
      title: 'Telemetry, SEO & Launch',
      description: 'End-to-end Core Web Vitals auditing, structured JSON-LD schema implementation, and high-availability deployment.',
      badge: 'Week 6',
    },
  ];

  return (
    <div className="w-full bg-[#322214] text-[#FAFAF8] min-h-screen pt-24 sm:pt-28">
      {/* Page Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-[#636564]/30">
        <div className="max-w-[1360px] mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#93A3B1] mb-6">
            <Link to="/" className="hover:text-[#FAFAF8] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FAFAF8]">Services</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
              <Sparkles className="h-3.5 w-3.5 text-[#93A3B1]" />
              <span>Studio Capabilities & Technology</span>
            </div>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAFAF8] leading-[1.1]">
              High-Performance Engineering, Bespoke Interfaces & Search Visibility.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#D6CFC7] leading-relaxed">
              We engineer digital platforms where visual sophistication and mechanical speed reinforce one another. Every deliverable is custom-built to elevate your brand and drive verifiable business growth.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars and Telemetry Banner */}
      <ServicesSection showHeading={false} onCtaClick={onCtaClick} />

      {/* Engineering Methodology & Process Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 bg-[#291b10] border-t border-[#636564]/30">
        <div className="max-w-[1360px] mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
              <Cpu className="h-3.5 w-3.5 text-[#93A3B1]" />
              <span>Execution Lifecycle</span>
            </div>
            <h2 className="mt-4 font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#FAFAF8]">
              How Webdora Builds & Ships
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#D6CFC7] leading-relaxed">
              A transparent, agile workflow delivering production milestones without administrative overhead or technical surprises.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-[#636564]/50 bg-[#322214] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#93A3B1]">{step.step}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#4C443C] text-[#FAFAF8]">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-[#FAFAF8]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#D6CFC7] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Callout */}
          <div className="mt-16 rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-8 sm:p-12 text-[#322214] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-xl">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#322214]">
                Ready to review your technical requirements?
              </h3>
              <p className="mt-2 text-sm text-[#4C443C]">
                Speak directly with a lead developer to review your stack, timeline, and architectural requirements.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={onCtaClick}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#322214] px-6 py-3.5 text-sm font-semibold text-[#FAFAF8] hover:bg-[#4C443C] transition-all shadow-md"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-[#4C443C]/40 bg-white px-5 py-3.5 text-sm font-semibold text-[#322214] hover:bg-[#F0EEEA] transition-all"
              >
                <span>View Pricing Plans</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom of page content */}
    </div>
  );
}

export default ServicesPage;
