import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Minus, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { PRICING_CONFIG } from '../config/pricing-data';
import { cn } from '@/lib/utils';

// Feature Comparison Value Cell
function ComparisonValue({ value }) {
  if (value === true) {
    return (
      <span className="grid place-items-center h-5 w-5 mx-auto rounded-full bg-[#93A3B1] text-[#322214]">
        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="grid place-items-center h-5 w-5 mx-auto rounded-full bg-[#4C443C] text-[#7C898B]">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }
  return (
    <span className="text-xs sm:text-sm font-medium text-[#F7F5F0]">
      {value}
    </span>
  );
}

export function Pricing7({ onSelectPlan }) {
  const [deliveryMode, setDeliveryMode] = useState('standard');
  const { plans, featureGroups, toggleOptions, disclaimer } = PRICING_CONFIG;

  return (
    <section id="pricing" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#322214] overflow-hidden">

      <div className="relative z-10 max-w-[1360px] mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
            <Sparkles className="h-3.5 w-3.5 text-[#93A3B1]" />
            <span>Website Development Packages</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#FAFAF8] sm:text-4xl lg:text-5xl">
            Transparent Website Architecture & Solutions
          </h2>
          <p className="mt-4 text-base text-[#D6CFC7] leading-relaxed">
            Select the development scope tailored to your digital goals. From essential business showcases to custom full-stack web platforms with backend workflows.
          </p>
        </div>

        {/* Top 4-Column Grid: Delivery Mode Selector + 3 Plans (Basic → Standard → Premium) */}
        <div className="grid grid-cols-1 md:grid-cols-4 border border-[#636564] rounded-2xl overflow-hidden bg-[#322214] shadow-2xl">
          {/* Column 1: Package Scope / Delivery Selector */}
          <div className="p-6 sm:p-7 border-b md:border-b-0 md:border-r border-[#636564] flex flex-col justify-between bg-[#291b10]">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#93A3B1] mb-3">
                Scope & Delivery Mode
              </p>
              <p className="text-xs text-[#D6CFC7] mb-5 leading-relaxed">
                Choose between standard one-time project delivery or ongoing post-launch technical care.
              </p>
              <div className="space-y-3">
                {toggleOptions.map((opt) => {
                  const isSelected = deliveryMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDeliveryMode(opt.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#322214]",
                        isSelected
                          ? "border-[#93A3B1] bg-[#4C443C] shadow-[0_0_12px_rgba(147,163,177,0.2)]"
                          : "border-[#636564] bg-[#322214]/60 hover:border-white/20 text-[#D6CFC7]"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "h-3 w-3 rounded-full border transition-all",
                            isSelected
                              ? "border-[#93A3B1] bg-[#93A3B1] ring-2 ring-offset-1 ring-[#93A3B1] ring-offset-[#322214]"
                              : "border-[#7C898B]"
                          )}
                        />
                        <span className={cn("text-xs font-bold", isSelected ? "text-[#FAFAF8]" : "text-[#D6CFC7]")}>
                          {opt.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#93A3B1] pl-5 leading-tight">
                        {opt.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#636564]/50">
              <div className="flex items-start gap-2 text-[11px] text-[#D6CFC7] leading-relaxed">
                <HelpCircle className="h-4 w-4 text-[#7C898B] shrink-0 mt-0.5" />
                <span>One-time custom delivery packages. All prices are scoped in Indian Rupees (₹).</span>
              </div>
            </div>
          </div>

          {/* Columns 2, 3, 4: Plans in exact order (Basic → Standard → Premium) */}
          {plans.map((plan, idx) => {
            const isStandard = plan.id === 'standard';
            const isPremium = plan.id === 'premium';
            const isBasic = plan.id === 'basic';
            const priceDisplay = plan.prices[deliveryMode];

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * idx }}
                className={cn(
                  "p-6 sm:p-7 flex flex-col gap-4 border-b md:border-b-0 relative overflow-hidden",
                  idx < plans.length - 1 && "md:border-r border-[#636564]",
                  isStandard && "bg-[#4C443C]/40 md:shadow-inner border-y md:border-y-0 border-[#93A3B1]/40",
                  isPremium && "bg-[#2f1f13]/80",
                  isBasic && "bg-[#291b10]/80"
                )}
              >
                {/* Restrained Fluid Blob Decorative Accent */}
                {isStandard && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-10 z-0 overflow-hidden opacity-20"
                  >
                    <div
                      className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full blur-3xl motion-safe:animate-pulse"
                      style={{
                        background: 'radial-gradient(circle, rgba(147, 163, 177, 0.3) 0%, rgba(124, 137, 139, 0.2) 45%, transparent 70%)',
                      }}
                    />
                  </div>
                )}
                {/* Plan Badge / Status */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold tracking-tight text-[#FAFAF8]">
                      {plan.name}
                    </p>
                    {plan.badge && (
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase",
                          isStandard
                            ? "bg-[#93A3B1] text-[#322214]"
                            : isPremium
                            ? "border border-[#7C898B] bg-[#7C898B]/20 text-[#FAFAF8]"
                            : "border border-[#636564] bg-[#4C443C]/40 text-[#D6CFC7]"
                        )}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#D6CFC7] leading-relaxed min-h-[36px]">
                  {plan.tagline}
                </p>

                {/* Price Display (Configurable INR placeholders) */}
                <div className="mt-2 py-2 border-y border-[#636564]/40">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FAFAF8]">
                      {priceDisplay}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#93A3B1] tracking-wider uppercase block mt-1">
                    {plan.units ? plan.units[deliveryMode] : plan.unit}
                  </span>
                </div>

                {/* Key Highlights */}
                <div className="mt-2">
                  <span className="text-[11px] font-semibold tracking-wider text-[#D6CFC7] uppercase block mb-3">
                    Package Scope Includes:
                  </span>
                  <ul className="space-y-2.5">
                    {plan.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-[#FAFAF8] leading-relaxed">
                        <Check
                          className={cn(
                            "h-3.5 w-3.5 mt-0.5 shrink-0",
                            isStandard ? "text-[#93A3B1]" : isPremium ? "text-[#7C898B]" : "text-[#D6CFC7]"
                          )}
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Actions */}
                <div className="mt-auto pt-6">
                  {isBasic && (
                    /* Strict requirement: No Connect/Contact CTA button on Basic */
                    <div className="py-2.5 px-3 rounded-xl border border-[#636564]/40 bg-[#4C443C]/20 text-center">
                      <span className="text-[11px] font-medium text-[#D6CFC7] block">
                        Simple showcase website specification
                      </span>
                    </div>
                  )}

                  {isStandard && (
                    <button
                      type="button"
                      onClick={() => onSelectPlan && onSelectPlan('standard')}
                      className="w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-200 bg-[#93A3B1] text-[#322214] hover:bg-[#a6b5c2] shadow-[0_0_16px_rgba(147,163,177,0.3)] hover:shadow-[0_0_24px_rgba(147,163,177,0.5)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#322214] flex items-center justify-center gap-2"
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {isPremium && (
                    <button
                      type="button"
                      onClick={() => onSelectPlan && onSelectPlan('premium')}
                      className="w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-200 border border-[#93A3B1] bg-[#4C443C] text-[#FAFAF8] hover:bg-[#7C898B]/30 shadow-[0_0_16px_rgba(147,163,177,0.2)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#322214] flex items-center justify-center gap-2"
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#93A3B1]" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Feature Comparison Table */}
        <div className="mt-6 border border-[#636564] rounded-2xl overflow-hidden bg-[#322214] shadow-xl">
          <div className="p-4 sm:p-5 bg-[#291b10] border-b border-[#636564] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#FAFAF8]">
                Detailed Feature & Capability Comparison
              </h3>
              <p className="text-xs text-[#D6CFC7]">
                Progressive comparison across Basic, Standard, and Premium web solutions.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#93A3B1] uppercase">
              Basic → Standard → Premium
            </span>
          </div>

          {/* Table Container with Horizontal Scroll Safety for Mobile */}
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Table Column Headers */}
              <div className="grid grid-cols-4 bg-[#26190f] border-b border-[#636564] text-xs font-bold uppercase tracking-wider">
                <div className="p-4 sm:px-6 text-[#D6CFC7] flex items-center border-r border-[#636564]/50">
                  Features & Capabilities
                </div>
                <div className="p-4 text-center flex items-center justify-center border-r border-[#636564]/50 text-[#D6CFC7]">
                  Basic
                </div>
                <div className="p-4 text-center text-[#93A3B1] bg-[#93A3B1]/5 flex items-center justify-center border-r border-[#636564]/50">
                  Standard
                </div>
                <div className="p-4 text-center text-[#FAFAF8] bg-[#4C443C]/20 flex items-center justify-center">
                  Premium
                </div>
              </div>

              {featureGroups.map((group, gIdx) => (
                <div key={gIdx}>
                  {/* Category Header */}
                  <div className="grid grid-cols-4 bg-[#2a1b11] border-b border-[#636564]/80">
                    <div className="col-span-full py-2.5 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-[#93A3B1] flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#93A3B1]" />
                      <span>{group.category}</span>
                    </div>
                  </div>

                  {/* Feature Rows */}
                  {group.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="grid grid-cols-4 border-b border-[#636564]/50 hover:bg-[#4C443C]/20 transition-colors"
                    >
                      {/* Feature Name Column */}
                      <div className="p-4 sm:px-6 text-xs sm:text-sm text-[#FAFAF8] border-r border-[#636564]/50 flex flex-col justify-center">
                        <span className="font-medium">{feat.name}</span>
                        {feat.description && (
                          <span className="text-[11px] text-[#D6CFC7] mt-0.5 leading-snug">
                            {feat.description}
                          </span>
                        )}
                      </div>

                      {/* Values for Basic, Standard, Premium */}
                      {feat.values.map((val, pIdx) => (
                        <div
                          key={pIdx}
                          className={cn(
                            "p-4 text-center text-xs sm:text-sm flex items-center justify-center border-r last:border-r-0 border-[#636564]/50",
                            pIdx === 1 && "bg-[#93A3B1]/[0.04]",
                            pIdx === 2 && "bg-[#4C443C]/[0.08]"
                          )}
                        >
                          <ComparisonValue value={val} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scope Transparency Note */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#D6CFC7] leading-relaxed">
            {disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pricing7;
