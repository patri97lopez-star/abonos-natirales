import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';

export interface QuotePrefill {
  intent?: 'presupuesto' | 'asesoramiento' | 'contacto' | 'ficha_tecnica';
  productInterest?: string;
  projectType?: string;
  title?: string;
}

export type LegalModalTabState = 'privacy' | 'legal' | null;
export type CookieModalTabState = 'policy' | 'settings' | null;

interface RouterContextValue {
  pathname: string;
  navigate: (to: string) => void;
  quoteModalOpen: boolean;
  quotePrefill: QuotePrefill;
  openQuoteModal: (prefill?: QuotePrefill) => void;
  closeQuoteModal: () => void;
  legalModalTab: LegalModalTabState;
  openLegalModal: (tab: Exclude<LegalModalTabState, null>) => void;
  closeLegalModal: () => void;
  cookieModalTab: CookieModalTabState;
  openCookieModal: (tab: Exclude<CookieModalTabState, null>) => void;
  closeCookieModal: () => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function normalizePathname(raw: string): string {
  if (!raw || raw === '/') {
    return '/';
  }
  const clean = raw.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return clean || '/';
}

export function RouterProvider({children}: {children: React.ReactNode}) {
  const [pathname, setPathname] = useState<string>(() =>
    normalizePathname(typeof window !== 'undefined' ? window.location.pathname : '/')
  );
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState<QuotePrefill>({});
  const [legalModalTab, setLegalModalTab] = useState<LegalModalTabState>(null);
  const [cookieModalTab, setCookieModalTab] = useState<CookieModalTabState>(null);

  useEffect(() => {
    const onPopState = () => {
      setPathname(normalizePathname(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    const [pathPart, hashPart] = to.split('#');
    const targetPath = normalizePathname(pathPart || '/');

    if (targetPath !== normalizePathname(window.location.pathname)) {
      window.history.pushState({}, '', to);
      setPathname(targetPath);
    }

    if (hashPart) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      });
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }, []);

  const openQuoteModal = useCallback((prefill: QuotePrefill = {}) => {
    setQuotePrefill(prefill);
    setQuoteModalOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setQuoteModalOpen(false);
  }, []);

  const openLegalModal = useCallback((tab: Exclude<LegalModalTabState, null>) => {
    setLegalModalTab(tab);
  }, []);

  const closeLegalModal = useCallback(() => {
    setLegalModalTab(null);
  }, []);

  const openCookieModal = useCallback((tab: Exclude<CookieModalTabState, null>) => {
    setCookieModalTab(tab);
  }, []);

  const closeCookieModal = useCallback(() => {
    setCookieModalTab(null);
  }, []);

  return (
    <RouterContext.Provider
      value={{
        pathname,
        navigate,
        quoteModalOpen,
        quotePrefill,
        openQuoteModal,
        closeQuoteModal,
        legalModalTab,
        openLegalModal,
        closeLegalModal,
        cookieModalTab,
        openCookieModal,
        closeCookieModal,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter debe utilizarse dentro de RouterProvider');
  }
  return ctx;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function Link({to, onClick, children, ...rest}: LinkProps) {
  const {navigate} = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
