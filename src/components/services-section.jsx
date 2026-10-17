import React from 'react';
import { 
  Code2, 
  Globe2, 
  Layers, 
  Search, 
  Sparkles, 
  Zap, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function ServicesSection({ showHeading = true, id = "services", onCtaClick }) {
  return (
    <section id={id} className="relative z-10 bg-[#322214] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-[1360px] relative z-10">
        {/* Section Header: Webdora Brand First */}
        {showHeading && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
                <Sparkles className="h-3.5 w-3.5 text-[#93A3B1]" />
                <span>Webdora Digital Capabilities</span>
              </div>
              <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#FAFAF8] sm:text-4xl lg:text-5xl leading-tight">
                We Build Digital Experiences That Move Businesses Forward.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#D6CFC7] leading-relaxed">
              Webdora unites engineering precision, bespoke interface design, and deep technical optimization into a singular studio dedicated to your digital growth.
            </p>
          </div>
        )}

        {/* 4 Pillars Grid: Flagship Light Card + Refined Dark Cards */}
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Pillar 1: Web Development (Flagship Light Surface) */}
          <div className="group relative rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-7 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-[#E5E7EB] text-[#322214] shadow-xs">
                <Code2 className="h-5 w-5 text-[#93A3B1]" />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="block text-[11px] font-mono tracking-wider text-[#7C898B] uppercase">01 / Engineering</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#93A3B1]/20 text-[#322214] border border-[#93A3B1]/40">Flagship</span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-[#322214]">
                Web & App Development
              </h3>
              <p className="mt-3 text-sm text-[#4C443C] leading-relaxed">
                Bespoke, high-performance web applications and marketing flagships engineered with modern architectures that scale effortlessly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
              <span className="text-xs font-mono text-[#7C898B]">React &middot; Vite &middot; Next.js &middot; APIs</span>
            </div>
          </div>

          {/* Pillar 2: UI/UX & Brand Design */}
          <div className="group relative rounded-2xl border border-[#636564]/60 bg-[#4C443C]/25 p-7 transition-all duration-300 hover:border-[#7C898B]/50 hover:bg-[#4C443C]/40 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4C443C]/50 border border-[#636564]/60 text-[#7C898B]">
                <Layers className="h-5 w-5" />
              </div>
              <span className="mt-6 block text-[11px] font-mono tracking-wider text-[#D6CFC7] uppercase">02 / Design Systems</span>
              <h3 className="mt-2 text-xl font-bold text-[#FAFAF8] group-hover:text-[#7C898B] transition-colors">
                UI/UX & Brand Identity
              </h3>
              <p className="mt-3 text-sm text-[#D6CFC7] leading-relaxed">
                Distinctive digital interfaces combining restrained geometry, thoughtful hierarchy, and intuitive user experiences.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#636564]/30">
              <span className="text-xs font-mono text-[#7C898B]">Figma &middot; Design Tokens &middot; Motion</span>
            </div>
          </div>

          {/* Pillar 3: Technical SEO */}
          <div className="group relative rounded-2xl border border-[#636564]/60 bg-[#4C443C]/25 p-7 transition-all duration-300 hover:border-[#93A3B1]/50 hover:bg-[#4C443C]/40 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4C443C]/50 border border-[#636564]/60 text-[#93A3B1]">
                <Search className="h-5 w-5" />
              </div>
              <span className="mt-6 block text-[11px] font-mono tracking-wider text-[#D6CFC7] uppercase">03 / Strategic Search</span>
              <h3 className="mt-2 text-xl font-bold text-[#FAFAF8] group-hover:text-[#93A3B1] transition-colors">
                Technical SEO & Visibility
              </h3>
              <p className="mt-3 text-sm text-[#D6CFC7] leading-relaxed">
                Algorithmic indexing, semantic schema frameworks, and search engine optimization that position your brand at the top of customer queries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#636564]/30">
              <span className="text-xs font-mono text-[#7C898B]">JSON-LD &middot; Schema &middot; Crawl Budget</span>
            </div>
          </div>

          {/* Pillar 4: Performance & Core Web Vitals */}
          <div className="group relative rounded-2xl border border-[#636564]/60 bg-[#4C443C]/25 p-7 transition-all duration-300 hover:border-[#7C898B]/50 hover:bg-[#4C443C]/40 hover:-translate-y-1 flex flex-col justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4C443C]/50 border border-[#636564]/60 text-[#7C898B]">
                <Zap className="h-5 w-5" />
              </div>
              <span className="mt-6 block text-[11px] font-mono tracking-wider text-[#D6CFC7] uppercase">04 / Performance</span>
              <h3 className="mt-2 text-xl font-bold text-[#FAFAF8] group-hover:text-[#7C898B] transition-colors">
                Speed & Core Web Vitals
              </h3>
              <p className="mt-3 text-sm text-[#D6CFC7] leading-relaxed">
                Rigorous elimination of render bottlenecks, asset bloat, and runtime friction to achieve sub-second speeds and flawless Lighthouse ratings.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#636564]/30">
              <span className="text-xs font-mono text-[#7C898B]">LCP &lt; 0.8s &middot; Zero CLS &middot; 100 INP</span>
            </div>
          </div>
        </div>

        {/* Studio Diagnostic Telemetry Banner (Contrasting Light Panel) */}
        <div className="mt-12 rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-6 sm:p-8 shadow-xl text-[#322214]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#4C443C] shadow-xs">
                <Globe2 className="h-3.5 w-3.5 text-[#93A3B1]" />
                <span>Verified Production Standards</span>
              </div>
              <h3 className="mt-3 font-serif text-xl sm:text-2xl font-bold text-[#322214]">
                Engineered for sub-second speeds, flawless indexing, and responsive resilience.
              </h3>
              <p className="mt-2 text-sm text-[#4C443C] leading-relaxed">
                Every web platform we produce is audited against strict Core Web Vitals benchmarks, modern schema structures, and responsive ergonomics across all device viewports.
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs">
                <div className="text-xl font-mono font-bold text-[#322214]">0.68s</div>
                <div className="text-[10px] text-[#7C898B] uppercase tracking-wider mt-1">LCP Speed</div>
              </div>
              <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs">
                <div className="text-xl font-mono font-bold text-[#7C898B]">0.002</div>
                <div className="text-[10px] text-[#7C898B] uppercase tracking-wider mt-1">Zero Shift</div>
              </div>
              <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs">
                <div className="text-xl font-mono font-bold text-[#93A3B1]">100%</div>
                <div className="text-[10px] text-[#7C898B] uppercase tracking-wider mt-1">Accessible</div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Action Prompt if onCtaClick is provided */}
        {onCtaClick && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 rounded-xl bg-[#93A3B1] px-6 py-3 text-sm font-bold text-[#322214] shadow-md hover:bg-[#a5b4c1] transition-all cursor-pointer"
            >
              <span>Consult on Your Technical Scope</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServicesSection;
