import {ArrowRight, Mail, Phone} from 'lucide-react';
import {Link, useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {
  CERTIFICATIONS,
  COMPANY_INFO,
  IMAGES,
  MANUFACTURING_STEPS,
  PROFESSIONAL_SOLUTIONS,
  SUSTAINABILITY_PILLARS,
} from '../data/company';
import {PRODUCT_CATEGORIES} from '../data/catalog';
import {MediaFrame} from '../components/MediaFrame';
import {LeadForm} from '../components/LeadForm';

const HERO_INDICATORS = [
  {
    title: 'Más de 40 años de experiencia',
    detail: 'Trayectoria industrial y agrícola desde Toledo',
  },
  {
    title: 'Fabricación especializada',
    detail: 'Más de 8 hectáreas de instalaciones propias',
  },
  {
    title: 'Soluciones profesionales',
    detail: 'Viveros, gardens, paisajismo y obra pública',
  },
  {
    title: 'Compromiso medioambiental',
    detail: 'Valorización vegetal · NIMA 4570003519',
  },
];

export function HomePage() {
  const {openQuoteModal} = useRouter();

  usePageSeo({
    title: 'Abonos Naturales Hnos. Aguado | Fabricantes de Sustratos y Mantillos',
    description:
      'Más de 40 años fabricando abonos naturales, mantillos, sustratos profesionales, enmiendas orgánicas y áridos decorativos en Toledo para jardinería y agricultura.',
    path: '/',
  });

  return (
    <div>
      {/* B. HERO PRINCIPAL */}
      <section className="relative overflow-hidden bg-[#132A1E] text-[#FAF8F4]">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative min-h-[540px] lg:min-h-[620px]">
            <img
              src={IMAGES.heroLandscape}
              alt="Campos agrícolas y líneas vegetales sobre tierra fértil orgánica al amanecer"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#132A1E]/95 via-[#132A1E]/75 to-[#132A1E]/35"
            />

            <div className="relative z-10 flex min-h-[540px] flex-col justify-center px-4 py-16 sm:px-8 lg:min-h-[620px] lg:px-12 lg:py-24">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-wide text-[#D5DFCD]">
                  Abonos Naturales Hnos. Aguado S.L. · La Torre de Esteban Hambrán, Toledo
                </p>
                <h1 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-[#FAF8F4]">
                  Más de 40 años cultivando calidad.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-[#FAF8F4]/90 sm:text-lg">
                  Fabricamos soluciones naturales para el cuidado del suelo, el
                  jardín y los espacios verdes. Calidad, experiencia y
                  compromiso con cada proyecto.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/productos"
                    className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#FAF8F4] px-6 py-3 text-sm font-semibold text-[#1B3B2B] whitespace-nowrap transition-colors duration-150 hover:bg-[#EAE4D7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Descubrir nuestros productos
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href="#asesoramiento-tecnico"
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#FAF8F4]/40 bg-[#132A1E]/50 px-6 py-3 text-sm font-medium text-[#FAF8F4] whitespace-nowrap transition-colors duration-150 hover:bg-[#1B3B2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Solicitar asesoramiento
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de indicadores de valor debajo del hero (sin pill badges ni solapamientos) */}
        <div className="border-t border-[#FAF8F4]/15 bg-[#1B3B2B]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#FAF8F4]/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {HERO_INDICATORS.map((item) => (
              <div key={item.title} className="px-6 py-5">
                <p className="font-display text-sm font-semibold text-[#FAF8F4]">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-[#FAF8F4]/75">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C. SECCIÓN SOBRE NOSOTROS */}
      <section className="bg-[#FAF8F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center lg:col-span-6">
              <p className="text-xs font-medium text-[#5F6F52]">
                Sobre nosotros · Tradición e industria agronómica
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-4xl">
                Experiencia que se transforma en calidad.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#3A403C]">
                En <strong>{COMPANY_INFO.legalName}</strong> sumamos más de
                cuatro décadas dedicados a la fabricación y comercialización de
                abonos naturales, mantillos, sustratos y materiales para el
                acondicionamiento del suelo. Nuestra evolución combina el
                conocimiento agronómico tradicional con procesos industriales
                controlados en nuestras instalaciones de Toledo.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-[#1F2421]/10 pt-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#1B3B2B]">
                    Fabricación y comercialización propia
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4C544F]">
                    Control directo desde la selección de materias primas hasta
                    la entrega en obra, vivero o centro de jardinería.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#1B3B2B]">
                    Especialización y capacidad técnica
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4C544F]">
                    Más de 8 hectáreas organizadas en áreas de recepción,
                    compostaje, cribado, envasado y naves cubiertas.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#1B3B2B]">
                    Asesoramiento cercano al cliente
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4C544F]">
                    Orientación práctica sobre dosis, formatos y mezclas
                    específicas para cada tipo de suelo o cultivo.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#1B3B2B]">
                    Logística en toda la zona centro y nacional
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4C544F]">
                    Ubicados en La Torre de Esteban Hambrán, a 52 km de Madrid,
                    con acceso ágil para suministros a granel o paletizados.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/empresa"
                  className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#1B3B2B] underline underline-offset-4 hover:text-[#6E4E37]"
                >
                  Conocer nuestra historia e instalaciones
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <MediaFrame
                src={IMAGES.manufacturingPlant}
                alt="Instalaciones industriales de compostaje, cribado y naves cubiertas de Abonos Naturales Hnos. Aguado"
                aspectClass="h-full min-h-[340px]"
                className="rounded-lg border border-[#1F2421]/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* D. CATÁLOGO DE PRODUCTOS (8 CATEGORÍAS) */}
      <section className="border-y border-[#1F2421]/10 bg-[#F3EFE6] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#5F6F52]">
                Catálogo general de fabricante
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-4xl">
                Gamas de productos para suelo, cultivo y paisajismo
              </h2>
            </div>
            <Link
              to="/productos"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#1B3B2B] whitespace-nowrap underline underline-offset-4 hover:text-[#6E4E37]"
            >
              Explorar catálogo y buscador
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.map((category) => (
              <article
                key={category.slug}
                className="flex flex-col overflow-hidden rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4]"
              >
                <MediaFrame
                  src={category.image}
                  alt={category.imageAlt}
                  aspectClass="aspect-[4/3]"
                  branded
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-xs text-[#6E4E37] tabular-nums">
                    {category.order} · Categoría
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-[#1F2421]">
                    {category.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4C544F]">
                    {category.shortDescription}
                  </p>
                  <div className="mt-5 border-t border-[#1F2421]/10 pt-4">
                    <Link
                      to={`/productos/${category.slug}`}
                      className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
                    >
                      Ver productos
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* E. SOLUCIONES PROFESIONALES (B2B) */}
      <section className="bg-[#FAF8F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium text-[#5F6F52]">
                Suministro B2B y prescripción técnica
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-4xl">
                Soluciones adaptadas a cada proyecto.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3A403C]">
                Trabajamos de forma directa con centros de jardinería, viveros,
                estudios de paisajismo, constructoras, administraciones públicas
                y distribuidores que requieren regularidad en calidad y entrega.
              </p>
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <button
                type="button"
                onClick={() =>
                  openQuoteModal({
                    intent: 'presupuesto',
                    title: 'Cuéntanos tu proyecto profesional',
                  })
                }
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1B3B2B] px-6 py-3 text-sm font-medium text-[#FAF8F4] whitespace-nowrap transition-colors hover:bg-[#132A1E]"
              >
                Cuéntanos tu proyecto
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <MediaFrame
                src={IMAGES.commercialNursery}
                alt="Vivero profesional y zona logística con palets de sustratos"
                aspectClass="h-full min-h-[320px]"
                className="rounded-lg border border-[#1F2421]/10"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
              {PROFESSIONAL_SOLUTIONS.map((solution) => (
                <div
                  key={solution.id}
                  className="flex flex-col justify-between rounded-lg border border-[#1F2421]/10 bg-[#F3EFE6]/60 p-6"
                >
                  <div>
                    <p className="font-mono text-xs text-[#6E4E37] tabular-nums">
                      {solution.order}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-[#1F2421]">
                      {solution.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3A403C]">
                      {solution.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        openQuoteModal({
                          intent: 'presupuesto',
                          projectType: solution.projectTypeValue,
                          title: `Presupuesto · ${solution.title}`,
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
                    >
                      Solicitar propuesta
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* F. FABRICACIÓN Y CALIDAD */}
      <section className="border-y border-[#1F2421]/10 bg-[#F3EFE6] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#5F6F52]">
              Proceso productivo en planta
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-4xl">
              Conocimiento, experiencia y control en cada proceso.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#3A403C]">
              Supervisamos todas las fases operativas dentro de nuestra planta de
              La Torre de Esteban Hambrán para garantizar homogeneidad física y
              cumplimiento de plazos logísticos.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 border-t border-[#1F2421]/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {MANUFACTURING_STEPS.map((step) => (
              <div key={step.order} className="space-y-2">
                <span className="font-mono text-xs font-medium text-[#6E4E37] tabular-nums">
                  Fase {step.order}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#1F2421]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4C544F]">
                  {step.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G. SOSTENIBILIDAD */}
      <section className="bg-[#FAF8F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <MediaFrame
                src={IMAGES.sustainableCompost}
                alt="Compost vegetal natural maduro junto a follaje verde fresco"
                aspectClass="h-full min-h-[320px]"
                className="rounded-lg border border-[#1F2421]/10"
              />
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-xs font-medium text-[#5F6F52]">
                Economía circular y gestión vegetal · NIMA {COMPANY_INFO.nima}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-4xl">
                Comprometidos con el futuro del entorno natural.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#3A403C]">
                Cerramos el ciclo natural de la materia orgánica mediante la
                recogida, triturado y compostaje controlado de residuos vegetales,
                devolviéndolos al suelo como enmiendas y mantillos útiles.
              </p>

              <div className="mt-8 space-y-6 border-t border-[#1F2421]/10 pt-6">
                {SUSTAINABILITY_PILLARS.map((pillar) => (
                  <div key={pillar.title}>
                    <h3 className="font-display text-base font-semibold text-[#1F2421]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#4C544F]">
                      {pillar.description}
                    </p>
                    <p className="mt-1 font-mono text-xs text-[#6E4E37]">
                      {pillar.verifiedDetail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-[#1F2421]/10 pt-6">
                <div>
                  <p className="text-xs font-medium text-[#4C544F]">
                    Acreditaciones y referencias documentales
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#1F2421]">
                    {CERTIFICATIONS.map((c) => c.code).join(' · ')}
                  </p>
                </div>
                <Link
                  to="/sostenibilidad"
                  className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#1B3B2B] underline underline-offset-4 hover:text-[#6E4E37]"
                >
                  Ver gestión ambiental y certificados
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H. ASESORAMIENTO TÉCNICO */}
      <section
        id="asesoramiento-tecnico"
        className="border-t border-[#1F2421]/10 bg-[#F3EFE6] py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-[#5F6F52]">
                Asesoramiento técnico especializado
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-4xl">
                Cada proyecto necesita la solución adecuada.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#3A403C]">
                Nuestro equipo técnico te orienta en la elección de abonos,
                mantillos, sustratos, áridos o formulaciones personalizadas según
                las características del terreno, el cultivo y los requisitos de
                suministro.
              </p>

              <div className="mt-8 space-y-4 rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6">
                <h3 className="font-display text-base font-semibold text-[#1F2421]">
                  Atención directa desde fábrica
                </h3>
                <div className="space-y-2.5 text-sm text-[#3A403C]">
                  <a
                    href={COMPANY_INFO.phonePrimaryHref}
                    className="flex items-center gap-2.5 font-medium text-[#1B3B2B] hover:text-[#6E4E37]"
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="font-mono tabular-nums">
                      {COMPANY_INFO.phonePrimary}
                    </span>
                  </a>
                  <a
                    href={COMPANY_INFO.emailHref}
                    className="flex items-center gap-2.5 font-medium text-[#1B3B2B] hover:text-[#6E4E37]"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{COMPANY_INFO.email}</span>
                  </a>
                </div>
                <p className="border-t border-[#1F2421]/10 pt-3 text-xs leading-relaxed text-[#4C544F]">
                  {COMPANY_INFO.schedules.office}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6 sm:p-8 lg:col-span-7">
              <LeadForm
                intent="asesoramiento"
                submitLabel="Solicitar asesoramiento"
                sourcePath="/"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
