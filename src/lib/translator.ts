export interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {code: 'es', label: 'Español', nativeLabel: 'Español'},
  {code: 'en', label: 'Inglés', nativeLabel: 'English'},
  {code: 'fr', label: 'Francés', nativeLabel: 'Français'},
  {code: 'pt', label: 'Portugués', nativeLabel: 'Português'},
  {code: 'de', label: 'Alemán', nativeLabel: 'Deutsch'},
  {code: 'it', label: 'Italiano', nativeLabel: 'Italiano'},
  {code: 'ca', label: 'Catalán', nativeLabel: 'Català'},
  {code: 'gl', label: 'Gallego', nativeLabel: 'Galego'},
  {code: 'eu', label: 'Euskera', nativeLabel: 'Euskara'},
  {code: 'nl', label: 'Neerlandés', nativeLabel: 'Nederlands'},
  {code: 'pl', label: 'Polaco', nativeLabel: 'Polski'},
  {code: 'ro', label: 'Rumano', nativeLabel: 'Română'},
  {code: 'ar', label: 'Árabe', nativeLabel: 'العربية', rtl: true},
  {code: 'zh-CN', label: 'Chino', nativeLabel: '中文'},
];

const STORAGE_KEY = 'abonos_selected_language';

/**
 * Diccionario de respaldo inmediato para UI, navegación, secciones y catálogo
 * cuando el script externo de Google Translate no esté disponible en el entorno.
 */
const DICTIONARY: Record<string, Record<string, string>> = {
  en: {
    'Inicio': 'Home',
    'Quiénes somos': 'About Us',
    'Instalaciones': 'Facilities',
    'Productos': 'Products',
    'Nuestros servicios': 'Our Services',
    'Aplicaciones': 'Applications',
    'Contacto': 'Contact',
    'Trabaja con nosotros': 'Work with us',
    'Solicitar presupuesto': 'Request a Quote',
    'Ver catálogo de productos': 'View Product Catalog',
    'Contacta con nosotros': 'Contact Us',
    'Contacto y ubicación de planta': 'Contact and Plant Location',
    'Dónde estamos': 'Where We Are',
    'Datos de contacto': 'Contact Information',
    'Horario de oficina': 'Office Hours',
    'Teléfonos': 'Phones',
    'Nombre': 'Name',
    'Nombre *': 'Name *',
    'Nombre y Apellidos *': 'Full Name *',
    'Teléfono': 'Phone',
    'Teléfono *': 'Phone *',
    'Email *': 'Email *',
    'Correo *': 'Email *',
    'Consulta *': 'Inquiry *',
    'No soy un robot': 'I am not a robot',
    'Verificación': 'Verification',
    'Enviar consulta': 'Send Inquiry',
    'Enviar': 'Send',
    'Anterior': 'Previous',
    'Siguiente': 'Next',
    'Política de privacidad': 'Privacy Policy',
    'Política de cookies': 'Cookie Policy',
    'Gestión de cookies': 'Cookie Settings',
    'Sobre nosotros': 'About Us',
    'De interés': 'Of Interest',
    'Descarga nuestro catálogo [PDF]': 'Download our catalog [PDF]',
    'Fabricación propia de abonos naturales, mantillos y sustratos':
      'In-house manufacturing of natural fertilizers, mulches, and substrates',
    'Fabricación de abonos naturales y sustratos profesionales':
      'Manufacturing of natural fertilizers and professional substrates',
    'Gamas principales': 'Main Product Ranges',
    'Ver ficha': 'View details',
    'Ver gama completa': 'View full range',
    'Mañanas: de 08:00h a 13:30h': 'Mornings: 08:00 to 13:30',
    'Tardes: de 15:00h a 19:00h': 'Afternoons: 15:00 to 19:00',
    'Sábados y domingos: cerrado': 'Saturdays and Sundays: closed',
    '¿QUIERES TRABAJAR CON NOSOTROS?': 'DO YOU WANT TO WORK WITH US?',
    '¿Quieres trabajar con nosotros?': 'Do you want to work with us?',
    'Ir a Trabaja con nosotros': 'Go to Work with us',
    'Seleccionar archivo': 'Select file',
    'Ningún archivo seleccionado': 'No file selected',
    'Haz click aquí para ver las condiciones legales.':
      'Click here to view the legal terms.',
  },
  fr: {
    'Inicio': 'Accueil',
    'Quiénes somos': 'Qui sommes-nous',
    'Instalaciones': 'Installations',
    'Productos': 'Produits',
    'Nuestros servicios': 'Nos services',
    'Aplicaciones': 'Applications',
    'Contacto': 'Contact',
    'Trabaja con nosotros': 'Rejoignez-nous',
    'Solicitar presupuesto': 'Demander un devis',
    'Ver catálogo de productos': 'Voir le catalogue',
    'Contacta con nosotros': 'Contactez-nous',
    'Dónde estamos': 'Où nous trouver',
    'Datos de contacto': 'Coordonnées',
    'Horario de oficina': 'Heures de bureau',
    'Teléfonos': 'Téléphones',
    'Nombre *': 'Nom *',
    'Nombre y Apellidos *': 'Nom et Prénom *',
    'Teléfono *': 'Téléphone *',
    'Email *': 'E-mail *',
    'Correo *': 'E-mail *',
    'Consulta *': 'Demande *',
    'No soy un robot': 'Je ne suis pas un robot',
    'Verificación': 'Vérification',
    'Enviar consulta': 'Envoyer la demande',
    'Enviar': 'Envoyer',
    'Anterior': 'Précédent',
    'Siguiente': 'Suivant',
    'Política de privacidad': 'Politique de confidentialité',
    'Política de cookies': 'Politique de cookies',
    'Gestión de cookies': 'Gestion des cookies',
    'Sobre nosotros': 'À propos de nous',
    'De interés': 'À découvrir',
    'Descarga nuestro catálogo [PDF]': 'Télécharger notre catalogue [PDF]',
    'Mañanas: de 08:00h a 13:30h': 'Matin : 08h00 à 13h30',
    'Tardes: de 15:00h a 19:00h': 'Après-midi : 15h00 à 19h00',
    'Sábados y domingos: cerrado': 'Samedi et dimanche : fermé',
    '¿QUIERES TRABAJAR CON NOSOTROS?': 'VOULEZ-VOUS TRAVAILLER AVEC NOUS ?',
    'Seleccionar archivo': 'Choisir un fichier',
    'Ningún archivo seleccionado': 'Aucun fichier sélectionné',
  },
  pt: {
    'Inicio': 'Início',
    'Quiénes somos': 'Quem somos',
    'Instalaciones': 'Instalações',
    'Productos': 'Produtos',
    'Nuestros servicios': 'Os nossos serviços',
    'Aplicaciones': 'Aplicações',
    'Contacto': 'Contacto',
    'Trabaja con nosotros': 'Trabalhe connosco',
    'Solicitar presupuesto': 'Pedir orçamento',
    'Ver catálogo de productos': 'Ver catálogo de produtos',
    'Contacta con nosotros': 'Contacte-nos',
    'Dónde estamos': 'Onde estamos',
    'Datos de contacto': 'Dados de contacto',
    'Horario de oficina': 'Horário de escritório',
    'Teléfonos': 'Telefones',
    'Nombre *': 'Nome *',
    'Nombre y Apellidos *': 'Nome completo *',
    'Teléfono *': 'Telefone *',
    'Email *': 'Email *',
    'Correo *': 'Email *',
    'Consulta *': 'Consulta *',
    'No soy un robot': 'Não sou um robô',
    'Verificación': 'Verificação',
    'Enviar consulta': 'Enviar consulta',
    'Enviar': 'Enviar',
    'Anterior': 'Anterior',
    'Siguiente': 'Seguinte',
    'Política de privacidad': 'Política de privacidade',
    'Política de cookies': 'Política de cookies',
    'Gestión de cookies': 'Gestão de cookies',
    'Sobre nosotros': 'Sobre nós',
    'De interés': 'De interesse',
    'Descarga nuestro catálogo [PDF]': 'Descarregar catálogo [PDF]',
    'Mañanas: de 08:00h a 13:30h': 'Manhãs: das 08:00h às 13:30h',
    'Tardes: de 15:00h a 19:00h': 'Tardes: das 15:00h às 19:00h',
    'Sábados y domingos: cerrado': 'Sábados e domingos: encerrado',
  },
  de: {
    'Inicio': 'Startseite',
    'Quiénes somos': 'Über uns',
    'Instalaciones': 'Anlagen',
    'Productos': 'Produkte',
    'Nuestros servicios': 'Unsere Leistungen',
    'Aplicaciones': 'Anwendungen',
    'Contacto': 'Kontakt',
    'Trabaja con nosotros': 'Karriere',
    'Solicitar presupuesto': 'Angebot anfordern',
    'Ver catálogo de productos': 'Produktkatalog ansehen',
    'Contacta con nosotros': 'Kontaktieren Sie uns',
    'Dónde estamos': 'Standort',
    'Datos de contacto': 'Kontaktdaten',
    'Horario de oficina': 'Bürozeiten',
    'Teléfonos': 'Telefon',
    'Nombre *': 'Name *',
    'Nombre y Apellidos *': 'Vor- und Nachname *',
    'Teléfono *': 'Telefon *',
    'Email *': 'E-Mail *',
    'Correo *': 'E-Mail *',
    'Consulta *': 'Anfrage *',
    'No soy un robot': 'Ich bin kein Roboter',
    'Verificación': 'Verifizierung',
    'Enviar consulta': 'Anfrage senden',
    'Enviar': 'Senden',
    'Anterior': 'Zurück',
    'Siguiente': 'Weiter',
    'Política de privacidad': 'Datenschutz',
    'Política de cookies': 'Cookie-Richtlinie',
    'Gestión de cookies': 'Cookie-Einstellungen',
    'Sobre nosotros': 'Über uns',
    'Mañanas: de 08:00h a 13:30h': 'Vormittags: 08:00 bis 13:30 Uhr',
    'Tardes: de 15:00h a 19:00h': 'Nachmittags: 15:00 bis 19:00 Uhr',
    'Sábados y domingos: cerrado': 'Samstag und Sonntag: geschlossen',
  },
  it: {
    'Inicio': 'Home',
    'Quiénes somos': 'Chi siamo',
    'Instalaciones': 'Impianti',
    'Productos': 'Prodotti',
    'Nuestros servicios': 'I nostri servizi',
    'Aplicaciones': 'Applicazioni',
    'Contacto': 'Contatti',
    'Trabaja con nosotros': 'Lavora con noi',
    'Solicitar presupuesto': 'Richiedi preventivo',
    'Ver catálogo de productos': 'Vedi catalogo prodotti',
    'Contacta con nosotros': 'Contattaci',
    'Dónde estamos': 'Dove siamo',
    'Datos de contacto': 'Dati di contatto',
    'Horario de oficina': 'Orari di ufficio',
    'Teléfonos': 'Telefoni',
    'Nombre *': 'Nome *',
    'Teléfono *': 'Telefono *',
    'Email *': 'Email *',
    'Consulta *': 'Richiesta *',
    'No soy un robot': 'Non sono un robot',
    'Verificación': 'Verifica',
    'Enviar consulta': 'Invia richiesta',
    'Enviar': 'Invia',
    'Política de privacidad': 'Privacy Policy',
    'Política de cookies': 'Cookie Policy',
    'Gestión de cookies': 'Gestione cookie',
  },
  ca: {
    'Inicio': 'Inici',
    'Quiénes somos': 'Qui som',
    'Instalaciones': 'Instal·lacions',
    'Productos': 'Productes',
    'Nuestros servicios': 'Els nostres serveis',
    'Aplicaciones': 'Aplicacions',
    'Contacto': 'Contacte',
    'Trabaja con nosotros': 'Treballa amb nosaltres',
    'Solicitar presupuesto': 'Sol·licitar pressupost',
    'Ver catálogo de productos': 'Veure catàleg de productes',
    'Contacta con nosotros': 'Contacta amb nosaltres',
    'Dónde estamos': 'On som',
    'Datos de contacto': 'Dades de contacte',
    'Horario de oficina': "Horari d'oficina",
    'Nombre *': 'Nom *',
    'Teléfono *': 'Telèfon *',
    'Consulta *': 'Consulta *',
    'No soy un robot': 'No soc un robot',
    'Enviar consulta': 'Enviar consulta',
    'Enviar': 'Enviar',
    'Política de privacidad': 'Política de privacitat',
    'Política de cookies': 'Política de cookies',
    'Gestión de cookies': 'Gestió de cookies',
  },
  nl: {
    'Inicio': 'Home',
    'Quiénes somos': 'Over ons',
    'Instalaciones': 'Faciliteiten',
    'Productos': 'Producten',
    'Nuestros servicios': 'Onze diensten',
    'Aplicaciones': 'Toepassingen',
    'Contacto': 'Contact',
    'Trabaja con nosotros': 'Werken bij ons',
    'Solicitar presupuesto': 'Offerte aanvragen',
    'Contacta con nosotros': 'Neem contact op',
    'No soy un robot': 'Ik ben geen robot',
    'Enviar consulta': 'Verstuur aanvraag',
    'Enviar': 'Versturen',
  },
};

const originalTextMap = new WeakMap<Text, string>();
let activeObserver: MutationObserver | null = null;
let googleScriptRequested = false;

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages?: string;
              autoDisplay?: boolean;
            },
            elementId: string
          ): unknown;
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export function getSavedLanguage(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'es';
  } catch {
    return 'es';
  }
}

export function initGoogleTranslateWidget() {
  if (typeof window === 'undefined' || googleScriptRequested) {
    return;
  }
  googleScriptRequested = true;

  if (!document.getElementById('google_translate_element')) {
    const holder = document.createElement('div');
    holder.id = 'google_translate_element';
    holder.className = 'sr-only';
    holder.setAttribute('aria-hidden', 'true');
    document.body.appendChild(holder);
  }

  window.googleTranslateElementInit = () => {
    const Ctor = window.google?.translate?.TranslateElement;
    if (!Ctor) {
      return;
    }
    new Ctor(
      {
        pageLanguage: 'es',
        includedLanguages: SUPPORTED_LANGUAGES.map((l) => l.code).join(','),
        autoDisplay: false,
      },
      'google_translate_element'
    );

    const saved = getSavedLanguage();
    if (saved && saved !== 'es') {
      triggerGoogleCombo(saved);
    }
  };

  const script = document.createElement('script');
  script.src =
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  script.onerror = () => {
    // Si el script externo no está disponible, se usará la traducción local integrada
  };
  document.head.appendChild(script);
}

function triggerGoogleCombo(langCode: string): boolean {
  const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (!combo) {
    return false;
  }
  combo.value = langCode === 'es' ? '' : langCode;
  combo.dispatchEvent(new Event('change', {bubbles: true}));
  return true;
}

function setGoogleTranslateCookie(langCode: string) {
  if (typeof document === 'undefined') {
    return;
  }
  if (langCode === 'es') {
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  } else {
    document.cookie = `googtrans=/es/${langCode}; path=/`;
  }
}

function walkAndTranslateDom(root: Node, langCode: string) {
  const dict = DICTIONARY[langCode];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null = walker.nextNode();

  while (node) {
    const textNode = node as Text;
    const parentEl = textNode.parentElement;
    if (
      parentEl &&
      !parentEl.closest('.notranslate') &&
      !['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'OPTION'].includes(
        parentEl.tagName
      )
    ) {
      if (!originalTextMap.has(textNode)) {
        originalTextMap.set(textNode, textNode.nodeValue || '');
      }
      const original = originalTextMap.get(textNode) || '';
      const trimmed = original.trim();

      if (langCode === 'es') {
        if (textNode.nodeValue !== original) {
          textNode.nodeValue = original;
        }
      } else if (dict && trimmed && dict[trimmed]) {
        const leading = original.match(/^\s*/)?.[0] ?? '';
        const trailing = original.match(/\s*$/)?.[0] ?? '';
        const nextValue = `${leading}${dict[trimmed]}${trailing}`;
        if (textNode.nodeValue !== nextValue) {
          textNode.nodeValue = nextValue;
        }
      }
    }
    node = walker.nextNode();
  }
}

function syncObserver(langCode: string) {
  if (activeObserver) {
    activeObserver.disconnect();
    activeObserver = null;
  }
  if (langCode === 'es') {
    return;
  }
  const root = document.getElementById('root');
  if (!root) {
    return;
  }
  activeObserver = new MutationObserver(() => {
    if (
      document.documentElement.classList.contains('translated-ltr') ||
      document.documentElement.classList.contains('translated-rtl')
    ) {
      return;
    }
    walkAndTranslateDom(root, langCode);
  });
  activeObserver.observe(root, {childList: true, subtree: true});
}

export function applySiteLanguage(langCode: string) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, langCode);
  } catch {
    // ignore storage errors
  }

  const meta = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
  document.documentElement.lang = langCode;
  document.documentElement.dir = meta?.rtl ? 'rtl' : 'ltr';

  setGoogleTranslateCookie(langCode);
  const usedGoogle = triggerGoogleCombo(langCode);

  const root = document.getElementById('root');
  if (!root) {
    return;
  }

  if (langCode === 'es') {
    if (activeObserver) {
      activeObserver.disconnect();
      activeObserver = null;
    }
    walkAndTranslateDom(root, 'es');
    return;
  }

  // Si Google Translate aún no ha traducido el DOM, aplicamos diccionario de respaldo
  window.setTimeout(
    () => {
      const googleActive =
        document.documentElement.classList.contains('translated-ltr') ||
        document.documentElement.classList.contains('translated-rtl');
      if (!googleActive) {
        walkAndTranslateDom(root, langCode);
        syncObserver(langCode);
      }
    },
    usedGoogle ? 500 : 50
  );
}
