import {useEffect, useState} from 'react';
import {X} from 'lucide-react';

export type CookieModalTab = 'policy' | 'settings' | null;

interface CookiePreferences {
  essential: true;
  analytics: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'abonos_cookie_preferences';

function loadPreferences(): CookiePreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
      return {
        essential: true,
        analytics: Boolean(parsed.analytics),
        updatedAt: parsed.updatedAt || new Date().toISOString(),
      };
    }
  } catch {
    // ignore storage errors
  }
  return {
    essential: true,
    analytics: false,
    updatedAt: new Date().toISOString(),
  };
}

export function CookieModal({
  activeTab,
  onClose,
  onChangeTab,
}: {
  activeTab: CookieModalTab;
  onClose: () => void;
  onChangeTab: (tab: 'policy' | 'settings') => void;
}) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (activeTab) {
      const prefs = loadPreferences();
      setAnalyticsEnabled(prefs.analytics);
      setSavedNotice(false);
    }
  }, [activeTab]);

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

  const savePreferences = (analytics: boolean) => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore storage errors
    }
    setAnalyticsEnabled(analytics);
    setSavedNotice(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2421]/60 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-[#1F2421]/15 bg-[#FAF8F4] p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#1F2421]/10 pb-4">
          <div>
            <h2
              id="cookie-modal-title"
              className="font-display text-xl font-semibold text-[#1F2421]"
            >
              {activeTab === 'policy'
                ? 'Política de cookies'
                : 'Gestión de cookies'}
            </h2>
            <div className="mt-2 flex gap-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => onChangeTab('policy')}
                className={
                  activeTab === 'policy'
                    ? 'text-[#1B3B2B] underline underline-offset-4'
                    : 'text-[#4C544F] hover:text-[#1F2421]'
                }
              >
                Política de cookies
              </button>
              <button
                type="button"
                onClick={() => onChangeTab('settings')}
                className={
                  activeTab === 'settings'
                    ? 'text-[#1B3B2B] underline underline-offset-4'
                    : 'text-[#4C544F] hover:text-[#1F2421]'
                }
              >
                Configurar preferencias
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

        {activeTab === 'policy' ? (
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#3A403C]">
            <p>
              Este sitio web de <strong>Abonos Naturales Hnos. Aguado S.L.</strong>{' '}
              utiliza únicamente almacenamiento técnico esencial para garantizar
              el correcto funcionamiento de la navegación y las preferencias del
              usuario.
            </p>
            <p>
              Las cookies analíticas (Google Analytics) solo se activan si se
              configura un identificador de medición en producción y el usuario
              otorga su consentimiento desde el panel de gestión de cookies.
            </p>
            <p>
              Puedes modificar o retirar tu consentimiento en cualquier momento
              desde el enlace &ldquo;Gestión de cookies&rdquo; situado en el pie
              de página.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-[#1F2421]/10 bg-white p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-sm font-semibold text-[#1F2421]">
                    Cookies técnicas necesarias
                  </p>
                  <p className="mt-0.5 text-xs text-[#4C544F]">
                    Imprescindibles para la navegación y el envío seguro de
                    formularios. Siempre activas.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#1B3B2B]">Activas</span>
              </div>
            </div>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-[#1F2421]/10 bg-white p-4">
              <div>
                <p className="font-display text-sm font-semibold text-[#1F2421]">
                  Cookies analíticas (Google Analytics)
                </p>
                <p className="mt-0.5 text-xs text-[#4C544F]">
                  Permiten medir de forma agregada las visitas a páginas de
                  productos y soluciones profesionales.
                </p>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                className="h-5 w-5 accent-[#1B3B2B]"
              />
            </label>

            {savedNotice && (
              <p role="status" className="text-xs font-medium text-[#1B3B2B]">
                Preferencias guardadas correctamente en este navegador.
              </p>
            )}

            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => savePreferences(false)}
                className="min-h-10 rounded-md border border-[#1F2421]/20 bg-white px-4 py-2 text-xs font-medium text-[#1F2421] hover:bg-[#F3EFE6]"
              >
                Solo necesarias
              </button>
              <button
                type="button"
                onClick={() => savePreferences(analyticsEnabled)}
                className="min-h-10 rounded-md bg-[#1B3B2B] px-4 py-2 text-xs font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
