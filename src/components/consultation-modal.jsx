import React, { useState, useEffect } from 'react';
import { CheckCircle2, Mail, Sparkles, X } from 'lucide-react';

export function ConsultationModal({ isOpen, onClose, initialService = 'standard-web', initialDetails = '' }) {
  const [selectedService, setSelectedService] = useState(initialService);
  const [projectForm, setProjectForm] = useState({ name: '', email: '', details: initialDetails });
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success

  useEffect(() => {
    if (isOpen) {
      setSelectedService(initialService);
      setProjectForm(prev => ({
        ...prev,
        details: initialDetails || prev.details
      }));
      setFormStatus('idle');
    }
  }, [isOpen, initialService, initialDetails]);

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.email.trim()) return;
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1200);
  };

  const handleClose = () => {
    setFormStatus('idle');
    setProjectForm({ name: '', email: '', details: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-[#636564] bg-[#322214] p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-[#D6CFC7] hover:bg-[#4C443C] hover:text-[#FAFAF8]"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#93A3B1]">
          <Sparkles className="h-4 w-4" />
          <span>Project Consultation</span>
        </div>
        <h3 className="mt-1 font-serif text-xl font-bold text-[#FAFAF8] sm:text-2xl">
          Start Your Project with Webdora
        </h3>
        <p className="mt-2 text-sm text-[#D6CFC7]">
          Select your required package or service. We'll review your scope and provide a tailored technical roadmap.
        </p>

        {formStatus === 'idle' && (
          <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#D6CFC7] uppercase mb-1.5">
                Select Required Package or Service
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedService('standard-web')}
                  className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedService === 'standard-web'
                      ? 'border-[#93A3B1] bg-[#4C443C] text-[#FAFAF8] font-semibold'
                      : 'border-[#636564] bg-[#291b10] text-[#D6CFC7] hover:border-[#93A3B1]/40'
                  }`}
                >
                  Standard (Enhanced Web)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedService('premium-web')}
                  className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedService === 'premium-web'
                      ? 'border-[#93A3B1] bg-[#4C443C] text-[#FAFAF8] font-semibold'
                      : 'border-[#636564] bg-[#291b10] text-[#D6CFC7] hover:border-[#93A3B1]/40'
                  }`}
                >
                  Premium (Full Solution)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedService('ui-design')}
                  className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedService === 'ui-design'
                      ? 'border-[#93A3B1] bg-[#4C443C] text-[#FAFAF8] font-semibold'
                      : 'border-[#636564] bg-[#291b10] text-[#D6CFC7] hover:border-[#93A3B1]/40'
                  }`}
                >
                  UI/UX & Brand Identity
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedService('seo')}
                  className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedService === 'seo'
                      ? 'border-[#93A3B1] bg-[#4C443C] text-[#FAFAF8] font-semibold'
                      : 'border-[#636564] bg-[#291b10] text-[#D6CFC7] hover:border-[#93A3B1]/40'
                  }`}
                >
                  Technical SEO & Speed
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D6CFC7] uppercase mb-1">
                Your Work Email
              </label>
              <input
                type="email"
                required
                value={projectForm.email}
                onChange={(e) => setProjectForm({ ...projectForm, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full rounded-xl border border-[#636564] bg-[#291b10] px-4 py-2.5 text-sm text-[#FAFAF8] placeholder-[#7C898B] focus:border-[#93A3B1] focus:outline-none focus:ring-1 focus:ring-[#93A3B1]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D6CFC7] uppercase mb-1">
                Project Overview or Website URL
              </label>
              <textarea
                rows={2}
                value={projectForm.details}
                onChange={(e) => setProjectForm({ ...projectForm, details: e.target.value })}
                placeholder="Tell us what you're looking to build or improve..."
                className="w-full rounded-xl border border-[#636564] bg-[#291b10] px-4 py-2.5 text-sm text-[#FAFAF8] placeholder-[#7C898B] focus:border-[#93A3B1] focus:outline-none focus:ring-1 focus:ring-[#93A3B1]"
              />
            </div>

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#93A3B1] px-4 py-3 text-sm font-bold text-[#322214] shadow-[0_0_20px_rgba(147,163,177,0.35)] transition-all hover:bg-[#a6b5c2]"
            >
              <Mail className="h-4 w-4" />
              <span>Send Project Inquiry</span>
            </button>
          </form>
        )}

        {formStatus === 'submitting' && (
          <div className="mt-6 flex flex-col items-center justify-center py-6 text-center">
            <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#93A3B1] border-t-transparent" />
            <p className="mt-4 font-semibold text-[#FAFAF8]">Connecting with Webdora team...</p>
          </div>
        )}

        {formStatus === 'success' && (
          <div className="mt-5 space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#FAFAF8]">Inquiry Received</h4>
            <p className="text-sm text-[#D6CFC7]">
              Thank you! We've received your request for {projectForm.email}. A Webdora team member will reach out shortly to discuss your digital roadmap.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-xl bg-[#4C443C] py-2.5 text-xs font-semibold text-[#FAFAF8] hover:bg-[#636564] cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultationModal;
