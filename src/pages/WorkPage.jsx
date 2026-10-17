import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Showcase7 } from '../components/showcase-7';
import { projectsData } from '../data/projectsData';

export function WorkPage({ onCtaClick }) {
  return (
    <div className="w-full bg-[#322214] text-[#FAFAF8] min-h-screen pt-24 sm:pt-28">
      {/* Page Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-[#636564]/30">
        <div className="max-w-[1360px] mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#93A3B1] mb-6">
            <Link to="/" className="hover:text-[#FAFAF8] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#FAFAF8]">Work</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
                <Sparkles className="h-3.5 w-3.5 text-[#93A3B1]" />
                <span>Production Portfolio & Case Studies</span>
              </div>
              <h1 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAFAF8] leading-[1.1]">
                Selected Client Engagements & Digital Platforms.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-[#D6CFC7] leading-relaxed">
                Explore our recent digital flagships, web applications, and high-conversion client platforms. Each solution is built to exacting performance, accessibility, and architectural standards.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className="p-4 rounded-xl border border-[#636564]/50 bg-[#291b10] text-center">
                <span className="font-mono text-2xl font-bold text-[#FAFAF8]">07</span>
                <p className="text-[11px] font-mono text-[#93A3B1] uppercase mt-1">Live Platforms</p>
              </div>
              <div className="p-4 rounded-xl border border-[#636564]/50 bg-[#291b10] text-center">
                <span className="font-mono text-2xl font-bold text-[#93A3B1]">100%</span>
                <p className="text-[11px] font-mono text-[#93A3B1] uppercase mt-1">Core Vitals</p>
              </div>
              <div className="p-4 rounded-xl border border-[#636564]/50 bg-[#291b10] text-center col-span-2 sm:col-span-1">
                <span className="font-mono text-2xl font-bold text-[#D6CFC7]">0.68s</span>
                <p className="text-[11px] font-mono text-[#93A3B1] uppercase mt-1">Avg Load Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Showcase 7 Component with Sticky Preview Panel */}
      <Showcase7 projects={projectsData} onCtaClick={onCtaClick} showViewAllLink={false} />

      {/* Quality Benchmark Panel */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 bg-[#291b10] border-t border-[#636564]/30">
        <div className="max-w-[1360px] mx-auto">
          <div className="rounded-2xl border border-[#636564]/60 bg-[#322214] p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#93A3B1] mb-2">
                  <Globe2 className="h-4 w-4" />
                  <span>Production Delivery Standards</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAFAF8]">
                  Have a challenging product scope?
                </h3>
                <p className="mt-3 text-sm text-[#D6CFC7] leading-relaxed">
                  Whether you need an architectural overhaul of an existing web application or an end-to-end design and build from scratch, Webdora delivers measured results.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#93A3B1] px-6 py-3.5 text-sm font-bold text-[#322214] hover:bg-[#a6b5c2] transition-all shadow-md"
                >
                  <span>Start a Project Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#636564]/60 bg-[#4C443C]/40 px-5 py-3.5 text-sm font-semibold text-[#FAFAF8] hover:bg-[#4C443C] transition-all"
                >
                  <span>View Package Pricing</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom of page content */}
    </div>
  );
}

export default WorkPage;
