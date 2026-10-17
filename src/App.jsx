import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar13 } from './components/navbar-13';
import { Footer9 } from './components/footer-9';
import { ScrollToTop } from './components/scroll-to-top';
import { ConsultationModal } from './components/consultation-modal';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { PricingPage } from './pages/PricingPage';
import { InquiryPage } from './pages/InquiryPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';

export function App() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('standard-web');
  const [initialDetails, setInitialDetails] = useState('');

  const handleOpenConsult = (service = 'standard-web', details = '') => {
    setSelectedService(service);
    setInitialDetails(details);
    setIsConsultModalOpen(true);
  };

  const handleSelectPlan = (planId) => {
    if (planId === 'standard') {
      setSelectedService('standard-web');
      setInitialDetails('Inquiry regarding the Standard (Enhanced Website) development package.');
    } else if (planId === 'premium') {
      setSelectedService('premium-web');
      setInitialDetails('Inquiry regarding the Premium (Full Website Solution) package with backend & auth.');
    } else {
      setSelectedService('standard-web');
      setInitialDetails('Inquiry regarding the Basic Website package.');
    }
    setIsConsultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#322214] text-[#FAFAF8] selection:bg-[#93A3B1] selection:text-[#322214] relative overflow-x-hidden flex flex-col">
      {/* Viewport Scroll Reset on Route Navigation */}
      <ScrollToTop />

      {/* Global Navbar 13: Split-nav layout, route-aware active states, hero boundary transition on '/' */}
      <Navbar13 onCtaClick={() => handleOpenConsult()} />

      {/* Main Routed Page Content */}
      <main className="relative w-full flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onCtaClick={() => handleOpenConsult()}
                onSelectPlan={handleSelectPlan}
              />
            }
          />
          <Route
            path="/services"
            element={<ServicesPage onCtaClick={() => handleOpenConsult('standard-web')} />}
          />
          <Route
            path="/work"
            element={<WorkPage onCtaClick={() => handleOpenConsult('standard-web')} />}
          />
          <Route
            path="/pricing"
            element={
              <PricingPage
                onSelectPlan={handleSelectPlan}
                onCtaClick={() => handleOpenConsult('standard-web')}
              />
            }
          />
          <Route
            path="/inquiry"
            element={<InquiryPage />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="/terms"
            element={<TermsPage />}
          />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Shared Footer 9: Complete sitemap footer with giant responsive WEBDORA wordmark */}
      <Footer9 onCtaClick={() => handleOpenConsult()} />

      {/* Interactive Consultation & Project Inquiry Modal */}
      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        initialService={selectedService}
        initialDetails={initialDetails}
      />
    </div>
  );
}

export default App;
