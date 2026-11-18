import React, {useRef, useState} from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  FileDown,
  Mail,
  Paperclip,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';
import {Link} from '../lib/router';
import {useRouter} from '../lib/router';
import {usePageSeo} from '../lib/seo';
import {COMPANY_INFO} from '../data/company';
import {trackEvent} from '../services/analytics';
import type {LegalModalTab} from '../components/LegalModal';

const INTEREST_LINKS = [
  {label: 'Enmienda orgánica', to: '/productos/abonos-y-enmiendas-organicas'},
  {label: 'Sustratos', to: '/productos/sustratos'},
  {label: 'Decorativo', to: '/productos/aridos-y-piedras-decorativas'},
  {label: 'Varios', to: '/productos/varios'},
  {label: 'Productos ecológicos', to: '/productos/productos-ecologicos'},
];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo adjunto.'));
    reader.readAsDataURL(file);
  });
}

export function CareersPage({
  onOpenLegal,
}: {
  onOpenLegal: (tab: Exclude<LegalModalTab, null>) => void;
}) {
  const {openQuoteModal} = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [notRobotVerified, setNotRobotVerified] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    referenceId: string;
    message: string;
    crmConfigured: boolean;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
  } | null>(null);

  usePageSeo({
    title: 'Trabaja con nosotros | Abonos Naturales Hnos. Aguado',
    description:
      'Envía tu currículum y datos de contacto para formar parte del equipo de Abonos Naturales Hnos. Aguado S.L. en La Torre de Esteban Hambrán (Toledo).',
    path: '/trabaja-con-nosotros',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowed = ['.pdf', '.doc', '.docx'];
    const lowerName = file.name.toLowerCase();
    const isAllowed = allowed.some((ext) => lowerName.endsWith(ext));

    if (!isAllowed) {
      setFieldErrors((prev) => ({
        ...prev,
        cvFile: 'Formato no permitido. Adjunta un archivo PDF, DOC o DOCX.',
      }));
      setSelectedFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors((prev) => ({
        ...prev,
        cvFile: 'El archivo supera el máximo permitido de 5 MB.',
      }));
      setSelectedFile(null);
      return;
    }

    setFieldErrors((prev) => {
      const next = {...prev};
      delete next.cvFile;
      return next;
    });
    setSelectedFile(file);
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const errors: Record<string, string> = {};
    if (name.trim().length < 3) {
      errors.name = 'Introduce tu nombre y apellidos.';
    }
    if (!/^[+\d\s().-]{7,24}$/.test(phone.trim())) {
      errors.phone = 'Introduce un teléfono válido.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Introduce un correo electrónico válido.';
    }
    if (!privacyAccepted) {
      errors.privacyAccepted =
        'Debes aceptar la política de privacidad y las condiciones legales.';
    }
    if (!notRobotVerified) {
      errors.notRobotVerified =
        'Marca la casilla de verificación "No soy un robot".';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      let cvPayload: {
        fileName: string;
        mimeType: string;
        sizeBytes: number;
        base64Content: string;
      } | null = null;

      if (selectedFile) {
        const base64Content = await fileToBase64(selectedFile);
        cvPayload = {
          fileName: selectedFile.name,
          mimeType: selectedFile.type || 'application/octet-stream',
          sizeBytes: selectedFile.size,
          base64Content,
        };
      }

      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim() || undefined,
          privacyAccepted,
          notRobotVerified,
          cvFile: cvPayload,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setSubmitError(
          data.error || 'No se pudo enviar la candidatura en este momento.'
        );
        setSubmitting(false);
        return;
      }

      trackEvent('career_application_submitted', {
        has_cv: Boolean(selectedFile),
      });

      setSuccessInfo({
        referenceId: data.referenceId || 'CV-REGISTRADO',
        message: data.message,
        crmConfigured: Boolean(data.crmConfigured && data.forwardedToCrm),
        applicantName: name.trim(),
        applicantEmail: email.trim(),
        applicantPhone: phone.trim(),
      });
    } catch {
      setSubmitError(
        'Error de conexión al enviar tu candidatura. Puedes intentarlo de nuevo o escribirnos por correo.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F4]">
      {/* Cabecera */}
      <section className="border-b border-[#1F2421]/10 bg-[#F3EFE6] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-[#5F6F52]">
            Trabaja con nosotros · {COMPANY_INFO.legalName}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-[#1F2421] sm:text-5xl">
            ¿QUIERES TRABAJAR CON NOSOTROS?
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3A403C] sm:text-lg">
            Rellena el siguiente formulario y adjunta tu CV para participar en
            los procesos de selección en nuestra planta de La Torre de Esteban
            Hambrán (Toledo).
          </p>
        </div>
      </section>

      {/* Formulario de empleo */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-lg border border-[#1F2421]/10 bg-white p-6">
                <h2 className="font-display text-xl font-semibold text-[#1F2421]">
                  Únete a nuestro equipo
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#3A403C]">
                  Buscamos profesionales comprometidos con la calidad, la
                  seguridad y el cuidado del entorno natural para áreas de
                  producción, envasado, mantenimiento, logística y
                  administración.
                </p>
                <div className="mt-5 border-t border-[#1F2421]/10 pt-4 text-xs text-[#4C544F] space-y-1.5">
                  <p>
                    <strong className="text-[#1F2421]">Ubicación:</strong>{' '}
                    {COMPANY_INFO.address.fullFormatted}
                  </p>
                  <p>
                    <strong className="text-[#1F2421]">Formatos CV:</strong>{' '}
                    PDF, DOC o DOCX (máx. 5 MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[#1F2421]/10 bg-white p-6 sm:p-8 lg:col-span-8">
              {successInfo ? (
                <div
                  role="status"
                  className="rounded-lg border border-[#1B3B2B]/25 bg-[#F3EFE6] p-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#1B3B2B]"
                      aria-hidden="true"
                    />
                    <div className="space-y-3">
                      <div>
                        <p className="font-display text-base font-semibold text-[#1F2421]">
                          Candidatura registrada · Referencia{' '}
                          <span className="font-mono tabular-nums">
                            {successInfo.referenceId}
                          </span>
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[#3A403C]">
                          {successInfo.message}
                        </p>
                      </div>

                      {!successInfo.crmConfigured && (
                        <div className="rounded-md border border-[#1F2421]/10 bg-white p-3.5 text-xs leading-relaxed text-[#3A403C]">
                          Tu solicitud y archivo han quedado archivados en la
                          cola interna de selección. Si quieres enviar además tu
                          CV por correo electrónico directamente, utiliza el
                          acceso directo:
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <a
                          href={`mailto:${
                            COMPANY_INFO.email
                          }?subject=${encodeURIComponent(
                            `[Candidatura Empleo] ${successInfo.applicantName}`
                          )}&body=${encodeURIComponent(
                            `Nombre y Apellidos: ${successInfo.applicantName}\nTeléfono: ${successInfo.applicantPhone}\nCorreo: ${successInfo.applicantEmail}\nReferencia web: ${successInfo.referenceId}\n\n(Adjuntar CV si se remite por correo)`
                          )}`}
                          className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#1B3B2B] px-4 py-2 text-xs font-medium text-[#FAF8F4] hover:bg-[#132A1E]"
                        >
                          <Mail className="h-4 w-4" aria-hidden="true" />
                          Enviar por correo ({COMPANY_INFO.email})
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setSuccessInfo(null);
                            clearSelectedFile();
                            setMessage('');
                          }}
                          className="text-xs font-medium text-[#4C544F] underline underline-offset-4 hover:text-[#1F2421]"
                        >
                          Enviar otra candidatura
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-md border border-red-700/30 bg-red-50 px-3.5 py-3 text-sm text-red-900"
                    >
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-red-700"
                        aria-hidden="true"
                      />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="career-name"
                      className="mb-1.5 block text-xs font-medium text-[#1F2421]"
                    >
                      Nombre y Apellidos *
                    </label>
                    <input
                      id="career-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre y apellidos completos"
                      className="w-full rounded-md border border-[#1F2421]/20 bg-[#FAF8F4]/50 px-3.5 py-2.5 text-sm text-[#1F2421] focus:border-[#1B3B2B] focus:bg-white focus:outline-none"
                    />
                    {fieldErrors.name && (
                      <p className="mt-1 text-xs text-red-700">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="career-phone"
                        className="mb-1.5 block text-xs font-medium text-[#1F2421]"
                      >
                        Teléfono *
                      </label>
                      <input
                        id="career-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ej. 600 000 000"
                        className="w-full rounded-md border border-[#1F2421]/20 bg-[#FAF8F4]/50 px-3.5 py-2.5 text-sm text-[#1F2421] focus:border-[#1B3B2B] focus:bg-white focus:outline-none"
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1 text-xs text-red-700">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="career-email"
                        className="mb-1.5 block text-xs font-medium text-[#1F2421]"
                      >
                        Correo *
                      </label>
                      <input
                        id="career-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="correo@ejemplo.com"
                        className="w-full rounded-md border border-[#1F2421]/20 bg-[#FAF8F4]/50 px-3.5 py-2.5 text-sm text-[#1F2421] focus:border-[#1B3B2B] focus:bg-white focus:outline-none"
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 text-xs text-red-700">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Adjuntar CV */}
                  <div>
                    <label
                      htmlFor="career-cv"
                      className="mb-1.5 block text-xs font-medium text-[#1F2421]"
                    >
                      Adjuntar CV (PDF, DOC o DOCX)
                    </label>
                    <div className="flex flex-wrap items-center gap-3 rounded-md border border-dashed border-[#1F2421]/25 bg-[#F3EFE6]/50 p-3.5">
                      <label
                        htmlFor="career-cv"
                        className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-[#1F2421]/20 bg-white px-4 py-2 text-xs font-medium text-[#1F2421] hover:bg-[#FAF8F4]"
                      >
                        <Paperclip className="h-4 w-4" aria-hidden="true" />
                        Seleccionar archivo
                      </label>
                      <input
                        ref={fileInputRef}
                        id="career-cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="sr-only"
                      />

                      {selectedFile ? (
                        <div className="flex items-center gap-2 text-xs font-medium text-[#1B3B2B]">
                          <span>
                            {selectedFile.name} (
                            {(selectedFile.size / 1024).toFixed(0)} KB)
                          </span>
                          <button
                            type="button"
                            onClick={clearSelectedFile}
                            aria-label="Quitar archivo adjunto"
                            className="rounded p-1 text-[#4C544F] hover:text-red-700"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-[#4C544F]">
                          Ningún archivo seleccionado
                        </span>
                      )}
                    </div>
                    {fieldErrors.cvFile && (
                      <p className="mt-1 text-xs text-red-700">
                        {fieldErrors.cvFile}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="career-notes"
                      className="mb-1.5 block text-xs font-medium text-[#1F2421]"
                    >
                      Puesto de interés o comentarios (opcional)
                    </label>
                    <textarea
                      id="career-notes"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Indícanos tu experiencia previa, carnet de conducir o disponibilidad..."
                      className="w-full rounded-md border border-[#1F2421]/20 bg-[#FAF8F4]/50 px-3.5 py-2.5 text-sm text-[#1F2421] focus:border-[#1B3B2B] focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Condiciones legales y Política de privacidad clicable */}
                  <div className="space-y-2 border-t border-[#1F2421]/10 pt-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <button
                        type="button"
                        onClick={() => onOpenLegal('legal')}
                        className="font-medium text-[#1B3B2B] underline underline-offset-4 hover:text-[#6E4E37]"
                      >
                        Haz click aquí para ver las condiciones legales.
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenLegal('privacy')}
                        className="font-medium text-[#1B3B2B] underline underline-offset-4 hover:text-[#6E4E37]"
                      >
                        Ver política de privacidad
                      </button>
                    </div>

                    <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs text-[#3A403C]">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#1B3B2B]"
                      />
                      <span>
                        He leído y acepto la{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            onOpenLegal('privacy');
                          }}
                          className="font-semibold text-[#1B3B2B] underline underline-offset-2"
                        >
                          política de privacidad
                        </button>{' '}
                        y las{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            onOpenLegal('legal');
                          }}
                          className="font-semibold text-[#1B3B2B] underline underline-offset-2"
                        >
                          condiciones legales
                        </button>{' '}
                        para el tratamiento de mi candidatura. *
                      </span>
                    </label>
                    {fieldErrors.privacyAccepted && (
                      <p className="text-xs text-red-700">
                        {fieldErrors.privacyAccepted}
                      </p>
                    )}
                  </div>

                  {/* Recuadro de verificación "No soy un robot" */}
                  <div>
                    <div className="inline-flex w-full max-w-xs items-center justify-between gap-4 rounded-md border border-[#1F2421]/20 bg-[#F3EFE6]/70 px-4 py-3">
                      <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1F2421]">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={notRobotVerified}
                          onClick={() =>
                            setNotRobotVerified((prev) => !prev)
                          }
                          className={`flex h-6 w-6 items-center justify-center rounded border transition-colors ${
                            notRobotVerified
                              ? 'border-[#1B3B2B] bg-[#1B3B2B] text-white'
                              : 'border-[#1F2421]/40 bg-white'
                          }`}
                        >
                          {notRobotVerified && (
                            <Check className="h-4 w-4" aria-hidden="true" />
                          )}
                        </button>
                        <span>No soy un robot</span>
                      </label>
                      <div className="flex flex-col items-center text-[10px] text-[#4C544F]">
                        <ShieldCheck
                          className="h-5 w-5 text-[#5F6F52]"
                          aria-hidden="true"
                        />
                        <span>Verificación</span>
                      </div>
                    </div>
                    {fieldErrors.notRobotVerified && (
                      <p className="mt-1 text-xs text-red-700">
                        {fieldErrors.notRobotVerified}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#1B3B2B] px-7 py-2.5 text-sm font-medium text-[#FAF8F4] transition-colors hover:bg-[#132A1E] disabled:opacity-60"
                    >
                      {submitting ? 'Enviando candidatura...' : 'Enviar'}
                    </button>
                  </div>
                </form>
              )}
            </div>
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
