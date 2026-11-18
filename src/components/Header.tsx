import {useEffect, useState} from 'react';
import {Globe, Mail, Menu, Phone, X} from 'lucide-react';
import {Link, useRouter} from '../lib/router';
import {COMPANY_INFO} from '../data/company';
import {
  applySiteLanguage,
  getSavedLanguage,
  SUPPORTED_LANGUAGES,
} from '../lib/translator';

interface NavItem {
  label: string;
  to: string;
  matchPrefix?: string;
}

const NAV_ITEMS: NavItem[] = [
  {label: 'Inicio', to: '/'},
  {label: 'Quiénes somos', to: '/quienes-somos'},
  {label: 'Instalaciones', to: '/instalaciones', matchPrefix: '/empresa'},
  {label: 'Productos', to: '/productos', matchPrefix: '/producto'},
  {label: 'Nuestros servicios', to: '/nuestros-servicios'},
  {label: 'Aplicaciones', to: '/aplicaciones'},
  {label: 'Contacto', to: '/contacto'},
];

export function BrandMark({size = 'header'}: {size?: 'header' | 'footer'}) {
  const sizeClass =
    size === 'footer'
      ? 'h-20 w-auto rounded-md bg-white px-2.5 py-1.5 object-contain shadow-xs'
      : 'h-20 sm:h-24 lg:h-[104px] w-auto object-contain mix-blend-multiply';

  return (
    <img
      src={COMPANY_INFO.logoUrl}
      alt="Logotipo Abonos Naturales Hnos. Aguado S.L."
      className={`shrink-0 ${sizeClass}`}
    />
  );
}

export function Header() {
  const {pathname, openQuoteModal} = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>(() =>
    getSavedLanguage()
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode);
    applySiteLanguage(langCode);
  };

  const isActive = (item: NavItem) => {
    if (item.to === '/') {
      return pathname === '/';
    }
    if (pathname === item.to) {
      return true;
    }
    if (item.matchPrefix && pathname.startsWith(item.matchPrefix)) {
      return true;
    }
    return pathname.startsWith(`${item.to}/`);
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Barra superior informativa y selector multidioma */}
      <div className="border-b border-[#1B3B2B]/15 bg-[#86AD26] text-[#1C2418]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-4 gap-y-1.5 px-3 py-1.5 text-xs sm:px-5 lg:px-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={COMPANY_INFO.emailHref}
              className="inline-flex items-center gap-1.5 font-medium hover:text-black transition-colors"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <a
              href={COMPANY_INFO.phoneSecondaryHref}
              className="inline-flex items-center gap-1.5 font-mono font-semibold tabular-nums hover:text-black transition-colors"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>647288457</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5 font-medium">
              <a
                href="https://wa.me/34647288457"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-4 hover:text-black transition-colors"
              >
                WhatsApp
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-4 hover:text-black transition-colors"
              >
                Instagram
              </a>
            </div>

            <div className="notranslate relative inline-flex items-center">
              <Globe
                className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-[#1C2418]"
                aria-hidden="true"
              />
              <select
                aria-label="Seleccionar idioma"
                value={selectedLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="min-h-7 cursor-pointer rounded border border-[#1C2418]/45 bg-[#94BC31]/75 py-0.5 pl-7 pr-6 text-xs font-medium text-[#1C2418] focus:border-[#1B3B2B] focus:outline-none"
              >
                <option value="es">
                  {selectedLang === 'es' ? 'Seleccionar idioma' : 'Español (Original)'}
                </option>
                {SUPPORTED_LANGUAGES.filter((l) => l.code !== 'es').map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeLabel} ({lang.label})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Barra principal de marca y navegación sobre fondo blanco integrado */}
      <div className="border-b border-[#1F2421]/10 bg-white/98 backdrop-blur-md">
        <div className="mx-auto flex min-h-[88px] max-w-[1440px] items-center justify-between gap-3 px-3 py-1.5 sm:min-h-[104px] sm:px-5 lg:min-h-[116px] lg:gap-5 lg:px-6">
          {/* Zona 1: Logotipo oficial ampliado + nombre corporativo */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3 text-[#1F2421] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3B2B]"
            aria-label="Abonos Naturales Hermanos Aguado S.L. - Ir al inicio"
          >
            <BrandMark size="header" />
            <span className="font-display text-xs min-[420px]:text-sm sm:text-base xl:text-[15px] 2xl:text-base font-semibold tracking-tight text-[#1B3B2B] leading-snug max-w-[170px] sm:max-w-[230px] xl:max-w-[195px] 2xl:max-w-[220px]">
              Abonos Naturales Hermanos Aguado S.L.
            </span>
          </Link>

          {/* Zona 2: Enlaces de navegación */}
          <nav
            aria-label="Navegación principal"
            className="hidden xl:flex items-center gap-3.5 2xl:gap-5"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative py-1 text-[13px] 2xl:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3B2B] ${
                    active
                      ? 'text-[#1B3B2B] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[1.5px] after:bg-[#1B3B2B]'
                      : 'text-[#4C544F] hover:text-[#1B3B2B]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zona 3: Acción principal + menú móvil */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() =>
                openQuoteModal({
                  intent: 'presupuesto',
                  title: 'Solicitar presupuesto comercial',
                })
              }
              className="hidden sm:inline-flex min-h-10 items-center justify-center rounded-md bg-[#1B3B2B] px-3 2xl:px-4 py-2 text-xs 2xl:text-sm font-medium text-[#FAF8F4] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#132A1E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
            >
              Solicitar presupuesto
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#1F2421]/15 text-[#1F2421] xl:hidden hover:bg-[#F3EFE6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3B2B]"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil / tablet desplegable */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-[#1F2421]/10 bg-[#FAF8F4] px-4 pb-6 pt-4 xl:hidden"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex min-h-11 items-center rounded-md px-3 text-base font-medium transition-colors ${
                    active
                      ? 'bg-[#F3EFE6] text-[#1B3B2B]'
                      : 'text-[#1F2421] hover:bg-[#F3EFE6]/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/trabaja-con-nosotros"
              className={`flex min-h-11 items-center rounded-md px-3 text-base font-medium transition-colors ${
                pathname === '/trabaja-con-nosotros'
                  ? 'bg-[#F3EFE6] text-[#1B3B2B]'
                  : 'text-[#1F2421] hover:bg-[#F3EFE6]/60'
              }`}
            >
              Trabaja con nosotros
            </Link>
          </nav>

          <div className="mt-4 border-t border-[#1F2421]/10 pt-4">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openQuoteModal({
                  intent: 'presupuesto',
                  title: 'Solicitar presupuesto comercial',
                });
              }}
              className="flex min-h-11 w-full items-center justify-center rounded-md bg-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-[#FAF8F4] transition-colors hover:bg-[#132A1E]"
            >
              Solicitar presupuesto
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
