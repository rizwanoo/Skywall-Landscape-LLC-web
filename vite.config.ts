import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-og-origin',
        transformIndexHtml(html: string): string {
          const vercelHost =
            process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
          const baseUrl =
            process.env.APP_URL?.trim() || (vercelHost ? `https://${vercelHost}` : '');
          if (!baseUrl) {
            return html;
          }
          const cleanBase = baseUrl.replace(/\/+$/, '');
          return html
            .replaceAll('content="/og-image.jpg"', `content="${cleanBase}/og-image.jpg"`)
            .replaceAll('"logo": "/logo.jpg"', `"logo": "${cleanBase}/logo.jpg"`)
            .replaceAll('"image": "/og-image.jpg"', `"image": "${cleanBase}/og-image.jpg"`);
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
