import {ArrowRight, Check, FileDown, Mail, Phone, Recycle, ShieldCheck, Truck} from 'lucide-react';
import {Link, useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {COMPANY_INFO, IMAGES} from '../data/company';
import {MediaFrame} from '../components/MediaFrame';

interface FleetItem {
  name: string;
  capacityNote: string;
  image: string;
  imageAlt: string;
}

const FLEET_VEHICLES: FleetItem[] = [
  {
    name: 'Camión grúa hasta 7m',
    capacityNote: 'Descarga directa de palets y big-bag con brazo hidráulico de hasta 7 metros.',
    image: IMAGES.craneDeliveryTruck,
    imageAlt: 'Camión grúa hasta 7 metros descargando material paletizado',
  },
  {
    name: 'Camión hasta 8 Tm',
    capacityNote: 'Distribución ágil para accesos urbanos, gardens y obras de tamaño medio.',
    image: IMAGES.craneDeliveryTruck,
    imageAlt: 'Camión de distribución de hasta 8 toneladas en zona de carga',
  },
  {
    name: 'Camión con contenedor hasta 18 Tm',
    capacityNote: 'Suministro y retirada con contenedores portacontenedores de hasta 18 toneladas.',
    image: IMAGES.wasteContainerRental,
    imageAlt: 'Contenedor industrial para transporte y gestión de hasta 18 toneladas',
  },
  {
    name: 'Camión con contenedor hasta 26 Tm',
    capacityNote: 'Mayor capacidad de carga en contenedor para grandes proyectos y podas.',
    image: IMAGES.wasteContainerRental,
    imageAlt: 'Servicio de camión con contenedor de hasta 26 toneladas',
  },
  {
    name: 'Tráiler con bañera basculante',
    capacityNote: 'Suministro a granel de grandes volúmenes para obra pública, viveros y explotaciones.',
    image: IMAGES.tipperTrailerBulk,
    imageAlt: 'Tráiler con bañera basculante descargando sustrato a granel',
  },
  {
    name: 'Tráiler con piso móvil',
    capacityNote: 'Descarga horizontal controlada en naves cubiertas o zonas con limitación de altura.',
    image: IMAGES.tipperTrailerBulk,
    imageAlt: 'Tráiler de gran volumen para transporte de sustratos y enmiendas',
  },
];

const WASTE_SERVICES = [
  {
    title: 'Servicio de alquiler de contenedor',
    description:
      'Colocación y retirada de contenedores en fincas, obras, ayuntamientos y empresas de jardinería para la recogida ordenada de restos vegetales.',
    image: IMAGES.wasteContainerRental,
    imageAlt: 'Contenedor verde para recogida de restos de poda y jardinería',
  },
  {
    title: 'Picado y retirada de residuos vegetales',
    description:
      'Triturado en origen o retirada hacia nuestra planta autorizada (NIMA 4570003519) para su compostaje y valorización orgánica.',
    image: IMAGES.branchShredderCompost,
    imageAlt: 'Maquinaria de picado y triturado de ramas y restos vegetales',
  },
];

const INTEREST_LINKS = [
  {label: 'Enmienda orgánica', to: '/productos/abonos-y-enmiendas-organicas'},
  {label: 'Sustratos', to: '/productos/sustratos'},
  {label: 'Decorativo', to: '/productos/aridos-y-piedras-decorativas'},
  {label: 'Varios', to: '/productos/varios'},
  {label: 'Productos ecológicos', to: '/productos/productos-ecologicos'},
];

export function ServicesPage() {
  const {openQuoteModal} = useRouter();

  usePageSeo({
    title: 'Nuestros servicios | Sustratos, Flota Propia y Gestión de Residuos',
    description:
      'Sustratos profesionales para paisajismo, obra pública y viveros, sacos de 10L a 80L y granel, flota de camiones propios y gestión autorizada de residuos vegetales.',
    path: '/nuestros-servicios',
  });

  return (
    <div className="bg-[#FAF8F4]">
      {/* Cabecera */}
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#5F6F52]">
            Nuestros servicios · Fabricación, logística y medio ambiente
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-5xl">
            Sustratos profesionales para paisajismo, obra pública y viveros
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#3A403C] sm:text-lg">
            Somos especialistas en la producción y suministro de sustratos de
            alta calidad, adaptados a las necesidades de paisajistas, viveros y
            proyectos de obra pública. Ofrecemos soluciones a medida para cada
            tipo de planta, entorno y escala de trabajo.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                openQuoteModal({
                  intent: 'presupuesto',
                  title: 'Solicitar presupuesto de servicio o suministro',
                })
              }
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1B3B2B] px-6 py-3 text-sm font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
            >
              Solicitar presupuesto
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <Link
              to="/productos/mezclas-y-soluciones-personalizadas"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#1F2421]/20 bg-[#FAF8F4] px-5 py-3 text-sm font-medium text-[#1F2421] hover:bg-white"
            >
              Ver mezclas personalizadas
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Pilares del servicio de sustratos */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Mezclas personalizadas */}
            <div className="rounded-lg border border-[#1F2421]/10 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>01 · Formulación técnica</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[#1F2421]">
                Mezclas personalizadas
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#3A403C]">
                Creamos sustratos a medida según las especificaciones técnicas
                de cada proyecto: desde jardines ornamentales hasta restauración
                paisajística o zonas verdes urbanas. Nuestro equipo técnico te
                asesora para lograr el equilibrio perfecto entre nutrición,
                drenaje y estructura.
              </p>
            </div>

            {/* Formatos flexibles */}
            <div className="rounded-lg border border-[#1F2421]/10 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>02 · Envasado y granel</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[#1F2421]">
                Formatos flexibles
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#3A403C]">
                Disponemos de una amplia gama de formatos para adaptarnos a
                cualquier necesidad:
              </p>
              <ul className="mt-3 space-y-2 text-sm font-medium text-[#1F2421]">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]" aria-hidden="true" />
                  <span>Sacos de 10L, 20L, 35L, 50L y 80L</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]" aria-hidden="true" />
                  <span>Suministro a granel para grandes obras o viveros</span>
                </li>
              </ul>
            </div>

            {/* Clientes profesionales */}
            <div className="rounded-lg border border-[#1F2421]/10 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>03 · Sectores atendidos</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[#1F2421]">
                Clientes profesionales
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#3A403C]">
                Trabajamos de forma directa con:
              </p>
              <ul className="mt-3 space-y-2 text-sm font-medium text-[#1F2421]">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]" aria-hidden="true" />
                  <span>Paisajistas y diseñadores de jardines</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]" aria-hidden="true" />
                  <span>Empresas de obra pública y contratistas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]" aria-hidden="true" />
                  <span>Viveros y centros de jardinería</span>
                </li>
              </ul>
            </div>

            {/* Compromiso y confianza */}
            <div className="rounded-lg border border-[#1F2421]/10 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span>04 · Garantía de servicio</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[#1F2421]">
                Compromiso y confianza
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#3A403C]">
                Ofrecemos asesoramiento técnico, cumplimiento de plazos y una
                logística eficiente para garantizar que tu proyecto cuente con
                la mejor base: un sustrato de calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flota de transporte propia */}
      <section className="border-y border-[#1F2421]/10 bg-[#F3EFE6] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
                <Truck className="h-4 w-4" aria-hidden="true" />
                <span>Flota propia y logística directa</span>
              </div>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421]">
                Medios de transporte y descarga adaptados a cada obra
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                openQuoteModal({
                  intent: 'presupuesto',
                  title: 'Solicitar presupuesto con transporte',
                })
              }
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#1B3B2B] underline underline-offset-4 hover:text-[#6E4E37]"
            >
              Consultar tarifa y disponibilidad de porte
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FLEET_VEHICLES.map((vehicle) => (
              <article
                key={vehicle.name}
                className="flex flex-col overflow-hidden rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4]"
              >
                <MediaFrame
                  src={vehicle.image}
                  alt={vehicle.imageAlt}
                  aspectClass="aspect-[4/3]"
                />
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#1F2421]">
                      {vehicle.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4C544F]">
                      {vehicle.capacityNote}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-[#1F2421]/10 pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        openQuoteModal({
                          intent: 'presupuesto',
                          productInterest: `Transporte / ${vehicle.name}`,
                          title: `Consultar servicio · ${vehicle.name}`,
                        })
                      }
                      className="text-xs font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
                    >
                      Solicitar disponibilidad
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gestión de residuos */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
              <Recycle className="h-4 w-4" aria-hidden="true" />
              <span>Centro gestor autorizado · N.º NIMA {COMPANY_INFO.nima}</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421]">
              Gestión de residuos vegetales
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#3A403C]">
              Completamos el servicio profesional mediante recogida en origen,
              triturado de restos de poda y transporte hasta nuestra planta de
              compostaje autorizada.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {WASTE_SERVICES.map((service) => (
              <article
                key={service.title}
                className="flex flex-col overflow-hidden rounded-lg border border-[#1F2421]/10 bg-white"
              >
                <MediaFrame
                  src={service.image}
                  alt={service.imageAlt}
                  aspectClass="aspect-[4/3]"
                />
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#1F2421]">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3A403C]">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-5 border-t border-[#1F2421]/10 pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        openQuoteModal({
                          intent: 'presupuesto',
                          projectType: 'Gestión de residuos vegetales',
                          productInterest: service.title,
                          title: service.title,
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
                    >
                      Solicitar presupuesto de este servicio
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
