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
import type { ProductItem } from './types';

export function App() {
  const [selectedProductForModal, setSelectedProductForModal] = useState<ProductItem | null>(null);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string>('');
  const [isApifyModalOpen, setIsApifyModalOpen] = useState<boolean>(false);

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
        onApifyClick={() => setIsApifyModalOpen(true)}
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
        <Process onQuoteClick={() => scrollToQuote()} />

        {/* Differentials / Value Proposition */}
        <Differentials />

        {/* Testimonials */}
        <Testimonials />

        {/* Quick Quote Form (Final CTA) */}
        <QuoteForm
          selectedProduct={selectedProductForQuote}
          onClearSelectedProduct={() => setSelectedProductForQuote('')}
        />

        {/* FAQs */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Instant WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onSelectForQuote={(name) => scrollToQuote(name)}
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
