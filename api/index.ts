import express, {type Request, type Response} from 'express';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

interface LeadPayload {
  intent: 'presupuesto' | 'asesoramiento' | 'contacto' | 'ficha_tecnica';
  name: string;
  company?: string;
  phone: string;
  email: string;
  projectType?: string;
  productInterest?: string;
  message: string;
  sourcePath?: string;
  privacyAccepted?: boolean;
  notRobotVerified?: boolean;
  website?: string;
}

interface CareerPayload {
  name: string;
  phone: string;
  email: string;
  message?: string;
  privacyAccepted: boolean;
  notRobotVerified: boolean;
  cvFile?: {
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    base64Content: string;
  } | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s().-]{7,24}$/;
const ALLOWED_CV_EXTENSIONS = ['.pdf', '.doc', '.docx'];

function getWritableDataDir(): string {
  const isServerless = Boolean(
    process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
  );
  if (isServerless) {
    return path.join(os.tmpdir(), 'abonos-naturales-data');
  }
  return path.resolve(process.cwd(), 'data');
}

async function appendJsonRecord(
  fileName: string,
  record: Record<string, unknown>
) {
  const dataDir = getWritableDataDir();
  const filePath = path.join(dataDir, fileName);
  await fs.mkdir(dataDir, {recursive: true});

  let existing: unknown[] = [];
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }

  existing.push(record);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf8');
}

export function createApiApp() {
  const app = express();
  app.use(express.json({limit: '8mb'}));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      crmConfigured: Boolean(process.env.CRM_WEBHOOK_URL),
    });
  });

  app.post('/api/leads', async (req: Request, res: Response) => {
    const body = req.body as Partial<LeadPayload> | undefined;

    if (!body || typeof body !== 'object') {
      res.status(400).json({
        ok: false,
        error: 'Formato de solicitud inválido.',
      });
      return;
    }

    if (String(body.website ?? '').trim().length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Solicitud rechazada por verificación antispam.',
      });
      return;
    }

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const message = String(body.message ?? '').trim();
    const company = String(body.company ?? '').trim();
    const projectType = String(body.projectType ?? '').trim();
    const productInterest = String(body.productInterest ?? '').trim();
    const intent = body.intent ?? 'contacto';
    const sourcePath = String(body.sourcePath ?? '/').trim();
    const privacyAccepted = Boolean(body.privacyAccepted);
    const notRobotVerified = Boolean(body.notRobotVerified);

    const fieldErrors: Record<string, string> = {};
    if (name.length < 2) {
      fieldErrors.name = 'Introduce tu nombre completo.';
    }
    if (!EMAIL_REGEX.test(email)) {
      fieldErrors.email = 'Introduce un correo electrónico válido.';
    }
    if (!PHONE_REGEX.test(phone)) {
      fieldErrors.phone = 'Introduce un teléfono de contacto válido.';
    }
    if (message.length < 10) {
      fieldErrors.message =
        'Describe brevemente tu consulta (mínimo 10 caracteres).';
    }
    if (!privacyAccepted) {
      fieldErrors.privacyAccepted =
        'Debes aceptar la política de privacidad y la política de cookies.';
    }
    if (!notRobotVerified) {
      fieldErrors.notRobotVerified =
        'Confirma la casilla de verificación "No soy un robot".';
    }

    if (Object.keys(fieldErrors).length > 0) {
      res.status(422).json({
        ok: false,
        error: 'Revisa los campos obligatorios del formulario.',
        fieldErrors,
      });
      return;
    }

    const referenceId = `AN-${Date.now().toString(36).toUpperCase()}`;
    const record = {
      referenceId,
      receivedAt: new Date().toISOString(),
      intent,
      name,
      company: company || null,
      phone,
      email,
      projectType: projectType || null,
      productInterest: productInterest || null,
      message,
      privacyAccepted,
      notRobotVerified,
      sourcePath,
    };

    try {
      await appendJsonRecord('leads.json', record);
    } catch (err) {
      console.error('Aviso al registrar solicitud en almacenamiento local:', err);
    }

    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    let forwardedToCrm = false;

    if (webhookUrl) {
      try {
        const crmRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(record),
        });
        forwardedToCrm = crmRes.ok;
      } catch (err) {
        console.error('Error al reenviar al CRM webhook:', err);
      }
    }

    res.status(201).json({
      ok: true,
      referenceId,
      crmConfigured: Boolean(webhookUrl),
      forwardedToCrm,
      message: forwardedToCrm
        ? 'Tu solicitud se ha registrado y enviado correctamente a nuestro equipo comercial.'
        : 'Tu solicitud ha quedado registrada con código de referencia. Para envío directo a nuestro buzón comercial, utiliza el acceso rápido inferior.',
    });
  });

  app.post('/api/careers', async (req: Request, res: Response) => {
    const body = req.body as Partial<CareerPayload> | undefined;

    if (!body || typeof body !== 'object') {
      res.status(400).json({ok: false, error: 'Formato de solicitud inválido.'});
      return;
    }

    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();
    const privacyAccepted = Boolean(body.privacyAccepted);
    const notRobotVerified = Boolean(body.notRobotVerified);
    const cvFile = body.cvFile ?? null;

    const fieldErrors: Record<string, string> = {};
    if (name.length < 3) {
      fieldErrors.name = 'Introduce tu nombre y apellidos.';
    }
    if (!PHONE_REGEX.test(phone)) {
      fieldErrors.phone = 'Introduce un teléfono de contacto válido.';
    }
    if (!EMAIL_REGEX.test(email)) {
      fieldErrors.email = 'Introduce un correo electrónico válido.';
    }
    if (!privacyAccepted) {
      fieldErrors.privacyAccepted =
        'Debes aceptar la política de privacidad y las condiciones legales.';
    }
    if (!notRobotVerified) {
      fieldErrors.notRobotVerified =
        'Confirma la casilla de verificación "No soy un robot".';
    }

    if (cvFile) {
      const ext = path.extname(cvFile.fileName || '').toLowerCase();
      if (!ALLOWED_CV_EXTENSIONS.includes(ext)) {
        fieldErrors.cvFile =
          'Formato no válido. Adjunta un archivo PDF, DOC o DOCX.';
      } else if (Number(cvFile.sizeBytes || 0) > 5 * 1024 * 1024) {
        fieldErrors.cvFile = 'El archivo supera el tamaño máximo de 5 MB.';
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      res.status(422).json({
        ok: false,
        error: 'Revisa los campos obligatorios del formulario de candidatura.',
        fieldErrors,
      });
      return;
    }

    const referenceId = `CV-${Date.now().toString(36).toUpperCase()}`;
    let storedCvPath: string | null = null;

    try {
      if (cvFile && cvFile.base64Content) {
        const uploadsDir = path.join(getWritableDataDir(), 'cv-uploads');
        await fs.mkdir(uploadsDir, {recursive: true});
        const safeBaseName = path
          .basename(cvFile.fileName)
          .replace(/[^a-zA-Z0-9._-]/g, '_');
        const targetFile = path.join(
          uploadsDir,
          `${referenceId}_${safeBaseName}`
        );
        const buffer = Buffer.from(cvFile.base64Content, 'base64');
        await fs.writeFile(targetFile, buffer);
        storedCvPath = `${referenceId}_${safeBaseName}`;
      }

      const record = {
        referenceId,
        receivedAt: new Date().toISOString(),
        type: 'candidatura_empleo',
        name,
        phone,
        email,
        message: message || null,
        privacyAccepted,
        cvFileName: cvFile?.fileName || null,
        cvSizeBytes: cvFile?.sizeBytes || null,
        storedCvPath,
      };

      await appendJsonRecord('careers.json', record);

      const webhookUrl = process.env.CRM_WEBHOOK_URL;
      let forwarded = false;
      if (webhookUrl) {
        try {
          const crmRes = await fetch(webhookUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(record),
          });
          forwarded = crmRes.ok;
        } catch (err) {
          console.error('Error al reenviar candidatura al webhook:', err);
        }
      }

      res.status(201).json({
        ok: true,
        referenceId,
        crmConfigured: Boolean(webhookUrl),
        forwardedToCrm: forwarded,
        message: forwarded
          ? 'Tu candidatura y CV se han registrado y remitido correctamente al departamento de selección.'
          : 'Tu candidatura ha quedado registrada con código de referencia. Si deseas remitir tu CV directamente a nuestro correo de administración, utiliza el botón inferior.',
      });
    } catch (err) {
      console.error('Error al guardar candidatura:', err);
      res.status(500).json({
        ok: false,
        error:
          'No se pudo procesar tu candidatura en este momento. Inténtalo de nuevo.',
      });
    }
  });

  return app;
}

const app = createApiApp();
export default app;
