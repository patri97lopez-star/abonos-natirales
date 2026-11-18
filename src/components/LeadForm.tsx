import React, {useEffect, useState} from 'react';
import {AlertCircle, Check, CheckCircle2, Mail, Phone, ShieldCheck} from 'lucide-react';
import {PRODUCT_CATEGORIES, PRODUCTS} from '../data/catalog';
import {COMPANY_INFO} from '../data/company';
import {useRouter} from '../lib/router';
import {trackEvent} from '../services/analytics';
import {
  buildMailtoFallback,
  submitLeadToCrm,
  type LeadIntent,
  type LeadRequest,
} from '../services/crm';

interface LeadFormProps {
  intent: LeadIntent;
  submitLabel: string;
  initialProduct?: string;
  initialProjectType?: string;
  showProjectFields?: boolean;
  darkSurface?: boolean;
  sourcePath?: string;
}

const PROJECT_TYPES = [
  'Garden o vivero',
  'Paisajismo y jardinería',
  'Obra civil / Administración pública',
  'Distribuidor / Empresa agrícola',
  'Uso particular / Jardín y huerto',
  'Gestión de residuos vegetales',
];

export function LeadForm({
  intent,
  submitLabel,
  initialProduct = '',
  initialProjectType = '',
  showProjectFields = true,
  darkSurface = false,
  sourcePath = '/',
}: LeadFormProps) {
  const {openLegalModal, openCookieModal} = useRouter();

  const [website, setWebsite] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType);
  const [productInterest, setProductInterest] = useState(initialProduct);
  const [message, setMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [notRobotVerified, setNotRobotVerified] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    message: string;
    crmConfigured: boolean;
    payload: LeadRequest;
  } | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setProductInterest(initialProduct);
    }
  }, [initialProduct]);

  useEffect(() => {
    if (initialProjectType) {
      setProjectType(initialProjectType);
    }
  }, [initialProjectType]);

  const validateClient = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (name.trim().length < 2) {
      errors.name = 'Introduce tu nombre completo.';
    }
    if (!/^[+\d\s().-]{7,24}$/.test(phone.trim())) {
      errors.phone = 'Introduce un número de teléfono válido.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Introduce un correo electrónico válido.';
    }
    if (message.trim().length < 10) {
      errors.message = 'Describe brevemente tu consulta (mínimo 10 caracteres).';
    }
    if (!privacyAccepted) {
      errors.privacyAccepted =
        'Debes aceptar la política de privacidad y la política de cookies.';
    }
    if (!notRobotVerified) {
      errors.notRobotVerified =
        'Marca la casilla de verificación "No soy un robot".';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    const payload: LeadRequest = {
      intent,
      name: name.trim(),
      company: company.trim() || undefined,
      phone: phone.trim(),
      email: email.trim(),
      projectType: projectType || undefined,
      productInterest: productInterest || undefined,
      message: message.trim(),
      sourcePath,
      privacyAccepted,
      notRobotVerified,
      website: website || undefined,
    };

    try {
      const res = await submitLeadToCrm(payload);
      if (!res.ok) {
        if (res.fieldErrors) {
          setFieldErrors(res.fieldErrors);
        }
        setSubmitError(res.error || 'No se pudo registrar la consulta.');
        setSubmitting(false);
        return;
      }

      trackEvent('lead_submitted', {
        intent,
        project_type: projectType || 'no_especificado',
        product_interest: productInterest || 'general',
      });

      setSuccessData({
        referenceId: res.referenceId || 'REGISTRADO',
        message:
          res.message ||
          'Solicitud registrada correctamente en el sistema.',
        crmConfigured: Boolean(res.crmConfigured && res.forwardedToCrm),
        payload,
      });
    } catch {
      setSubmitError(
        'Error de conexión al registrar la solicitud. Puedes llamarnos directamente o enviarnos un correo.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputBaseClass = darkSurface
    ? 'w-full rounded-md border border-[#FAF8F4]/25 bg-[#132A1E] px-3.5 py-2.5 text-sm text-[#FAF8F4] placeholder:text-[#FAF8F4]/50 focus:border-[#A3B899] focus:outline-none'
    : 'w-full rounded-md border border-[#1F2421]/20 bg-white px-3.5 py-2.5 text-sm text-[#1F2421] placeholder:text-[#4C544F]/60 focus:border-[#1B3B2B] focus:outline-none';

  const labelClass = darkSurface
    ? 'mb-1.5 block text-xs font-medium text-[#FAF8F4]/90'
    : 'mb-1.5 block text-xs font-medium text-[#1F2421]';

  const errorTextClass = darkSurface ? 'mt-1 text-xs text-amber-300' : 'mt-1 text-xs text-red-700';

  if (successData) {
    return (
      <div
        role="status"
        className={`rounded-lg border p-6 ${
          darkSurface
            ? 'border-[#A3B899]/40 bg-[#132A1E] text-[#FAF8F4]'
            : 'border-[#1B3B2B]/25 bg-[#F3EFE6] text-[#1F2421]'
        }`}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className={`mt-0.5 h-5 w-5 shrink-0 ${
              darkSurface ? 'text-[#A3B899]' : 'text-[#1B3B2B]'
            }`}
            aria-hidden="true"
          />
          <div className="space-y-3">
            <div>
              <p className="font-display text-base font-semibold">
                Solicitud registrada · Referencia{' '}
                <span className="font-mono tabular-nums">
                  {successData.referenceId}
                </span>
              </p>
              <p
                className={`mt-1 text-sm leading-relaxed ${
                  darkSurface ? 'text-[#FAF8F4]/85' : 'text-[#3A403C]'
                }`}
              >
                {successData.message}
              </p>
            </div>

            {!successData.crmConfigured && (
              <div
                className={`rounded-md border p-3.5 text-xs leading-relaxed ${
                  darkSurface
                    ? 'border-[#FAF8F4]/15 bg-[#1B3B2B] text-[#FAF8F4]/85'
                    : 'border-[#1F2421]/10 bg-white text-[#3A403C]'
                }`}
              >
                Esta instancia conserva tu solicitud en el registro interno del
                servidor. Si deseas cursar el envío inmediato a nuestro buzón
                comercial, pulsa en &ldquo;Abrir en correo&rdquo; o llámanos:
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={buildMailtoFallback(successData.payload)}
                className={`inline-flex min-h-10 items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-colors ${
                  darkSurface
                    ? 'bg-[#FAF8F4] text-[#1B3B2B] hover:bg-[#EAE4D7]'
                    : 'bg-[#1B3B2B] text-[#FAF8F4] hover:bg-[#132A1E]'
                }`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Abrir en correo ({COMPANY_INFO.email})
              </a>

              <a
                href={COMPANY_INFO.phonePrimaryHref}
                className={`inline-flex min-h-10 items-center gap-2 rounded-md border px-4 py-2 text-xs font-medium transition-colors ${
                  darkSurface
                    ? 'border-[#FAF8F4]/30 text-[#FAF8F4] hover:bg-[#FAF8F4]/10'
                    : 'border-[#1F2421]/20 text-[#1F2421] hover:bg-white'
                }`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Llamar al {COMPANY_INFO.phonePrimary}
              </a>

              <button
                type="button"
                onClick={() => {
                  setSuccessData(null);
                  setMessage('');
                }}
                className={`text-xs font-medium underline underline-offset-4 ${
                  darkSurface
                    ? 'text-[#FAF8F4]/80 hover:text-white'
                    : 'text-[#4C544F] hover:text-[#1F2421]'
                }`}
              >
                Enviar otra consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Campo antispam oculto (Website honeypot) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`website-${intent}`}>Website</label>
        <input
          id={`website-${intent}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-red-700/30 bg-red-50 px-3.5 py-3 text-sm text-red-900"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      {showProjectFields ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`name-${intent}`} className={labelClass}>
              Nombre *
            </label>
            <input
              id={`name-${intent}`}
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre y apellidos"
              aria-invalid={Boolean(fieldErrors.name)}
              className={inputBaseClass}
            />
            {fieldErrors.name && <p className={errorTextClass}>{fieldErrors.name}</p>}
          </div>

          <div>
            <label htmlFor={`company-${intent}`} className={labelClass}>
              Empresa / Entidad
            </label>
            <input
              id={`company-${intent}`}
              name="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Vivero, constructora, ayuntamiento..."
              className={inputBaseClass}
            />
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor={`name-${intent}`} className={labelClass}>
            Nombre *
          </label>
          <input
            id={`name-${intent}`}
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre y apellidos o empresa"
            aria-invalid={Boolean(fieldErrors.name)}
            className={inputBaseClass}
          />
          {fieldErrors.name && <p className={errorTextClass}>{fieldErrors.name}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`phone-${intent}`} className={labelClass}>
            Teléfono *
          </label>
          <input
            id={`phone-${intent}`}
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ej. 925 79 54 63"
            aria-invalid={Boolean(fieldErrors.phone)}
            className={inputBaseClass}
          />
          {fieldErrors.phone && <p className={errorTextClass}>{fieldErrors.phone}</p>}
        </div>

        <div>
          <label htmlFor={`email-${intent}`} className={labelClass}>
            Email *
          </label>
          <input
            id={`email-${intent}`}
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            aria-invalid={Boolean(fieldErrors.email)}
            className={inputBaseClass}
          />
          {fieldErrors.email && <p className={errorTextClass}>{fieldErrors.email}</p>}
        </div>
      </div>

      {showProjectFields && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`projectType-${intent}`} className={labelClass}>
              Tipo de proyecto
            </label>
            <select
              id={`projectType-${intent}`}
              name="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className={inputBaseClass}
            >
              <option value="">Seleccionar perfil / proyecto</option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`productInterest-${intent}`} className={labelClass}>
              Producto o gama de interés
            </label>
            <select
              id={`productInterest-${intent}`}
              name="productInterest"
              value={productInterest}
              onChange={(e) => setProductInterest(e.target.value)}
              className={inputBaseClass}
            >
              <option value="">Consulta general / varias gamas</option>
              <optgroup label="Categorías">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Productos específicos">
                {PRODUCTS.map((prod) => (
                  <option key={prod.slug} value={prod.name}>
                    {prod.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor={`message-${intent}`} className={labelClass}>
          {intent === 'contacto' ? 'Consulta *' : 'Descripción de la necesidad *'}
        </label>
        <textarea
          id={`message-${intent}`}
          name="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Indícanos tu consulta, volumen estimado, formato (saco, big-bag o granel) o zona de entrega..."
          aria-invalid={Boolean(fieldErrors.message)}
          className={inputBaseClass}
        />
        {fieldErrors.message && <p className={errorTextClass}>{fieldErrors.message}</p>}
      </div>

      {/* Política de privacidad y política de cookies clicable */}
      <div
        className={`space-y-2 border-t pt-3 ${
          darkSurface ? 'border-[#FAF8F4]/15' : 'border-[#1F2421]/10'
        }`}
      >
        <label
          className={`flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed ${
            darkSurface ? 'text-[#FAF8F4]/85' : 'text-[#3A403C]'
          }`}
        >
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
                openLegalModal('privacy');
              }}
              className={`font-semibold underline underline-offset-2 ${
                darkSurface ? 'text-[#FAF8F4]' : 'text-[#1B3B2B]'
              }`}
            >
              política de privacidad
            </button>{' '}
            y la{' '}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openCookieModal('policy');
              }}
              className={`font-semibold underline underline-offset-2 ${
                darkSurface ? 'text-[#FAF8F4]' : 'text-[#1B3B2B]'
              }`}
            >
              política de cookies
            </button>
            . *
          </span>
        </label>
        {fieldErrors.privacyAccepted && (
          <p className={errorTextClass}>{fieldErrors.privacyAccepted}</p>
        )}
      </div>

      {/* Recuadro de verificación "No soy un robot" */}
      <div>
        <div
          className={`inline-flex w-full max-w-xs items-center justify-between gap-4 rounded-md border px-4 py-2.5 ${
            darkSurface
              ? 'border-[#FAF8F4]/25 bg-[#132A1E]'
              : 'border-[#1F2421]/20 bg-[#F3EFE6]/70'
          }`}
        >
          <label
            className={`flex cursor-pointer items-center gap-3 text-sm font-medium ${
              darkSurface ? 'text-[#FAF8F4]' : 'text-[#1F2421]'
            }`}
          >
            <button
              type="button"
              role="checkbox"
              aria-checked={notRobotVerified}
              onClick={() => setNotRobotVerified((prev) => !prev)}
              className={`flex h-6 w-6 items-center justify-center rounded border transition-colors ${
                notRobotVerified
                  ? 'border-[#1B3B2B] bg-[#1B3B2B] text-white'
                  : darkSurface
                    ? 'border-[#FAF8F4]/40 bg-[#1B3B2B]/50'
                    : 'border-[#1F2421]/40 bg-white'
              }`}
            >
              {notRobotVerified && <Check className="h-4 w-4" aria-hidden="true" />}
            </button>
            <span>No soy un robot</span>
          </label>
          <div
            className={`flex flex-col items-center text-[10px] ${
              darkSurface ? 'text-[#FAF8F4]/70' : 'text-[#4C544F]'
            }`}
          >
            <ShieldCheck
              className={`h-5 w-5 ${darkSurface ? 'text-[#A3B899]' : 'text-[#5F6F52]'}`}
              aria-hidden="true"
            />
            <span>Verificación</span>
          </div>
        </div>
        {fieldErrors.notRobotVerified && (
          <p className={errorTextClass}>{fieldErrors.notRobotVerified}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-xs ${darkSurface ? 'text-[#FAF8F4]/70' : 'text-[#4C544F]'}`}>
          Campos marcados con * obligatorios.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className={`inline-flex min-h-11 items-center justify-center rounded-md px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-colors disabled:opacity-60 ${
            darkSurface
              ? 'bg-[#FAF8F4] text-[#1B3B2B] hover:bg-[#EAE4D7]'
              : 'bg-[#1B3B2B] text-[#FAF8F4] hover:bg-[#132A1E]'
          }`}
        >
          {submitting ? 'Registrando solicitud...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
