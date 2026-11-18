import {useEffect} from 'react';
import {X} from 'lucide-react';
import {COMPANY_INFO} from '../data/company';

export type LegalModalTab = 'privacy' | 'legal' | null;

export function LegalModal({
  activeTab,
  onClose,
  onChangeTab,
}: {
  activeTab: LegalModalTab;
  onClose: () => void;
  onChangeTab: (tab: 'privacy' | 'legal') => void;
}) {
  useEffect(() => {
    if (!activeTab) {
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeTab, onClose]);

  if (!activeTab) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2421]/60 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#1F2421]/15 bg-[#FAF8F4] p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#1F2421]/10 pb-4">
          <div>
            <h2
              id="legal-modal-title"
              className="font-display text-xl font-semibold text-[#1F2421]"
            >
              {activeTab === 'privacy'
                ? 'Política de privacidad'
                : 'Condiciones legales y aviso legal'}
            </h2>
            <div className="mt-2 flex gap-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => onChangeTab('privacy')}
                className={
                  activeTab === 'privacy'
                    ? 'text-[#1B3B2B] underline underline-offset-4'
                    : 'text-[#4C544F] hover:text-[#1F2421]'
                }
              >
                Política de privacidad
              </button>
              <button
                type="button"
                onClick={() => onChangeTab('legal')}
                className={
                  activeTab === 'legal'
                    ? 'text-[#1B3B2B] underline underline-offset-4'
                    : 'text-[#4C544F] hover:text-[#1F2421]'
                }
              >
                Condiciones legales
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#1F2421]/15 text-[#1F2421] hover:bg-[#F3EFE6]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {activeTab === 'privacy' ? (
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#3A403C]">
            <p>
              <strong>Responsable del tratamiento:</strong>{' '}
              {COMPANY_INFO.legalName}, con domicilio en{' '}
              {COMPANY_INFO.address.fullFormatted} y correo de contacto{' '}
              <a
                href={COMPANY_INFO.emailHref}
                className="font-medium text-[#1B3B2B] underline underline-offset-4"
              >
                {COMPANY_INFO.email}
              </a>
              .
            </p>
            <p>
              <strong>Finalidad:</strong> Los datos personales y currículums
              facilitados a través de nuestros formularios se tratarán
              únicamente para atender consultas comerciales, solicitudes de
              presupuesto, asesoramiento técnico o procesos de selección de
              personal de la empresa.
            </p>
            <p>
              <strong>Legitimación y conservación:</strong> El tratamiento se
              basa en el consentimiento expreso del interesado. No se cederán
              datos a terceros salvo obligación legal. Los datos de candidaturas
              se conservarán durante el plazo estrictamente necesario para la
              valoración de vacantes.
            </p>
            <p>
              <strong>Derechos:</strong> Puedes ejercer tus derechos de acceso,
              rectificación, supresión, limitación u oposición escribiendo a{' '}
              <a
                href={COMPANY_INFO.emailHref}
                className="font-medium text-[#1B3B2B] underline underline-offset-4"
              >
                {COMPANY_INFO.email}
              </a>{' '}
              o llamando al {COMPANY_INFO.phonePrimary}.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#3A403C]">
            <p>
              <strong>Titular del sitio web:</strong> {COMPANY_INFO.legalName}
              <br />
              <strong>Dirección:</strong> {COMPANY_INFO.address.fullFormatted}
              <br />
              <strong>Teléfono:</strong> {COMPANY_INFO.phonePrimary}
              <br />
              <strong>Correo electrónico:</strong> {COMPANY_INFO.email}
              <br />
              <strong>Número de Identificación Medioambiental (NIMA):</strong>{' '}
              {COMPANY_INFO.nima}
            </p>
            <p>
              El envío de información o currículums a través de este sitio web
              implica la veracidad de los datos facilitados por el usuario y la
              aceptación de las condiciones de tratamiento descritas en la
              Política de Privacidad conforme al Reglamento (UE) 2016/679 (RGPD)
              y la Ley Orgánica 3/2018 (LOPDGDD).
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end border-t border-[#1F2421]/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-10 rounded-md bg-[#1B3B2B] px-5 py-2 text-xs font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
