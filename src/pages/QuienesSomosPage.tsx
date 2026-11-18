import {ArrowRight, Check, FileDown, FileText, Mail, Phone, Recycle, ShieldCheck} from 'lucide-react';
import {Link, useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {
  CIRCULAR_ECONOMY_STEPS,
  COMPANY_INFO,
  IMAGES,
  QUALITY_GUARANTEES,
  RAW_MATERIALS,
} from '../data/company';
import {MediaFrame} from '../components/MediaFrame';

const INTEREST_LINKS = [
  {label: 'Enmienda orgánica', to: '/productos/abonos-y-enmiendas-organicas'},
  {label: 'Sustratos', to: '/productos/sustratos'},
  {label: 'Decorativo', to: '/productos/aridos-y-piedras-decorativas'},
  {label: 'Varios', to: '/productos/varios'},
  {label: 'Productos ecológicos', to: '/productos/productos-ecologicos'},
];

export function QuienesSomosPage() {
  const {openQuoteModal} = useRouter();

  usePageSeo({
    title: 'Quiénes somos | Abonos Naturales Hnos. Aguado',
    description:
      'Más de 35 años fabricando y comercializando abonos naturales, mantillos y sustratos con departamento I+D+i, flota propia, ISO 9001, ISO 14001:2004 y certificación ecológica SOHISCERT.',
    path: '/quienes-somos',
  });

  return (
    <div className="bg-[#FAF8F4]">
      {/* Cabecera */}
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#5F6F52]">
            {COMPANY_INFO.legalName} · N.º NIMA {COMPANY_INFO.nima}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-5xl">
            Quiénes somos
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#3A403C] sm:text-lg">
            Abonos Naturales Hnos. Aguado está presente en la jardinería desde
            hace más de 35 años. Poseemos una larga trayectoria en la fabricación
            y comercialización de productos para el jardín y huerto, y hemos
            consolidado nuestra posición en el mercado de la jardinería
            combinando calidad y eficacia.
          </p>
        </div>
      </section>

      {/* Trayectoria, I+D+i y Materias Primas */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center space-y-5 lg:col-span-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[#1F2421] sm:text-3xl">
                Innovación en fórmulas, compostaje y mezclas a medida
              </h2>
              <p className="text-base leading-relaxed text-[#3A403C]">
                Hemos incorporado más hectáreas de compostaje, una nueva línea
                de envasado y máquinas mezcladoras, creando además nuestro{' '}
                <strong>departamento de I+D+i</strong> que trabaja diariamente
                para conseguir las mejores fórmulas para las mezclas de mantillo
                y sustratos más activos en los jardines, mejorando las
                características químicas, físicas y biológicas de los suelos.
              </p>
              <p className="text-base leading-relaxed text-[#3A403C]">
                Disponemos de una amplia gama de materias primas distintas, tales
                como{' '}
                <strong>
                  turba rubia y negra, fibra de coco, fibra de madera, humus de
                  lombriz, compost vegetal, enmiendas orgánicas y perlita
                </strong>
                , consiguiendo una amplia gama de abonos de muy alta calidad en
                sustratos y mantillo, y ofreciendo a nuestros clientes mezclas
                individualizadas teniendo en cuenta sus deseos y necesidades.
              </p>

              {/* Materias primas en lista limpia */}
              <div className="border-t border-[#1F2421]/10 pt-5">
                <p className="text-xs font-medium text-[#5F6F52]">
                  Materias primas seleccionadas en planta
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#1F2421]">
                  {RAW_MATERIALS.join(' · ')}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <MediaFrame
                src={IMAGES.manufacturingPlant}
                alt="Planta de compostaje, líneas de envasado y máquinas mezcladoras de Abonos Naturales Hnos. Aguado"
                aspectClass="h-full min-h-[340px]"
                className="rounded-lg border border-[#1F2421]/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Compromiso ambiental, Certificaciones y Garantías */}
      <section className="border-y border-[#1F2421]/10 bg-[#F3EFE6] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span>Calidad y medio ambiente acreditados</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#1F2421] sm:text-3xl">
                Compromiso ambiental y garantía de fabricación
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#3A403C]">
                Abonos Naturales Hnos. Aguado está comprometido con el medio
                ambiente y así lo acreditan nuestros certificados de{' '}
                <strong>ISO 14001:2004</strong>. Además contamos con la{' '}
                <strong>certificación ecológica de SOHISCERT</strong> y sistema
                de gestión de calidad <strong>ISO 9001</strong>.
              </p>

              <div className="mt-6 rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-5">
                <p className="font-mono text-xs text-[#6E4E37]">
                  N.º NIMA {COMPANY_INFO.nima}
                </p>
                <p className="mt-1.5 text-sm font-medium text-[#1F2421]">
                  Política de Calidad y Medio Ambiente · Certificaciones ISO
                  9001, ISO 14001 y SOHISCERT
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/sostenibilidad"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B3B2B] underline underline-offset-4 hover:text-[#6E4E37]"
                  >
                    Ver certificaciones y NIMA
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        intent: 'ficha_tecnica',
                        productInterest: 'Catálogo general y certificaciones PDF',
                        title: 'Solicitar catálogo general en PDF',
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B3B2B] underline underline-offset-4 hover:text-[#6E4E37]"
                  >
                    <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                    Descarga nuestro catálogo [PDF]
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6 sm:p-8 lg:col-span-7">
              <h3 className="font-display text-lg font-semibold text-[#1F2421]">
                Pilares de nuestra capacidad industrial y de servicio
              </h3>
              <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {QUALITY_GUARANTEES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 border-b border-[#1F2421]/10 pb-3 text-sm text-[#1F2421]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Economía Circular Sostenible */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <MediaFrame
                src={IMAGES.sustainableCompost}
                alt="Ciclo de economía circular sostenible con compostaje vegetal"
                aspectClass="h-full min-h-[300px]"
                className="rounded-lg border border-[#1F2421]/10"
              />
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6F52]">
                <Recycle className="h-4 w-4" aria-hidden="true" />
                <span>Ciclo completo en planta autorizada</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#1F2421] sm:text-3xl">
                Economía circular sostenible
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#3A403C]">
                Cada resto vegetal recogido vuelve al terreno transformado en
                alimento natural para las plantas mediante seis etapas
                controladas:
              </p>

              <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CIRCULAR_ECONOMY_STEPS.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-lg border border-[#1F2421]/10 bg-white p-4"
                  >
                    <span className="font-mono text-xs font-semibold text-[#6E4E37] tabular-nums">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-sm font-medium text-[#1F2421]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Quieres tener más información? + Accesos rápidos + De interés + Horarios */}
      <section className="border-t border-[#1F2421]/10 bg-[#F3EFE6] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium text-[#5F6F52]">
                ¿Quieres tener más información?
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-[#1F2421] sm:text-3xl">
                Explora nuestros productos, catálogo e instalaciones
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                openQuoteModal({
                  intent: 'presupuesto',
                  title: 'Solicitar información comercial',
                })
              }
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
            >
              Solicitar información
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#1F2421]">
                  Productos
                </h3>
                <p className="mt-2 text-sm text-[#4C544F]">
                  Descubre nuestra gama de mantillos, sustratos, enmiendas
                  orgánicas, áridos y mezclas personalizadas.
                </p>
              </div>
              <div className="mt-5 border-t border-[#1F2421]/10 pt-4">
                <Link
                  to="/productos"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
                >
                  Ver más
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#1F2421]">
                  Catálogo
                </h3>
                <p className="mt-2 text-sm text-[#4C544F]">
                  Consulta el buscador de referencias o solicita nuestro catálogo
                  general y fichas técnicas en formato PDF.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#1F2421]/10 pt-4">
                <Link
                  to="/productos"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
                >
                  Ver más
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      intent: 'ficha_tecnica',
                      productInterest: 'Catálogo PDF completo',
                      title: 'Descargar / Solicitar catálogo [PDF]',
                    })
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E4E37] underline underline-offset-4 hover:text-[#1B3B2B]"
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  Catálogo [PDF]
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#1F2421]">
                  Instalaciones
                </h3>
                <p className="mt-2 text-sm text-[#4C544F]">
                  Conoce nuestras más de 8 hectáreas en La Torre de Esteban
                  Hambrán: recepción, compostaje, envasado y almacenaje.
                </p>
              </div>
              <div className="mt-5 border-t border-[#1F2421]/10 pt-4">
                <Link
                  to="/instalaciones"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
                >
                  Ver más
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* De interés + Horarios y Contacto */}
          <div className="mt-10 grid grid-cols-1 gap-6 rounded-lg border border-[#1F2421]/10 bg-[#FAF8F4] p-6 sm:p-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h3 className="font-display text-base font-semibold text-[#1F2421]">
                De interés
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#3A403C]">
                {INTEREST_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="inline-flex items-center gap-1.5 hover:text-[#1B3B2B] hover:underline underline-offset-4"
                    >
                      <span aria-hidden="true">·</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#1F2421]/10 pt-5 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h3 className="font-display text-base font-semibold text-[#1F2421]">
                Horarios de planta y oficina
              </h3>
              <div className="mt-3 space-y-3 text-sm text-[#3A403C]">
                <div>
                  <p className="font-medium text-[#1F2421]">
                    Horario de oficina
                  </p>
                  <p className="text-xs text-[#4C544F]">
                    Lunes a viernes · De 08:00h a 13:30h y de 15:00h a 19:00h
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[#1F2421]">
                    Horario de cargas/descargas
                  </p>
                  <p className="text-xs text-[#4C544F]">
                    Lunes a viernes · De 08:00h a 13:00h y de 15:00h a 18:30h
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1F2421]/10 pt-5 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <h3 className="font-display text-base font-semibold text-[#1F2421]">
                Contacto directo
              </h3>
              <div className="mt-3 space-y-2.5 text-sm">
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
