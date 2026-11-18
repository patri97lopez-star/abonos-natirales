declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let initialized = false;

export function initAnalytics(): void {
  if (initialized || !GA_ID || typeof window === 'undefined') {
    return;
  }
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {anonymize_ip: true});

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
}

export function trackPageView(path: string, title: string): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) {
    return;
  }
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) {
    return;
  }
  window.gtag('event', eventName, params);
}
