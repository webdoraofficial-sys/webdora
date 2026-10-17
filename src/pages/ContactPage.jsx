import React, { useState } from 'react';
import { Sparkles, Mail, Clock, Globe2, ArrowRight, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Project Consultation',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.email.trim() || !formState.name.trim()) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  const handleReset = () => {
    setFormState({
      name: '',
      email: '',
      subject: 'Project Consultation',
      message: '',
    });
    setStatus('idle');
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
            <span className="text-[#FAFAF8]">Contact</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]">
              <Sparkles className="h-3.5 w-3.5 text-[#93A3B1]" />
              <span>Studio Communication & Direct Contact</span>
            </div>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAFAF8] leading-[1.1]">
              Get in Touch With Our Studio.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#D6CFC7] leading-relaxed">
              Have an architectural question, partnership proposal, or website redesign request? We look forward to discussing how Webdora can accelerate your digital roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Channels + Form Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 bg-[#291b10]">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Communication Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAFAF8]">
                  Communication Channels
                </h2>
                <p className="mt-2 text-sm text-[#D6CFC7] leading-relaxed">
                  Every inquiry is handled directly by senior engineering leadership.
                </p>
              </div>

              {/* Channel 1: Email */}
              <div className="rounded-2xl border border-[#636564]/50 bg-[#322214] p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#4C443C]/50 border border-[#636564]/50 flex items-center justify-center text-[#93A3B1]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#7C898B]">Email Inquiries</span>
                    <p className="text-base font-bold text-[#FAFAF8] mt-0.5">hello@webdora.design</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-[#D6CFC7] leading-relaxed">
                  For formal RFPs, project briefs, and technical specifications.
                </p>
              </div>

              {/* Channel 2: Response SLA */}
              <div className="rounded-2xl border border-[#636564]/50 bg-[#322214] p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#4C443C]/50 border border-[#636564]/50 flex items-center justify-center text-[#93A3B1]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#7C898B]">Turnaround SLA</span>
                    <p className="text-base font-bold text-[#FAFAF8] mt-0.5">&lt; 24 Business Hours</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-[#D6CFC7] leading-relaxed">
                  We review your submission, prepare preliminary feedback, and follow up promptly.
                </p>
              </div>

              {/* Channel 3: Operating Presence */}
              <div className="rounded-2xl border border-[#636564]/50 bg-[#322214] p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#4C443C]/50 border border-[#636564]/50 flex items-center justify-center text-[#93A3B1]">
                    <Globe2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#7C898B]">Global Presence</span>
                    <p className="text-base font-bold text-[#FAFAF8] mt-0.5">Remote Studio &middot; Worldwide Delivery</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-[#D6CFC7] leading-relaxed">
                  Partnering with clients across the Americas, Europe, and Asia-Pacific.
                </p>
              </div>
            </div>

            {/* Right Column: Direct Message Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-8 sm:p-10 shadow-2xl text-[#322214]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7C898B] mb-2">
                  <MessageSquare className="h-4 w-4 text-[#93A3B1]" />
                  <span>Send a Direct Message</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#322214]">
                  Start the Conversation
                </h3>
                <p className="mt-2 text-sm text-[#4C443C]">
                  Fill out the details below and we'll connect with you directly.
                </p>

                {status === 'idle' && (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#322214] uppercase mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#322214] placeholder-[#7C898B] focus:border-[#93A3B1] focus:outline-none focus:ring-1 focus:ring-[#93A3B1] shadow-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#322214] uppercase mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="jane@company.com"
                          className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#322214] placeholder-[#7C898B] focus:border-[#93A3B1] focus:outline-none focus:ring-1 focus:ring-[#93A3B1] shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#322214] uppercase mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#322214] focus:border-[#93A3B1] focus:outline-none focus:ring-1 focus:ring-[#93A3B1] shadow-xs"
                      >
                        <option value="Project Consultation">New Project Consultation</option>
                        <option value="Standard Web Package">Standard (Enhanced Web) Package</option>
                        <option value="Premium Full Solution">Premium (Full Solution) Package</option>
                        <option value="Technical SEO Audit">Technical SEO & Speed Optimization</option>
                        <option value="Partnership">Partnership / White-label Development</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#322214] uppercase mb-1.5">
                        Project Details or Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell us about your brand, current challenges, and project goals..."
                        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#322214] placeholder-[#7C898B] focus:border-[#93A3B1] focus:outline-none focus:ring-1 focus:ring-[#93A3B1] shadow-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-[#322214] px-6 py-3.5 text-sm font-bold text-[#FAFAF8] shadow-md hover:bg-[#4C443C] transition-all"
                    >
                      <Mail className="h-4 w-4 text-[#93A3B1]" />
                      <span>Send Direct Message</span>
                    </button>
                  </form>
                )}

                {status === 'submitting' && (
                  <div className="py-16 text-center space-y-4">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-3 border-[#322214] border-t-transparent" />
                    <p className="font-semibold text-[#322214]">Transmitting your message to Webdora...</p>
                  </div>
                )}

                {status === 'success' && (
                  <div className="py-12 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#322214]">
                      Message Received
                    </h4>
                    <p className="text-sm text-[#4C443C] max-w-md mx-auto">
                      Thank you, <strong className="text-[#322214]">{formState.name}</strong>. We have received your inquiry from <strong className="text-[#322214]">{formState.email}</strong>. A team member will respond shortly.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#4C443C] px-5 py-2.5 text-xs font-semibold text-[#FAFAF8] hover:bg-[#636564] transition-colors"
                    >
                      <span>Send Another Message</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default ContactPage;
