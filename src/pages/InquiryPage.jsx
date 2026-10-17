import React from 'react';
import { Sparkles, CheckCircle2, Clock, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Waitlist1 } from '../components/waitlist-1';

export function InquiryPage() {
  const intakeSteps = [
    {
      num: '01',
      title: 'Submit Project Parameters',
      desc: 'Complete the inquiry form below with your current website URL, desired deliverables, and estimated timeline.',
      icon: FileText,
    },
    {
      num: '02',
      title: 'Architectural Review',
      desc: 'Our lead developer reviews your requirements within 24 hours to analyze technical feasibility and stack requirements.',
      icon: Clock,
    },
    {
      num: '03',
      title: 'Discovery & Proposal',
      desc: 'We schedule a brief 20-minute scope alignment call and provide a transparent, fixed-scope engineering proposal.',
      icon: CheckCircle2,
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
            <span className="text-[#FAFAF8]">Inquiry</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
              <Sparkles className="h-3.5 w-3.5 text-[#93A3B1]" />
              <span>Project Intake & Consultation</span>
            </div>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAFAF8] leading-[1.1]">
              Initiate Your Project With Webdora.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#D6CFC7] leading-relaxed">
              We partner with ambitious founders, established studios, and growing enterprises looking to elevate their digital presence. Tell us about your goals below.
            </p>
          </div>

          {/* 3 Step Timeline */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {intakeSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-2xl border border-[#636564]/50 bg-[#291b10] p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#93A3B1]">{step.num}</span>
                      <div className="h-8 w-8 rounded-lg bg-[#4C443C]/50 flex items-center justify-center text-[#93A3B1]">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#FAFAF8]">{step.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#D6CFC7] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Waitlist 1 Inquiry Form & Tech Marquee Section */}
      <Waitlist1 />

    </div>
  );
}

export default InquiryPage;
