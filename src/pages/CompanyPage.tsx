import {ArrowRight, FileDown, Mail, MapPin, Phone} from 'lucide-react';
import {Link, useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {
  COMPANY_INFO,
  FACILITY_ZONES,
  IMAGES,
  MANUFACTURING_STEPS,
} from '../data/company';
import {MediaFrame} from '../components/MediaFrame';

const FACILITY_GALLERY = [
  {
    title: 'Vista general de planta (+8 hectáreas)',
    caption: 'Explanadas exteriores, naves cubiertas y zonas de maniobra en La Torre de Esteban Hambrán.',
    image: IMAGES.manufacturingPlant,
    alt: 'Vista aérea de las instalaciones de más de 8 hectáreas de Abonos Naturales Hnos. Aguado',
  },
  {
    title: 'Zona de mezclado automatizado',
    caption: 'Tolvas dosificadoras y cintas mezcladoras para sustratos y formulaciones a medida.',
    image: IMAGES.substrateMixingZone,
    alt: 'Zona de mezclado industrial con tolvas para turbas, fibra de coco y perlita',
  },
  {
    title: 'Línea de envasado y paletizado',
    caption: 'Ensacado automatizado en formatos de 10L a 80L y paletizado robotizado.',
    image: IMAGES.automaticBaggingLine,
    alt: 'Línea automática de envasado de sacos y paletizado en planta',
  },
  {
    title: 'Cubierta de almacenamiento de producto terminado',
    caption: 'Naves cubiertas para proteger el producto ensacado frente a la humedad e intemperie.',
    image: IMAGES.coveredStorageWarehouse,
    alt: 'Nave cubierta de almacenamiento de producto terminado paletizado',
  },
  {
    title: 'Área de compostaje y maduración',
    caption: 'Fermentación controlada y volteo periódico de materia orgánica vegetal.',
    image: IMAGES.branchShredderCompost,
    alt: 'Zona de tratamiento y compostaje de restos vegetales en planta',
  },
  {
    title: 'Expedición y flota propia',
    caption: 'Carga directa en camión grúa, contenedor, bañera basculante o piso móvil.',
    image: IMAGES.craneDeliveryTruck,
    alt: 'Zona de carga y expedición logística con camión grúa',
  },
];

const INTEREST_LINKS = [
  {label: 'Enmienda orgánica', to: '/productos/abonos-y-enmiendas-organicas'},
  {label: 'Sustratos', to: '/productos/sustratos'},
  {label: 'Decorativo', to: '/productos/aridos-y-piedras-decorativas'},
  {label: 'Varios', to: '/productos/varios'},
  {label: 'Productos ecológicos', to: '/productos/productos-ecologicos'},
];

export function CompanyPage() {
  const {openQuoteModal} = useRouter();

  usePageSeo({
    title: 'Instalaciones en Toledo (+8 hectáreas) | Abonos Naturales Hnos. Aguado',
    description:
      'Instalaciones de más de 8 hectáreas en La Torre de Esteban Hambrán (Toledo), a 52 km de Madrid por la A-5: recepción, compostaje, envasado, paletizado y almacenamiento cubierto.',
    path: '/instalaciones',
  });

  return (
    <div className="bg-[#FAF8F4]">
      {/* Cabecera de página */}
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span>La Torre de Esteban Hambrán (Toledo) · A 52 km de Madrid (A-5 / N-V)</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-5xl">
            Instalaciones
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#3A403C] sm:text-lg">
            Nos encontramos ubicados en el término municipal de La Torre de
            Esteban Hambrán (Toledo), a tan sólo 52 km de Madrid por la Autovía
            de Extremadura (N-V / A-5).
          </p>
        </div>
      </section>

      {/* Estructura de más de 8 hectáreas */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <MediaFrame
                src={IMAGES.manufacturingPlant}
                alt="Vista aérea de las instalaciones de más de 8 hectáreas de Abonos Naturales Hnos. Aguado"
                aspectClass="h-full min-h-[340px]"
                className="rounded-lg border border-[#1F2421]/10"
              />
            </div>

            <div className="flex flex-col justify-center space-y-5 lg:col-span-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[#1F2421] sm:text-3xl">
                Más de 8 hectáreas estructuradas para dar el mejor servicio
              </h2>
              <p className="text-base leading-relaxed text-[#3A403C]">
                Con más de 8 hectáreas de superficie,{' '}
                <strong>{COMPANY_INFO.legalName}</strong> estructura sus
                instalaciones para ofrecer un mejor servicio a sus clientes.
              </p>
              <p className="text-base leading-relaxed text-[#3A403C]">
                Nuestra empresa se divide en cuatro secciones: zona de recepción
                de materia prima, de compostaje, envasado y paletizado. Además,
                contamos con cubierta de almacenamiento del producto terminado
                para garantizar su conservación óptima hasta la expedición.
              </p>

              <div className="grid grid-cols-2 gap-6 border-t border-[#1F2421]/10 pt-6">
                <div>
                  <p className="font-display text-2xl font-semibold text-[#1B3B2B] tabular-nums">
                    +8 hectáreas
                  </p>
                  <p className="mt-1 text-xs text-[#4C544F]">
                    Superficie operativa en La Torre de Esteban Hambrán
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold text-[#1B3B2B] tabular-nums">
                    52 km
                  </p>
                  <p className="mt-1 text-xs text-[#4C544F]">
                    De Madrid por la Autovía de Extremadura (N-V / A-5)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería industrial de las secciones de planta */}
      <section className="border-y border-[#1F2421]/10 bg-[#F3EFE6] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#5F6F52]">
              Recorrido por planta
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421]">
              Zonas productivas, mezclado, envasadora y naves cubiertas
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITY_GALLERY.map((item) => (
              <figure
                key={item.title}
                className="overflow-hidden rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4]"
              >
                <MediaFrame
                  src={item.image}
                  alt={item.alt}
                  aspectClass="aspect-[4/3]"
                />
                <figcaption className="p-5">
                  <h3 className="font-display text-base font-semibold text-[#1F2421]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4C544F]">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4 áreas de las instalaciones */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#5F6F52]">
              Organización operativa
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421]">
              Cuatro secciones especializadas en fábrica
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FACILITY_ZONES.map((zone) => (
              <div
                key={zone.id}
                className="rounded-lg border border-[#1F2421]/10 bg-white p-6"
              >
                <span className="font-mono text-xs text-[#6E4E37] tabular-nums">
                  Sección {zone.order}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-[#1F2421]">
                  {zone.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3A403C]">
                  {zone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de fabricación y "Siempre a tu disposición" */}
      <section className="border-t border-[#1F2421]/10 bg-[#F3EFE6] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#5F6F52]">
              Fabricación y control
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421]">
              Conocimiento, experiencia y control en cada proceso.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-[#1F2421]/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {MANUFACTURING_STEPS.map((step) => (
              <div key={step.order} className="space-y-2">
                <p className="font-mono text-xs text-[#6E4E37] tabular-nums">
                  {step.order}
                </p>
                <h3 className="font-display text-lg font-semibold text-[#1F2421]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4C544F]">
                  {step.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-8">
            <div>
              <p className="text-xs font-medium text-[#5F6F52]">
                Siempre a tu disposición
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-[#1F2421]">
                ¿Necesitas coordinar una carga, descarga o visita técnica?
              </h3>
              <p className="mt-1 text-sm text-[#4C544F]">
                {COMPANY_INFO.schedules.loading}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  openQuoteModal({
                    intent: 'presupuesto',
                    title: 'Solicitar presupuesto o cita en planta',
                  })
                }
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
              >
                Solicitar presupuesto
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <Link
                to="/contacto"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#1F2421]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#1F2421] hover:bg-[#F3EFE6]"
              >
                Ver mapa y cómo llegar
              </Link>
            </div>
          </div>

          {/* Bloque Sobre nosotros, De interés y Horarios */}
          <div className="mt-10 grid grid-cols-1 gap-8 rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6 sm:p-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h3 className="font-display text-base font-semibold text-[#1F2421]">
                Sobre nosotros
              </h3>
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
              <h3 className="font-display text-base font-semibold text-[#1F2421]">
                De interés
              </h3>
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
              <h3 className="font-display text-base font-semibold text-[#1F2421]">
                Horarios y contacto
              </h3>
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
