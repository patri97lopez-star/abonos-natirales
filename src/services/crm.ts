export type LeadIntent = 'presupuesto' | 'asesoramiento' | 'contacto' | 'ficha_tecnica';

export interface LeadRequest {
  intent: LeadIntent;
  name: string;
  company?: string;
  phone: string;
  email: string;
  projectType?: string;
  productInterest?: string;
  message: string;
  sourcePath?: string;
  privacyAccepted: boolean;
  notRobotVerified: boolean;
  website?: string;
}

export interface LeadResponse {
  ok: boolean;
  referenceId?: string;
  crmConfigured?: boolean;
  forwardedToCrm?: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitLeadToCrm(payload: LeadRequest): Promise<LeadResponse> {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as LeadResponse;
  if (!response.ok) {
    return {
      ok: false,
      error: data.error || 'No se pudo procesar la solicitud.',
      fieldErrors: data.fieldErrors,
    };
  }
  return data;
}

export function buildMailtoFallback(payload: LeadRequest): string {
  const subjectMap: Record<LeadIntent, string> = {
    presupuesto: 'Solicitud de presupuesto',
    asesoramiento: 'Solicitud de asesoramiento técnico',
    contacto: 'Consulta comercial',
    ficha_tecnica: 'Solicitud de ficha técnica oficial',
  };

  const subject = `[Web] ${subjectMap[payload.intent]}${
    payload.productInterest ? ` - ${payload.productInterest}` : ''
  }`;

  const lines = [
    `Nombre: ${payload.name}`,
    payload.company ? `Empresa: ${payload.company}` : null,
    `Teléfono: ${payload.phone}`,
    `Correo: ${payload.email}`,
    payload.projectType ? `Tipo de proyecto: ${payload.projectType}` : null,
    payload.productInterest ? `Producto de interés: ${payload.productInterest}` : null,
    '',
    'Detalle de la consulta:',
    payload.message,
  ]
    .filter(Boolean)
    .join('\n');

  return `mailto:info@abonosnaturales.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(lines)}`;
}
