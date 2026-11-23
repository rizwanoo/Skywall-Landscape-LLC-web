import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

const ALLOWED_SERVICES = new Set([
  'Paver Installation',
  'Artificial Turf',
  'Yard Cleanup',
  'Irrigation',
  'Multiple Services',
  'Other',
]);

const ALLOWED_CONTACT_METHODS = new Set(['Phone Call', 'Text Message', 'Email']);

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength);
}

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  const existingBody = (req as IncomingMessage & { body?: unknown }).body;
  if (existingBody && typeof existingBody === 'object') {
    return existingBody as Record<string, unknown>;
  }

  const chunks: Buffer[] = [];
  let total = 0;
  const maxBodyBytes = 8 * 1024 * 1024;
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    total += buf.length;
    if (total > maxBodyBytes) {
      throw new Error('Request payload exceeds maximum allowed size.');
    }
    chunks.push(buf);
  }
  const raw = Buffer.concat(chunks).toString('utf-8');
  return raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed.' });
    return;
  }

  try {
    const body = await readJsonBody(req);

    const fullName = cleanText(body.fullName, 120);
    const phone = cleanText(body.phone, 40);
    const email = cleanText(body.email, 160);
    const propertyLocation = cleanText(body.propertyLocation, 160);
    const serviceRequired = cleanText(body.serviceRequired, 80);
    const projectSize = cleanText(body.projectSize, 100);
    const description = cleanText(body.description, 2000);
    const preferredContact = cleanText(body.preferredContact, 40);

    if (fullName.length < 2) {
      sendJson(res, 400, { error: 'Please enter your full name.' });
      return;
    }

    if (phone.replace(/\D/g, '').length < 10) {
      sendJson(res, 400, { error: 'Please enter a valid 10-digit phone number.' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      sendJson(res, 400, { error: 'Please enter a valid email address.' });
      return;
    }

    if (propertyLocation.length < 2) {
      sendJson(res, 400, {
        error: 'Please enter your Las Vegas neighborhood or ZIP code.',
      });
      return;
    }

    if (!ALLOWED_SERVICES.has(serviceRequired)) {
      sendJson(res, 400, { error: 'Please select a valid service.' });
      return;
    }

    if (description.length < 10) {
      sendJson(res, 400, {
        error: 'Please share at least a brief description of your outdoor project.',
      });
      return;
    }

    const webhookUrl = process.env.ESTIMATE_WEBHOOK_URL?.trim();
    if (!webhookUrl) {
      sendJson(res, 503, {
        error:
          'Online estimate forwarding is not configured on this static deployment. Please call or text 702-366-3798 directly for a fast free estimate.',
      });
      return;
    }

    const parsedUrl = new URL(webhookUrl);
    const isPrivateHost =
      parsedUrl.hostname === 'localhost' ||
      parsedUrl.hostname === '127.0.0.1' ||
      parsedUrl.hostname.startsWith('10.') ||
      parsedUrl.hostname.startsWith('192.168.') ||
      parsedUrl.hostname === '169.254.169.254';

    if (parsedUrl.protocol !== 'https:' || isPrivateHost) {
      sendJson(res, 500, { error: 'Configured submission destination is invalid.' });
      return;
    }

    const referenceId = `EST-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const submittedAt = new Date().toISOString();

    const forwardResponse = await fetch(parsedUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        referenceId,
        submittedAt,
        fullName,
        phone,
        email,
        propertyLocation,
        serviceRequired,
        projectSize,
        description,
        preferredContact: ALLOWED_CONTACT_METHODS.has(preferredContact)
          ? preferredContact
          : 'Phone Call',
        hasPhotoAttachment: Boolean(body.photo),
      }),
    });

    if (!forwardResponse.ok) {
      sendJson(res, 502, {
        error: 'Unable to deliver estimate request right now. Please call or text 702-366-3798.',
      });
      return;
    }

    sendJson(res, 201, {
      success: true,
      referenceId,
      submittedAt,
      photoSaved: false,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to process your estimate request.';
    sendJson(res, 400, { error: message });
  }
}
