import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

const TERMS_SECTIONS = [
  {
    number: '01',
    title: 'Payments',
    content:
      'Projects begin after the agreed advance payment is received. Remaining payments are due according to the agreed payment schedule.',
  },
  {
    number: '02',
    title: 'Cancellation and Refunds',
    content:
      'Once work has started, payments already made are non-refundable.',
  },
  {
    number: '03',
    title: 'Package Changes',
    content:
      'Packages cannot be downgraded after a project begins to reduce its price. Upgrades and additional features may be available at extra cost.',
  },
  {
    number: '04',
    title: 'Revisions and Additional Work',
    content:
      'Changes, revisions, or features outside the agreed project scope may incur additional charges and extend delivery timelines.',
  },
  {
    number: '05',
    title: 'Client Responsibilities',
    content:
      'Clients must provide the required content, information, feedback, and approvals on time to avoid delays.',
  },
  {
    number: '06',
    title: 'Ownership and Delivery',
    content:
      'Project files, source code, website content, credentials, ownership, and administrative access will be handled according to the written agreement, selected package, and payment terms.',
  },
  {
    number: '07',
    title: 'Privacy and Confidentiality',
    content:
      'Webdora follows reasonable privacy and security practices and will not disclose confidential client information without authorization, except where legally required.',
  },
  {
    number: '08',
    title: 'Acceptance',
    content:
      'Confirming a project signifies the client\'s acceptance of these Terms & Conditions and the agreed service policies.',
  },
];

export function TermsPage() {
  return (
    <div className="w-full bg-[#322214] text-[#FAFAF8] min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24">
      {/* Header & Breadcrumbs */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-b border-[#636564]/30">
        <div className="max-w-[1360px] mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#93A3B1] mb-6">
            <Link to="/" className="hover:text-[#FAFAF8] transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-[#FAFAF8]">Terms &amp; Conditions</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
              <FileText className="h-3.5 w-3.5 text-[#93A3B1]" />
              <span>Studio Policies &amp; Agreement</span>
            </div>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAFAF8] leading-[1.1]">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#D6CFC7] leading-relaxed">
              Clear, transparent guidelines outlining project engagements, payment schedules, and mutual commitments for Webdora client deliverables.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content Body */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Context Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-[#636564]/50 bg-[#291b10] p-6 sm:p-7 sticky top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-[#4C443C]/50 border border-[#636564]/50 flex items-center justify-center text-[#93A3B1]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#FAFAF8]">Standard Terms</h3>
                    <p className="text-xs text-[#7C898B] font-mono">Webdora Digital Studio</p>
                  </div>
                </div>

                <p className="text-xs text-[#D6CFC7] leading-relaxed">
                  These terms establish predictable standards for project onboarding, timelines, scope modifications, and asset delivery.
                </p>

                <div className="mt-6 pt-6 border-t border-[#636564]/30 space-y-3">
                  <p className="text-[11px] font-mono text-[#7C898B] uppercase tracking-wider">
                    Quick Navigation
                  </p>
                  <div className="space-y-1.5 text-xs text-[#D6CFC7]">
                    {TERMS_SECTIONS.map((item) => (
                      <a
                        key={item.number}
                        href={`#section-${item.number}`}
                        className="block py-1 hover:text-[#FAFAF8] transition-colors"
                      >
                        <span className="font-mono text-[#93A3B1] mr-2">{item.number}.</span>
                        <span>{item.title}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#636564]/30">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#93A3B1] hover:text-[#FAFAF8] transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Return to Homepage</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Numbered Sections List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4">
                {TERMS_SECTIONS.map((section) => (
                  <article
                    key={section.number}
                    id={`section-${section.number}`}
                    className="rounded-2xl border border-[#636564]/40 bg-[#291b10] p-6 sm:p-8 transition-colors hover:border-[#93A3B1]/40"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm sm:text-base font-bold text-[#93A3B1]">
                        {section.number}.
                      </span>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAFAF8]">
                        {section.title}
                      </h2>
                    </div>
                    <p className="mt-3 text-sm sm:text-base text-[#D6CFC7] leading-relaxed pl-7">
                      {section.content}
                    </p>
                  </article>
                ))}
              </div>

              {/* Acceptance Note */}
              <div className="rounded-2xl border border-[#93A3B1]/30 bg-[#322214] p-6 sm:p-7 text-xs text-[#D6CFC7] leading-relaxed flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#93A3B1] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#FAFAF8]">Acknowledgment:</strong> Project engagement agreements incorporate these terms. For specific custom scopes or enterprise agreements, written deliverables supersede standard definitions where noted.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default TermsPage;
