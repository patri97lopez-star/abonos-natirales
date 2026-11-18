import {Mail, MapPin, Phone} from 'lucide-react';
import {Link, useRouter} from '../lib/router';
import {COMPANY_INFO} from '../data/company';
import {PRODUCT_CATEGORIES} from '../data/catalog';
import {BrandMark} from './Header';

export function Footer({
  onOpenCookies,
  onOpenLegal,
}: {
  onOpenCookies: (tab: 'policy' | 'settings') => void;
  onOpenLegal: (tab: 'privacy' | 'legal') => void;
}) {
  const {openQuoteModal} = useRouter();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1F2421]/10 bg-[#1B3B2B] text-[#FAF8F4]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Columna marca */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <BrandMark size="footer" />
              <span className="font-display text-lg font-semibold tracking-tight text-[#FAF8F4]">
                {COMPANY_INFO.fullBrand}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#FAF8F4]/80">
              Fabricación y comercialización de abonos naturales, mantillos,
              sustratos profesionales, enmiendas orgánicas y áridos decorativos
              con más de 40 años de experiencia.
            </p>
            <div className="mt-5 space-y-1.5 text-xs text-[#FAF8F4]/75 font-mono tabular-nums">
              <p>{COMPANY_INFO.legalName}</p>
              <p>N.º NIMA {COMPANY_INFO.nima}</p>
              <p>ISO 9001 · ISO 14001:2004 · SOHISCERT</p>
            </div>
          </div>

          {/* Navegación corporativa */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-semibold text-[#FAF8F4]">
              Sobre nosotros
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F4]/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/quienes-somos"
                  className="hover:text-white transition-colors"
                >
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link to="/instalaciones" className="hover:text-white transition-colors">
                  Instalaciones y empresa
                </Link>
              </li>
              <li>
                <Link
                  to="/nuestros-servicios"
                  className="hover:text-white transition-colors"
                >
                  Nuestros servicios
                </Link>
              </li>
              <li>
                <Link
                  to="/aplicaciones"
                  className="hover:text-white transition-colors"
                >
                  Aplicaciones
                </Link>
              </li>
              <li>
                <Link to="/sostenibilidad" className="hover:text-white transition-colors">
                  Política de Calidad y Medio Ambiente
                </Link>
              </li>
              <li>
                <Link
                  to="/trabaja-con-nosotros"
                  className="hover:text-white transition-colors"
                >
                  Trabaja con nosotros
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      intent: 'ficha_tecnica',
                      productInterest: 'Catálogo general PDF',
                      title: 'Solicitar catálogo general [PDF]',
                    })
                  }
                  className="text-left hover:text-white transition-colors"
                >
                  Descarga nuestro catálogo [PDF]
                </button>
              </li>
            </ul>
          </div>

          {/* Categorías principales */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold text-[#FAF8F4]">
              De interés · Productos
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FAF8F4]/80">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/productos/${category.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto y horarios */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold text-[#FAF8F4]">
              Planta y contacto
            </h2>
            <div className="mt-4 space-y-3 text-sm text-[#FAF8F4]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#A3B899]" aria-hidden="true" />
                <span>{COMPANY_INFO.address.fullFormatted}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#A3B899]" aria-hidden="true" />
                <a
                  href={COMPANY_INFO.phonePrimaryHref}
                  className="font-mono tabular-nums hover:text-white transition-colors"
                >
                  {COMPANY_INFO.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#A3B899]" aria-hidden="true" />
                <a
                  href={COMPANY_INFO.emailHref}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="border-t border-[#FAF8F4]/15 pt-3 text-xs leading-relaxed text-[#FAF8F4]/75">
                <p>{COMPANY_INFO.schedules.office}</p>
                <p className="mt-1">{COMPANY_INFO.schedules.loading}</p>
                <p className="mt-1">{COMPANY_INFO.schedules.weekends}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#FAF8F4]/15 pt-6 text-xs text-[#FAF8F4]/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {COMPANY_INFO.legalName}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white underline underline-offset-4 transition-colors"
            >
              Política de privacidad
            </button>
            <button
              type="button"
              onClick={() => onOpenCookies('policy')}
              className="hover:text-white underline underline-offset-4 transition-colors"
            >
              Política de cookies
            </button>
            <button
              type="button"
              onClick={() => onOpenCookies('settings')}
              className="hover:text-white underline underline-offset-4 transition-colors"
            >
              Gestión de cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
