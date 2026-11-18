import {ArrowRight, Check, Truck} from 'lucide-react';
import {useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {IMAGES, PROFESSIONAL_SOLUTIONS} from '../data/company';
import {MediaFrame} from '../components/MediaFrame';

const LOGISTICS_CAPABILITIES = [
  'Suministro directo de fábrica desde La Torre de Esteban Hambrán (Toledo)',
  'Carga en camiones de hasta 18 Tm y 26 Tm según acceso en obra o vivero',
  'Tráileres con bañera basculante o piso móvil para entregas a granel',
  'Entregas paletizadas y en big-bag adaptadas a gardens y almacenes',
];

export function SolutionsPage() {
  const {openQuoteModal} = useRouter();

  usePageSeo({
    title: 'Soluciones Profesionales B2B | Abonos Naturales Hnos. Aguado',
    description:
      'Soluciones de sustratos, mantillos, abonos naturales y áridos para gardens, viveros, paisajismo, obra civil, espacios públicos y distribuidores.',
    path: '/soluciones-profesionales',
  });

  return (
    <div className="bg-[#FAF8F4]">
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium text-[#5F6F52]">
                Área B2B · Suministro directo de fabricante
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-5xl">
                Soluciones adaptadas a cada proyecto.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3A403C] sm:text-lg">
                Acompañamos a profesionales de la jardinería, viveros,
                paisajistas, empresas constructoras y administraciones públicas
                con fabricación propia, asesoramiento técnico y logística
                coordinada.
              </p>
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      intent: 'presupuesto',
                      title: 'Cuéntanos tu proyecto profesional',
                    })
                  }
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1B3B2B] px-6 py-3 text-sm font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
                >
                  Cuéntanos tu proyecto
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <MediaFrame
                src={IMAGES.commercialNursery}
                alt="Centro de jardinería profesional y vivero con palets de sustratos"
                aspectClass="aspect-[4/3]"
                className="rounded-lg border border-[#1F2421]/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Los 4 bloques B2B */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {PROFESSIONAL_SOLUTIONS.map((solution) => (
              <article
                key={solution.id}
                className="flex flex-col justify-between rounded-lg border border-[#1F2421]/10 bg-white p-8"
              >
                <div>
                  <p className="font-mono text-xs text-[#6E4E37] tabular-nums">
                    {solution.order} · Sector profesional
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-[#1F2421]">
                    {solution.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[#5F6F52]">
                    {solution.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#3A403C]">
                    {solution.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-[#1F2421]/10 pt-5">
                    {solution.applications.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#3A403C]"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#5F6F52]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        intent: 'presupuesto',
                        projectType: solution.projectTypeValue,
                        title: `Solicitar propuesta · ${solution.title}`,
                      })
                    }
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-[#1B3B2B] transition-colors hover:bg-[#1B3B2B] hover:text-[#FAF8F4]"
                  >
                    Cuéntanos tu proyecto
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capacidad logística */}
      <section className="border-t border-[#1F2421]/10 bg-[#F3EFE6] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
                <Truck className="h-4 w-4" aria-hidden="true" />
                <span>Logística y expedición directa</span>
              </div>
              <h2 className="mt-2 font-display text-3xl font-semibold text-[#1F2421]">
                Capacidad logística adaptada a obra, vivero o almacén
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#3A403C]">
                Organizamos expediciones flexibles según las condiciones de
                descarga del cliente y los volúmenes requeridos en cada fase de
                obra o campaña.
              </p>
            </div>
            <div className="rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6 lg:col-span-6">
              <ul className="space-y-3">
                {LOGISTICS_CAPABILITIES.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2.5 text-sm text-[#1F2421]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]"
                      aria-hidden="true"
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
