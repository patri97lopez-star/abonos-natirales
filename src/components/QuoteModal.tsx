import {useEffect} from 'react';
import {X} from 'lucide-react';
import {useRouter} from '../lib/router';
import {LeadForm} from './LeadForm';

export function QuoteModal() {
  const {quoteModalOpen, quotePrefill, closeQuoteModal, pathname} = useRouter();

  useEffect(() => {
    if (!quoteModalOpen) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeQuoteModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [quoteModalOpen, closeQuoteModal]);

  if (!quoteModalOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2421]/60 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeQuoteModal();
        }
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#1F2421]/15 bg-[#FAF8F4] p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#1F2421]/10 pb-4">
          <div>
            <p className="text-xs font-medium text-[#5F6F52]">
              Atención comercial y técnica · Abonos Naturales Hnos. Aguado
            </p>
            <h2
              id="quote-modal-title"
              className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#1F2421]"
            >
              {quotePrefill.title || 'Solicitar presupuesto'}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeQuoteModal}
            aria-label="Cerrar ventana"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#1F2421]/15 text-[#1F2421] transition-colors hover:bg-[#F3EFE6]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          <LeadForm
            intent={quotePrefill.intent || 'presupuesto'}
            submitLabel={
              quotePrefill.intent === 'ficha_tecnica'
                ? 'Solicitar ficha técnica'
                : 'Enviar solicitud de presupuesto'
            }
            initialProduct={quotePrefill.productInterest}
            initialProjectType={quotePrefill.projectType}
            sourcePath={pathname}
          />
        </div>
      </div>
    </div>
  );
}
