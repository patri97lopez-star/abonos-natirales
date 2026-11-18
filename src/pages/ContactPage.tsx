import {ArrowRight, Clock, ExternalLink, Mail, MapPin, Phone, Printer} from 'lucide-react';
import {Link} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {COMPANY_INFO} from '../data/company';
import {LeadForm} from '../components/LeadForm';

export function ContactPage() {
  usePageSeo({
    title: 'Contacta con nosotros | Abonos Naturales Hnos. Aguado',
    description:
      'Contacta con Abonos Naturales Hnos. Aguado en Ctra. de Méntrida, S/N - 45920 La Torre de Esteban Hambrán (Toledo). Teléfonos 925 79 54 63 - 647 288 457 e info@abonosnaturales.com.',
    path: '/contacto',
  });

  const {lat, lng} = COMPANY_INFO.address.coordinates;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    lng - 0.035
  }%2C${lat - 0.025}%2C${lng + 0.035}%2C${lat + 0.025}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="bg-[#FAF8F4]">
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#5F6F52]">
            Atención comercial, administración y logística
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-5xl">
            Contacta con nosotros
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3A403C]">
            Para cualquier consulta no dudes en ponerte en contacto con nosotros.
            Envíanos un e-mail o ponte en contacto con nosotros cubriendo el
            siguiente formulario. ¡Te responderemos lo antes posible!
          </p>

          {/* Accesos directos de llamada y correo */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={COMPANY_INFO.phonePrimaryHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1B3B2B] px-5 py-2.5 text-sm font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Llamar ahora ({COMPANY_INFO.phonePrimary})
            </a>
            <a
              href={COMPANY_INFO.emailHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#1F2421]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#1F2421] hover:bg-[#FAF8F4]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Enviar e-mail ({COMPANY_INFO.email})
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Dónde estamos, datos de contacto y horario de oficina */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-lg border border-[#1F2421]/10 bg-white p-6">
                <h2 className="font-display text-xl font-semibold text-[#1F2421]">
                  Datos de contacto
                </h2>
                <dl className="mt-5 space-y-5 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-medium text-[#4C544F]">
                        Dónde estamos
                      </dt>
                      <dd className="mt-1 space-y-0.5 text-[#1F2421]">
                        <p className="font-medium">Ctra. de Méntrida, S/N - 45920</p>
                        <p>La Torre de Esteban Hambrán (Toledo)</p>
                      </dd>
                      <p className="mt-1.5 text-xs text-[#4C544F]">
                        {COMPANY_INFO.address.distanceNote}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-[#1F2421]/10 pt-4">
                    <Phone
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-medium text-[#4C544F]">
                        Teléfonos
                      </dt>
                      <dd className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono tabular-nums">
                        <a
                          href={COMPANY_INFO.phonePrimaryHref}
                          className="font-medium text-[#1F2421] hover:text-[#1B3B2B]"
                        >
                          {COMPANY_INFO.phonePrimary}
                        </a>
                        <span className="text-[#4C544F]" aria-hidden="true">
                          -
                        </span>
                        <a
                          href={COMPANY_INFO.phoneSecondaryHref}
                          className="font-medium text-[#1F2421] hover:text-[#1B3B2B]"
                        >
                          {COMPANY_INFO.phoneSecondary}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Printer
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-medium text-[#4C544F]">Fax</dt>
                      <dd className="mt-1 font-mono font-medium text-[#1F2421] tabular-nums">
                        {COMPANY_INFO.fax}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-medium text-[#4C544F]">
                        E-mail
                      </dt>
                      <dd className="mt-1 space-y-1">
                        <a
                          href={COMPANY_INFO.emailHref}
                          className="block font-medium text-[#1F2421] hover:text-[#1B3B2B]"
                        >
                          {COMPANY_INFO.email}
                        </a>
                        <a
                          href={`mailto:${COMPANY_INFO.emailAdmin}`}
                          className="block text-[#4C544F] hover:text-[#1B3B2B]"
                        >
                          {COMPANY_INFO.emailAdmin}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-[#1F2421]/10 pt-5">
                    <Clock
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#1B3B2B]"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-medium text-[#4C544F]">
                        Horario de oficina
                      </dt>
                      <dd className="mt-1.5 space-y-1 text-xs leading-relaxed text-[#1F2421]">
                        <p>{COMPANY_INFO.schedules.officeMorning}</p>
                        <p>{COMPANY_INFO.schedules.officeAfternoon}</p>
                        <p className="font-medium text-[#6E4E37]">
                          {COMPANY_INFO.schedules.weekends}
                        </p>
                        <p className="pt-1 text-[#4C544F]">
                          {COMPANY_INFO.schedules.loading}
                        </p>
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* Mapa de ubicación */}
              <div className="overflow-hidden rounded-lg border border-[#1F2421]/10 bg-white">
                <iframe
                  title="Mapa de ubicación de Abonos Naturales Hnos. Aguado en La Torre de Esteban Hambrán, Toledo"
                  src={osmEmbedUrl}
                  className="h-64 w-full border-0"
                  loading="lazy"
                />
                <div className="flex items-center justify-between border-t border-[#1F2421]/10 px-4 py-3 text-xs">
                  <span className="text-[#4C544F]">
                    La Torre de Esteban Hambrán (Toledo)
                  </span>
                  <a
                    href={COMPANY_INFO.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
                  >
                    Cómo llegar
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Acceso directo a empleo */}
              <div className="rounded-lg border border-[#1B3B2B]/15 bg-[#F3EFE6] p-6">
                <p className="text-xs font-medium text-[#5F6F52]">
                  Empleo y candidaturas
                </p>
                <h2 className="mt-1.5 font-display text-lg font-semibold text-[#1F2421]">
                  ¿Quieres trabajar con nosotros?
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[#3A403C]">
                  Envíanos tu currículum y tus datos de contacto a través de
                  nuestro formulario específico de selección.
                </p>
                <Link
                  to="/trabaja-con-nosotros"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3B2B] hover:text-[#6E4E37]"
                >
                  Ir a Trabaja con nosotros
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="rounded-lg border border-[#1F2421]/10 bg-white p-6 sm:p-8 lg:col-span-7">
              <h2 className="font-display text-2xl font-semibold text-[#1F2421]">
                Formulario de contacto
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#4C544F]">
                Para cualquier consulta no dudes en ponerte en contacto con
                nosotros. Envíanos un e-mail o ponte en contacto con nosotros
                cubriendo el siguiente formulario. ¡Te responderemos lo antes
                posible!
              </p>
              <div className="mt-6">
                <LeadForm
                  intent="contacto"
                  submitLabel="Enviar consulta"
                  showProjectFields={false}
                  sourcePath="/contacto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
