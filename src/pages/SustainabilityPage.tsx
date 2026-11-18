import {ArrowRight, FileCheck2, Recycle} from 'lucide-react';
import {useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {
  CERTIFICATIONS,
  COMPANY_INFO,
  IMAGES,
  SUSTAINABILITY_PILLARS,
} from '../data/company';
import {MediaFrame} from '../components/MediaFrame';

export function SustainabilityPage() {
  const {openQuoteModal} = useRouter();

  usePageSeo({
    title: 'Sostenibilidad y Gestión de Residuos Vegetales | Abonos Naturales',
    description:
      'Comprometidos con el entorno natural: centro gestor autorizado NIMA 4570003519 para valorización y compostaje de residuos vegetales en Toledo.',
    path: '/sostenibilidad',
  });

  return (
    <div className="bg-[#FAF8F4]">
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
                <Recycle className="h-4 w-4" aria-hidden="true" />
                <span>Economía circular · NIMA {COMPANY_INFO.nima}</span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-5xl">
                Comprometidos con el futuro del entorno natural.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3A403C] sm:text-lg">
                Nuestra actividad principal transforma restos vegetales de poda y
                mantenimiento en recursos orgánicos estables para la
                regeneración de suelos, cerrando el ciclo biológico en origen.
              </p>
            </div>
            <div className="lg:col-span-5">
              <MediaFrame
                src={IMAGES.sustainableCompost}
                alt="Compost vegetal maduro obtenido por valorización orgánica"
                aspectClass="aspect-[4/3]"
                className="rounded-lg border border-[#1F2421]/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pilares de gestión vegetal */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-[#1F2421] sm:text-3xl">
            Valorización de residuos vegetales y servicio integral
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {SUSTAINABILITY_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col justify-between rounded-lg border border-[#1F2421]/10 bg-white p-6"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#1F2421]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#3A403C]">
                    {pillar.description}
                  </p>
                </div>
                <p className="mt-5 border-t border-[#1F2421]/10 pt-3 font-mono text-xs text-[#6E4E37]">
                  {pillar.verifiedDetail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-[#1F2421]/10 bg-[#F3EFE6] p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="font-display text-xl font-semibold text-[#1F2421]">
                  ¿Necesitas servicio de retirada, picado o contenedores para
                  restos vegetales?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3A403C]">
                  Atendemos a empresas de jardinería, municipios y explotaciones
                  agrícolas con medios propios de carga y transporte.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openQuoteModal({
                    intent: 'presupuesto',
                    projectType: 'Gestión de residuos vegetales',
                    title: 'Solicitar servicio de gestión de residuos vegetales',
                  })
                }
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
              >
                Consultar servicio
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Autorizaciones y certificaciones (transparencia documental) */}
      <section className="border-t border-[#1F2421]/10 bg-[#F3EFE6] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#5F6F52]">
              Transparencia documental y normativa
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-[#1F2421] sm:text-3xl">
              Autorizaciones y certificaciones acreditadas
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#3A403C]">
              Únicamente publicamos documentos y códigos acreditados. Si
              necesitas copia oficial actualizada de alguna autorización o
              certificado para licitación pública o auditoría de proveedor,
              puedes solicitarla directamente.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.code}
                className="flex flex-col justify-between rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-medium text-[#1B3B2B]">
                      {cert.code}
                    </span>
                    <FileCheck2
                      className="h-4 w-4 text-[#5F6F52]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[#1F2421]">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4C544F]">
                    {cert.scope}
                  </p>
                </div>
                <p className="mt-5 border-t border-[#1F2421]/10 pt-3 text-xs italic text-[#6E4E37]">
                  {cert.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
