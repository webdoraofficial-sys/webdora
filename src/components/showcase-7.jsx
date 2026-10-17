import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { projectsData } from '@/data/projectsData';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Showcase7({ projects = projectsData, onCtaClick, showViewAllLink = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const totalCount = String(projects.length).padStart(2, '0');

  return (
    <section id="work" className="w-full py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#322214] relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* Left Column: Sticky Preview Panel on Desktop */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
              <Sparkles className="h-3.5 w-3.5 text-[#93A3B1]" />
              <span>Selected Engagements</span>
            </div>

            {/* Section Heading */}
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAF8] leading-[1.1] text-balance">
              Case studies measured in outcomes, not screens.
            </h2>

            {/* Editorial Description */}
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#D6CFC7] max-w-md">
              Seven production websites and digital platforms engineered for our clients, each shipped to deliver measurable growth and operational scale.
            </p>

            {/* Direct Project Consultation Trigger */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#93A3B1] hover:text-[#FAFAF8] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] rounded-md py-1"
              >
                <span>Have a vision for your platform?</span>
                <span className="text-[#FAFAF8] underline underline-offset-4 flex items-center gap-1">
                  Start your project
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>

            {/* View All Projects Pill for Homepage */}
            {showViewAllLink && (
              <div className="mt-5">
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4C443C] px-3.5 py-2 text-xs font-semibold text-[#FAFAF8] hover:bg-[#636564] transition-colors shadow-sm group"
                >
                  <span>View All Projects in Dedicated Portfolio</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#93A3B1] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            )}

            {/* Aspect Ratio Preview Card with Crossfade Transitions */}
            <div className="relative mt-8 sm:mt-10 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-3xl border border-[#636564]/60 bg-[#291b10] shadow-2xl">
              {projects.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div
                    key={item.id || item.title}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.05,
                    }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                    }
                    aria-hidden={!isActive}
                    className={cn(
                      "absolute inset-0 transition-opacity",
                      isActive ? "pointer-events-auto" : "pointer-events-none"
                    )}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />

                    {/* Gradient Scrim for legible metadata caption */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#20150d]/95 via-[#20150d]/50 to-transparent px-5 sm:px-6 pb-5 sm:pb-6 pt-20 flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-bold text-[#FAFAF8] truncate">{item.title}</p>
                        <p className="mt-0.5 text-xs text-[#93A3B1] font-mono font-medium">{item.metric || item.category}</p>
                      </div>

                      {item.live && (
                        <a
                          href={item.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#FAFAF8] bg-[#4C443C]/80 hover:bg-[#93A3B1] hover:text-[#322214] px-3 py-1.5 rounded-lg border border-[#636564]/50 transition-colors shadow-sm"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Dynamic Project Index Counter Pill */}
              <span className="absolute left-4 top-4 z-20 rounded-full bg-[#322214]/85 border border-[#636564]/60 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-[#FAFAF8] backdrop-blur-md shadow-md">
                {projects[activeIndex]?.index || '01'} / {totalCount}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Case Study List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="border-t border-[#636564]/40"
          >
            {projects.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <motion.a
                  key={item.id || item.title}
                  href={item.live || item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover="hover"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  className={cn(
                    "group grid grid-cols-[auto_1fr_auto] items-start gap-4 sm:gap-7 py-6 sm:py-8 border-b border-[#636564]/30 cursor-pointer transition-all duration-200 rounded-2xl px-3 sm:px-4 -mx-3 sm:-mx-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#322214]",
                    isActive
                      ? "bg-[#4C443C]/35 border-transparent shadow-sm"
                      : "hover:bg-[#4C443C]/15"
                  )}
                >
                  {/* Column 1: Index Number */}
                  <span
                    className={cn(
                      "pt-1 font-mono text-xs tracking-[0.14em] transition-colors duration-200",
                      isActive ? "text-[#93A3B1] font-bold" : "text-[#7C898B]"
                    )}
                  >
                    {item.index}
                  </span>

                  {/* Column 2: Case Study Details */}
                  <div className="min-w-0 pr-2">
                    <h3
                      className={cn(
                        "text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-tight transition-colors duration-200",
                        isActive ? "text-[#FAFAF8]" : "text-[#D6CFC7] group-hover:text-[#FAFAF8]"
                      )}
                    >
                      {item.name || item.title}
                    </h3>

                    {/* Metadata line: client · sector · year */}
                    <p className="mt-1.5 text-xs sm:text-sm font-medium text-[#7C898B]">
                      {item.client} &middot; {item.sector} &middot; {item.year}
                    </p>

                    {/* Summary Paragraph */}
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#D6CFC7] line-clamp-2 sm:line-clamp-none">
                      {item.summary || item.description}
                    </p>

                    {/* Technology Stack Tags */}
                    {item.stack && item.stack.length > 0 && (
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#4C443C]/50 text-[#D6CFC7] border border-[#636564]/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Column 3: Circular Action Pill with Animated Arrow */}
                  <span
                    className={cn(
                      "mt-1 grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-full border transition-all duration-200",
                      isActive
                        ? "bg-[#93A3B1] border-[#93A3B1] text-[#322214] shadow-[0_0_16px_rgba(147,163,177,0.35)]"
                        : "border-[#636564]/60 text-[#D6CFC7] group-hover:border-[#93A3B1] group-hover:text-[#FAFAF8]"
                    )}
                  >
                    <motion.span
                      variants={{ hover: { x: 2, y: -2 } }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="grid place-items-center"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.span>
                  </span>
                </motion.a>
              );
            })}

            {/* Bottom View All Link on Homepage */}
            {showViewAllLink && (
              <div className="mt-8 pt-4 flex justify-start">
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#93A3B1]/40 bg-[#4C443C]/30 px-5 py-3 text-sm font-semibold text-[#FAFAF8] hover:bg-[#4C443C] hover:border-[#93A3B1] transition-all"
                >
                  <span>Explore All Case Studies on Dedicated Portfolio Page</span>
                  <ArrowUpRight className="h-4 w-4 text-[#93A3B1]" />
                </Link>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Showcase7;
