import {useEffect} from 'react';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {QuoteModal} from './components/QuoteModal';
import {CookieModal} from './components/CookieModal';
import {LegalModal, type LegalModalTab} from './components/LegalModal';
import {Link, RouterProvider, useRouter} from './lib/router';
import {initAnalytics} from './services/analytics';
import {
  applySiteLanguage,
  getSavedLanguage,
  initGoogleTranslateWidget,
} from './lib/translator';
import {HomePage} from './pages/HomePage';
import {QuienesSomosPage} from './pages/QuienesSomosPage';
import {CompanyPage} from './pages/CompanyPage';
import {CatalogPage} from './pages/CatalogPage';
import {CategoryPage} from './pages/CategoryPage';
import {ProductDetailPage} from './pages/ProductDetailPage';
import {ServicesPage} from './pages/ServicesPage';
import {ApplicationsPage} from './pages/ApplicationsPage';
import {SolutionsPage} from './pages/SolutionsPage';
import {SustainabilityPage} from './pages/SustainabilityPage';
import {ContactPage} from './pages/ContactPage';
import {CareersPage} from './pages/CareersPage';

function PageSwitch({
  onOpenLegal,
}: {
  onOpenLegal: (tab: Exclude<LegalModalTab, null>) => void;
}) {
  const {pathname} = useRouter();

  if (pathname === '/') {
    return <HomePage />;
  }
  if (pathname === '/quienes-somos') {
    return <QuienesSomosPage />;
  }
  if (pathname === '/empresa' || pathname === '/instalaciones') {
    return <CompanyPage />;
  }
  if (pathname === '/productos') {
    return <CatalogPage />;
  }
  if (pathname.startsWith('/productos/')) {
    const categorySlug = pathname.replace('/productos/', '');
    return <CategoryPage categorySlug={categorySlug} />;
  }
  if (pathname.startsWith('/producto/')) {
    const productSlug = pathname.replace('/producto/', '');
    return <ProductDetailPage productSlug={productSlug} />;
  }
  if (pathname === '/nuestros-servicios') {
    return <ServicesPage />;
  }
  if (pathname === '/aplicaciones') {
    return <ApplicationsPage />;
  }
  if (pathname === '/soluciones-profesionales') {
    return <SolutionsPage />;
  }
  if (pathname === '/sostenibilidad') {
    return <SustainabilityPage />;
  }
  if (pathname === '/contacto') {
    return <ContactPage />;
  }
  if (pathname === '/trabaja-con-nosotros') {
    return <CareersPage onOpenLegal={onOpenLegal} />;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="font-mono text-xs text-[#6E4E37]">Error 404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-[#1F2421]">
        Página no encontrada
      </h1>
      <p className="mt-3 text-base text-[#4C544F]">
        La dirección solicitada no está disponible. Puedes volver al inicio o
        explorar nuestro catálogo de productos.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-[#FAF8F4]"
        >
          Ir al inicio
        </Link>
        <Link
          to="/productos"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#1F2421]/20 px-5 py-2.5 text-sm font-medium text-[#1F2421]"
        >
          Ver catálogo
        </Link>
      </div>
    </section>
  );
}

function AppShell() {
  const {
    cookieModalTab,
    openCookieModal,
    closeCookieModal,
    legalModalTab,
    openLegalModal,
    closeLegalModal,
  } = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F4] text-[#1F2421]">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#1B3B2B] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Saltar al contenido principal
      </a>
      <Header />
      <main id="contenido-principal" className="flex-1">
        <PageSwitch onOpenLegal={(tab) => openLegalModal(tab)} />
      </main>
      <Footer
        onOpenCookies={(tab) => openCookieModal(tab)}
        onOpenLegal={(tab) => openLegalModal(tab)}
      />
      <QuoteModal />
      <CookieModal
        activeTab={cookieModalTab}
        onClose={closeCookieModal}
        onChangeTab={(tab) => openCookieModal(tab)}
      />
      <LegalModal
        activeTab={legalModalTab}
        onClose={closeLegalModal}
        onChangeTab={(tab) => openLegalModal(tab)}
      />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    initAnalytics();
    initGoogleTranslateWidget();
    const saved = getSavedLanguage();
    if (saved && saved !== 'es') {
      applySiteLanguage(saved);
    }
  }, []);

  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}
