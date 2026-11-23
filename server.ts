import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';

dotenv.config();

const PORT = Number(process.env.PORT || 3000);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const UPLOADS_DIR = path.resolve(DATA_DIR, 'uploads');
const ESTIMATES_FILE = path.resolve(DATA_DIR, 'estimates.json');

const ALLOWED_SERVICES = new Set([
  'Paver Installation',
  'Artificial Turf',
  'Yard Cleanup',
  'Irrigation',
  'Multiple Services',
  'Other',
]);

const ALLOWED_CONTACT_METHODS = new Set(['Phone Call', 'Text Message', 'Email']);

interface EstimatePhotoPayload {
  dataUrl?: unknown;
  fileName?: unknown;
}

interface StoredEstimate {
  referenceId: string;
  submittedAt: string;
  fullName: string;
  phone: string;
  email: string;
  propertyLocation: string;
  serviceRequired: string;
  projectSize: string;
  description: string;
  preferredContact: string;
  photoFile: string | null;
}

function ensureStorageDirs(): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength);
}

function detectImageExtension(buffer: Buffer): string | null {
  if (buffer.length < 12) {
    return null;
  }
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'jpg';
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'png';
  }
  // WebP: RIFF....WEBP
  if (
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'webp';
  }
  return null;
}

function saveValidatedPhoto(photo: EstimatePhotoPayload): string | null {
  if (typeof photo.dataUrl !== 'string' || !photo.dataUrl.startsWith('data:image/')) {
    return null;
  }
  const commaIdx = photo.dataUrl.indexOf(',');
  if (commaIdx === -1) {
    return null;
  }
  const header = photo.dataUrl.slice(0, commaIdx);
  if (!/^data:image\/(jpeg|jpg|png|webp);base64$/i.test(header)) {
    throw new Error('Only JPEG, PNG, or WebP images are supported.');
  }

  const base64Body = photo.dataUrl.slice(commaIdx + 1);
  const buffer = Buffer.from(base64Body, 'base64');
  const maxBytes = 5 * 1024 * 1024;
  if (buffer.length === 0 || buffer.length > maxBytes) {
    throw new Error('Uploaded photo must be under 5 MB.');
  }

  const ext = detectImageExtension(buffer);
  if (!ext) {
    throw new Error('Uploaded file content is not a valid JPEG, PNG, or WebP image.');
  }

  const fileName = `estimate-${crypto.randomUUID()}.${ext}`;
  const destination = path.resolve(UPLOADS_DIR, fileName);
  if (!destination.startsWith(UPLOADS_DIR + path.sep)) {
    throw new Error('Invalid upload path.');
  }

  fs.writeFileSync(destination, buffer, { mode: 0o640 });
  return fileName;
}

function readExistingEstimates(): StoredEstimate[] {
  if (!fs.existsSync(ESTIMATES_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(ESTIMATES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredEstimate[]) : [];
  } catch {
    return [];
  }
}

function appendEstimateRecord(record: StoredEstimate): void {
  const existing = readExistingEstimates();
  existing.push(record);
  const tempPath = path.resolve(DATA_DIR, `estimates.${crypto.randomUUID()}.tmp`);
  if (!tempPath.startsWith(DATA_DIR + path.sep)) {
    throw new Error('Invalid storage path.');
  }
  fs.writeFileSync(tempPath, JSON.stringify(existing, null, 2), { mode: 0o640 });
  fs.renameSync(tempPath, ESTIMATES_FILE);
}

function getBaseUrl(req: Request): string {
  const configured = process.env.APP_URL?.trim();
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured.replace(/\/+$/, '');
  }
  const proto = req.headers['x-forwarded-proto'] === 'https' ? 'https' : req.protocol;
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
  return `${proto}://${Array.isArray(host) ? host[0] : host}`;
}

async function startServer(): Promise<void> {
  ensureStorageDirs();

  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '8mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, service: 'skywall-landscape' });
  });

  app.post('/api/estimates', async (req: Request, res: Response) => {
    try {
      const body = (req.body ?? {}) as Record<string, unknown>;

      const fullName = cleanText(body.fullName, 120);
      const phone = cleanText(body.phone, 40);
      const email = cleanText(body.email, 160);
      const propertyLocation = cleanText(body.propertyLocation, 160);
      const serviceRequired = cleanText(body.serviceRequired, 80);
      const projectSize = cleanText(body.projectSize, 100);
      const description = cleanText(body.description, 2000);
      const preferredContact = cleanText(body.preferredContact, 40);

      if (fullName.length < 2) {
        res.status(400).json({ error: 'Please enter your full name.' });
        return;
      }

      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        res.status(400).json({ error: 'Please enter a valid 10-digit phone number.' });
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ error: 'Please enter a valid email address.' });
        return;
      }

      if (propertyLocation.length < 2) {
        res.status(400).json({ error: 'Please enter your Las Vegas neighborhood or ZIP code.' });
        return;
      }

      if (!ALLOWED_SERVICES.has(serviceRequired)) {
        res.status(400).json({ error: 'Please select a valid service.' });
        return;
      }

      if (description.length < 10) {
        res.status(400).json({
          error: 'Please share at least a brief description of your outdoor project.',
        });
        return;
      }

      const normalizedPreferred = ALLOWED_CONTACT_METHODS.has(preferredContact)
        ? preferredContact
        : 'Phone Call';

      let savedPhotoFile: string | null = null;
      if (body.photo && typeof body.photo === 'object') {
        savedPhotoFile = saveValidatedPhoto(body.photo as EstimatePhotoPayload);
      }

      const referenceId = `EST-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
      const submittedAt = new Date().toISOString();

      const record: StoredEstimate = {
        referenceId,
        submittedAt,
        fullName,
        phone,
        email,
        propertyLocation,
        serviceRequired,
        projectSize,
        description,
        preferredContact: normalizedPreferred,
        photoFile: savedPhotoFile,
      };

      appendEstimateRecord(record);

      const webhookUrl = process.env.ESTIMATE_WEBHOOK_URL?.trim();
      if (webhookUrl) {
        try {
          const parsedUrl = new URL(webhookUrl);
          const isPrivateHost =
            parsedUrl.hostname === 'localhost' ||
            parsedUrl.hostname === '127.0.0.1' ||
            parsedUrl.hostname.startsWith('10.') ||
            parsedUrl.hostname.startsWith('192.168.') ||
            parsedUrl.hostname === '169.254.169.254';
          if (parsedUrl.protocol === 'https:' && !isPrivateHost) {
            await fetch(parsedUrl.toString(), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(record),
            });
          }
        } catch {
          // Local storage remains authoritative if optional webhook forwarding fails
        }
      }

      res.status(201).json({
        success: true,
        referenceId,
        submittedAt,
        photoSaved: Boolean(savedPhotoFile),
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to process your estimate request.';
      res.status(400).json({ error: message });
    }
  });

  app.get('/robots.txt', (req: Request, res: Response) => {
    const baseUrl = getBaseUrl(req);
    res
      .type('text/plain')
      .send(`User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const baseUrl = getBaseUrl(req);
    const routes = ['/', '/services', '/projects', '/contact'];
    const urls = routes
      .map(
        (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
      )
      .join('\n');

    res.type('application/xml').send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    );
  });

  const ROUTE_META: Record<string, { title: string; description: string }> = {
    '/': {
      title: 'Skywall Landscape LLC | Landscaping & Pavers in Las Vegas, NV',
      description:
        'Custom pavers, artificial turf, yard cleanups, and irrigation in Las Vegas, Nevada. Request a free estimate from Skywall Landscape LLC.',
    },
    '/services': {
      title: 'Landscaping Services in Las Vegas | Pavers, Turf & Irrigation',
      description:
        'Explore paver installation, artificial turf, yard cleanups, and irrigation services across Las Vegas from Skywall Landscape LLC.',
    },
    '/projects': {
      title: 'Our Projects | Las Vegas Landscaping Portfolio – Skywall Landscape LLC',
      description:
        'Browse residential paver installations, artificial turf lawns, yard cleanups, and desert landscape transformations in Las Vegas.',
    },
    '/contact': {
      title: 'Free Estimate & Contact | Skywall Landscape LLC – Las Vegas, NV',
      description:
        'Call, text, or request a free landscaping estimate in Las Vegas from Skywall Landscape LLC. Pavers, artificial turf, cleanups, and irrigation.',
    },
  };

  function applySocialMeta(html: string, req: Request): string {
    const baseUrl = getBaseUrl(req);
    const reqPath = req.path === '/' ? '/' : req.path.replace(/\/+$/, '');
    const meta = ROUTE_META[reqPath] || ROUTE_META['/'];
    const pageUrl = `${baseUrl}${reqPath === '/' ? '/' : reqPath}`;
    const ogImage = `${baseUrl}/og-image.jpg`;
    const logoUrl = `${baseUrl}/logo.jpg`;

    return html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
        `<meta name="description" content="${meta.description}" />`
      )
      .replace(
        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
        `<meta property="og:title" content="${meta.title}" />\n    <meta property="og:url" content="${pageUrl}" />\n    <link rel="canonical" href="${pageUrl}" />`
      )
      .replace(
        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
        `<meta property="og:description" content="${meta.description}" />`
      )
      .replaceAll('content="/og-image.jpg"', `content="${ogImage}"`)
      .replaceAll('"logo": "/logo.jpg"', `"logo": "${logoUrl}"`)
      .replaceAll('"image": "/og-image.jpg"', `"image": "${ogImage}"`);
  }

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    const indexHtmlPath = path.resolve(distDir, 'index.html');
    const cachedHtml = fs.existsSync(indexHtmlPath)
      ? fs.readFileSync(indexHtmlPath, 'utf-8')
      : '';

    app.use(express.static(distDir, { index: false }));
    app.get('*', (req: Request, res: Response) => {
      if (cachedHtml) {
        res.type('text/html').send(applySocialMeta(cachedHtml, req));
        return;
      }
      res.sendFile(indexHtmlPath);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Skywall Landscape server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
