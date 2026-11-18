import {useEffect} from 'react';
import {trackPageView} from '../services/analytics';

interface SeoConfig {
  title: string;
  description: string;
  path: string;
  structuredData?: Record<string, unknown>;
}

function setMetaTag(selector: string, attribute: 'name' | 'property', key: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export function usePageSeo({title, description, path, structuredData}: SeoConfig): void {
  useEffect(() => {
    document.title = title;
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    const canonicalUrl = `${window.location.origin}${path}`;
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    const dynamicJsonLdId = 'dynamic-page-jsonld';
    const existingScript = document.getElementById(dynamicJsonLdId);
    if (existingScript) {
      existingScript.remove();
    }
    if (structuredData) {
      const script = document.createElement('script');
      script.id = dynamicJsonLdId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    trackPageView(path, title);
  }, [title, description, path, structuredData]);
}
