import {ArrowRight, Check, FileDown, Mail, Phone} from 'lucide-react';
import {Link, useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {COMPANY_INFO, IMAGES} from '../data/company';
import {MediaFrame} from '../components/MediaFrame';

interface ApplicationSector {
  id: string;
  order: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  closingNote: string;
  image: string;
  imageAlt: string;
  projectTypeValue: string;
  ctaLabel: string;
}

const APPLICATION_SECTORS: ApplicationSector[] = [
  {
    id: 'paisajismo',
    order: '01',
    eyebrow: 'Paisajismo',
    title: 'Paisajismo',
    subtitle: 'Soluciones a medida para paisajistas y profesionales del verde',
    description:
      'En Abonos Naturales Hnos. Aguado, entendemos que cada proyecto paisajístico es único. Por eso, ofrecemos sustratos personalizados adaptados a las necesidades específicas de tus plantas, entorno y diseño.',
    highlights: [
      'Mezclas a medida según tipo de planta, clima y requerimientos técnicos',
      'Asesoramiento experto para garantizar el mejor rendimiento y estética',
    ],
    closingNote:
      'Confía en nosotros para dar vida a tus espacios verdes con la base que todo jardín necesita: un sustrato de calidad.',
    image: IMAGES.landscapeGardenDesign,
    imageAlt:
      'Proyecto de paisajismo mediterráneo con sustratos y acolchado orgánico alrededor de plantas ornamentales',
    projectTypeValue: 'Paisajismo y jardinería',
    ctaLabel: 'Solicitar asesoramiento para paisajismo',
  },
  {
    id: 'obra-publica',
    order: '02',
    eyebrow: 'Obra Pública',
    title: 'Obra civil y obra pública',
    subtitle: 'Sustratos profesionales para proyectos de obra pública',
    description:
      'Colaboramos con administraciones, contratistas y empresas de jardinería urbana para ofrecer sustratos técnicos de alta calidad, diseñados para cumplir con los requisitos más exigentes de la obra pública.',
    highlights: [
      'Suministro a gran escala para parques, rotondas, medianas, zonas verdes y restauración paisajística',
      'Mezclas personalizadas según especificaciones del proyecto y normativas locales',
      'Logística eficiente y cumplimiento de plazos en obras públicas y licitaciones',
    ],
    closingNote:
      'Contribuimos a crear espacios públicos más verdes, sostenibles y duraderos desde la base: el sustrato.',
    image: IMAGES.urbanPublicPark,
    imageAlt:
      'Parque urbano y mediana ajardinada de obra pública con sustratos técnicos alrededor del arbolado',
    projectTypeValue: 'Obra civil / Administración pública',
    ctaLabel: 'Solicitar suministro para obra pública',
  },
  {
    id: 'viveros',
    order: '03',
    eyebrow: 'Viveros',
    title: 'Garden y viveros',
    subtitle: 'Sustratos profesionales también para viveros',
    description:
      'Colaboramos estrechamente con viveros y centros de jardinería, ofreciendo sustratos de alta calidad adaptados a cada tipo de planta y etapa de cultivo.',
    highlights: [
      'Formatos disponibles: sacos de 10L, 20L, 35L, 50L y 80L. Además podemos envasar tu mezcla en un saco diferente.',
      'Mezclas específicas para cactus, crasas, plantas ornamentales, forestales y más',
      'Suministro flexible: desde pequeños pedidos hasta grandes volúmenes',
    ],
    closingNote:
      'Ofrecemos soluciones prácticas, eficientes y listas para usar, pensadas para facilitar el trabajo diario en el vivero y garantizar el mejor desarrollo vegetal.',
    image: IMAGES.commercialNursery,
    imageAlt:
      'Vivero y centro de jardinería profesional con cultivo en contenedor y suministro paletizado',
    projectTypeValue: 'Garden o vivero',
    ctaLabel: 'Solicitar presupuesto para vivero o garden',
  },
];

const INTEREST_LINKS = [
  {label: 'Enmienda orgánica', to: '/productos/abonos-y-enmiendas-organicas'},
  {label: 'Sustratos', to: '/productos/sustratos'},
  {label: 'Decorativo', to: '/productos/aridos-y-piedras-decorativas'},
  {label: 'Varios', to: '/productos/varios'},
  {label: 'Productos ecológicos', to: '/productos/productos-ecologicos'},
];

export function ApplicationsPage() {
  const {openQuoteModal} = useRouter();

  usePageSeo({
    title: 'Aplicaciones: Paisajismo, Obra Pública y Viveros | Abonos Naturales',
    description:
      'Sustratos profesionales y mezclas a medida para paisajismo, obra civil y obra pública, gardens y viveros. Sacos de 10L a 80L, envasado personalizado y granel.',
    path: '/aplicaciones',
  });

  return (
    <div className="bg-[#FAF8F4]">
      {/* Cabecera */}
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#5F6F52]">
            Aplicaciones profesionales · Abonos Naturales Hnos. Aguado
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-5xl">
            Aplicaciones
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3A403C] sm:text-lg">
            Sustratos profesionales, enmiendas y mezclas adaptadas a las
            exigencias de paisajistas, proyectos de obra civil y obra pública,
            gardens y viveros productores.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {APPLICATION_SECTORS.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="inline-flex min-h-10 items-center rounded-md border border-[#1F2421]/15 bg-[#FAF8F4] px-4 py-2 text-xs font-medium text-[#1F2421] transition-colors hover:border-[#1B3B2B] hover:bg-white"
              >
                {sec.order}. {sec.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bloques de aplicación */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:space-y-24 lg:px-8">
          {APPLICATION_SECTORS.map((sector, index) => {
            const reverseOnDesktop = index % 2 === 1;
            return (
              <article
                id={sector.id}
                key={sector.id}
                className="grid grid-cols-1 items-stretch gap-10 scroll-mt-24 lg:grid-cols-12 lg:gap-12"
              >
                <div
                  className={`lg:col-span-6 ${
                    reverseOnDesktop ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <MediaFrame
                    src={sector.image}
                    alt={sector.imageAlt}
                    aspectClass="h-full min-h-[320px]"
                    className="rounded-lg border border-[#1F2421]/10"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center lg:col-span-6 ${
                    reverseOnDesktop ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <p className="font-mono text-xs text-[#6E4E37] tabular-nums">
                    {sector.order} · {sector.eyebrow}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421]">
                    {sector.title}
                  </h2>
                  <p className="mt-1.5 text-base font-medium text-[#5F6F52]">
                    {sector.subtitle}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[#3A403C]">
                    {sector.description}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-[#1F2421]/10 pt-5">
                    {sector.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm font-medium text-[#1F2421]"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-sm leading-relaxed text-[#4C544F]">
                    {sector.closingNote}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        openQuoteModal({
                          intent: 'presupuesto',
                          projectType: sector.projectTypeValue,
                          title: `${sector.title} · Solicitar presupuesto`,
                        })
                      }
                      className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
                    >
                      {sector.ctaLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <Link
                      to="/productos/sustratos"
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#1F2421]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#1F2421] hover:bg-[#F3EFE6]"
                    >
                      Ver gama de sustratos
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bloque Sobre nosotros, De interés y Horarios */}
      <section className="border-t border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6 sm:p-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-base font-semibold text-[#1F2421]">
                Sobre nosotros
              </h2>
              <p className="mt-2 font-mono text-xs text-[#6E4E37]">
                N.º NIMA {COMPANY_INFO.nima}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#3A403C]">
                <li>
                  <Link
                    to="/sostenibilidad"
                    className="hover:text-[#1B3B2B] hover:underline underline-offset-4"
                  >
                    Política de Calidad y Medio Ambiente
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sostenibilidad"
                    className="hover:text-[#1B3B2B] hover:underline underline-offset-4"
                  >
                    Certificaciones
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        intent: 'ficha_tecnica',
                        productInterest: 'Catálogo general PDF',
                        title: 'Descarga / Solicitud de catálogo [PDF]',
                      })
                    }
                    className="inline-flex items-center gap-1.5 font-medium text-[#1B3B2B] hover:underline underline-offset-4"
                  >
                    <FileDown className="h-4 w-4" aria-hidden="true" />
                    Descarga nuestro catálogo [PDF]
                  </button>
                </li>
              </ul>
            </div>

            <div className="border-t border-[#1F2421]/10 pt-5 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h2 className="font-display text-base font-semibold text-[#1F2421]">
                De interés
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-[#3A403C]">
                {INTEREST_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="hover:text-[#1B3B2B] hover:underline underline-offset-4"
                    >
                      · {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#1F2421]/10 pt-5 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h2 className="font-display text-base font-semibold text-[#1F2421]">
                Horarios y contacto
              </h2>
              <div className="mt-3 space-y-2 text-xs text-[#3A403C]">
                <p>
                  <strong className="text-[#1F2421]">Horario de oficina:</strong>{' '}
                  Lunes a viernes · De 08:00h a 13:30h y de 15:00h a 19:00h
                </p>
                <p>
                  <strong className="text-[#1F2421]">
                    Horario de cargas/descargas:
                  </strong>{' '}
                  08:00h a 13:00h y 15:00h a 18:30h
                </p>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <a
                  href={COMPANY_INFO.emailHref}
                  className="flex items-center gap-2 font-medium text-[#1B3B2B] hover:text-[#6E4E37]"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {COMPANY_INFO.email}
                </a>
                <a
                  href={COMPANY_INFO.phonePrimaryHref}
                  className="flex items-center gap-2 font-mono font-medium text-[#1B3B2B] tabular-nums hover:text-[#6E4E37]"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {COMPANY_INFO.phonePrimary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
