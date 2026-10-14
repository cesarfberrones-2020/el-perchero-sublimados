import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductsGrid } from './components/ProductsGrid';
import { ProductModal } from './components/ProductModal';
import { Process } from './components/Process';
import { Differentials } from './components/Differentials';
import { Testimonials } from './components/Testimonials';
import { QuoteForm } from './components/QuoteForm';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ApifyIntegrationModal } from './components/ApifyIntegrationModal';
import { LegalModal, type LegalTab } from './components/LegalModal';
import { CookieBanner } from './components/CookieBanner';
import { AdminDashboard } from './components/AdminDashboard';
import type { ProductItem } from './types';

export function App() {
  const [selectedProductForModal, setSelectedProductForModal] = useState<ProductItem | null>(null);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string>('');
  const [uploadedDesign, setUploadedDesign] = useState<{ fileName: string; previewUrl: string }>({
    fileName: '',
    previewUrl: '',
  });
  const [isApifyModalOpen, setIsApifyModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [legalModalState, setLegalModalState] = useState<{ isOpen: boolean; tab: LegalTab }>({
    isOpen: false,
    tab: 'privacy',
  });
  const [forceCookieSettings, setForceCookieSettings] = useState<boolean>(false);

  const openLegalModal = (tab: LegalTab) => {
    setLegalModalState({ isOpen: true, tab });
  };

  const scrollToQuote = (productName?: string) => {
    if (productName) {
      setSelectedProductForQuote(productName);
    }
    const element = document.getElementById('cotizar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProducts = () => {
    const element = document.getElementById('productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Navigation Header */}
      <Header 
        onQuoteClick={() => scrollToQuote()} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onQuoteClick={() => scrollToQuote()}
          onExploreClick={scrollToProducts}
        />

        {/* Featured Products Grid */}
        <ProductsGrid
          onSelectProduct={(product) => setSelectedProductForModal(product)}
          onQuickQuote={(productName) => scrollToQuote(productName)}
        />

        {/* How We Work (3 Steps Process) */}
        <Process
          onQuoteClick={() => scrollToQuote()}
          onFileUploaded={(data) => setUploadedDesign(data)}
        />

        {/* Differentials / Value Proposition */}
        <Differentials />

        {/* Testimonials */}
        <Testimonials />

        {/* Quick Quote Form (Final CTA) */}
        <QuoteForm
          selectedProduct={selectedProductForQuote}
          onClearSelectedProduct={() => setSelectedProductForQuote('')}
          uploadedDesign={uploadedDesign}
          onOpenPrivacy={() => openLegalModal('privacy')}
        />

        {/* FAQs */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={(tab) => openLegalModal(tab)}
        onOpenCookieSettings={() => setForceCookieSettings(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Instant WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Cookie Consent Banner (LOPDP Ecuador) */}
      <CookieBanner
        onOpenLegal={(tab) => openLegalModal(tab)}
        forceShowSettings={forceCookieSettings}
        onCloseSettings={() => setForceCookieSettings(false)}
      />

      {/* Legal, Privacy & Cookies Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        initialTab={legalModalState.tab}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
        onOpenCookieSettings={() => setForceCookieSettings(true)}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onSelectForQuote={(name) => scrollToQuote(name)}
      />

      {/* Admin Dashboard & Supabase Manager */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Apify Integration & Testing Modal */}
      <ApifyIntegrationModal
        isOpen={isApifyModalOpen}
        onClose={() => setIsApifyModalOpen(false)}
      />
    </div>
  );
}

export default App;
