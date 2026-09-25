// visual-baseline/serve-dist.ts
// Serves the static export in dist/ for the visual baseline run. It is
// dependency free so the harness does not add a server package.

import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const DIST_ROOT = join(process.cwd(), 'dist');
const PORT = Number(process.env.PORT ?? 41743);
const NOT_FOUND_PAGE = join(DIST_ROOT, '404.html');

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function resolveFile(requestUrl: string): string | null {
  const pathname = decodeURIComponent(requestUrl.split('?')[0]);
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let filePath = join(DIST_ROOT, safePath);

  if (!filePath.startsWith(DIST_ROOT)) return null;
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }
  if (!existsSync(filePath) && existsSync(`${filePath}.html`)) {
    filePath = `${filePath}.html`;
  }
  return existsSync(filePath) ? filePath : null;
}

createServer((request, response) => {
  const resolved = resolveFile(request.url ?? '/');
  const filePath = resolved ?? NOT_FOUND_PAGE;

  response.writeHead(resolved ? 200 : 404, {
    'content-type':
      CONTENT_TYPES[extname(filePath)] ?? 'application/octet-stream',
    'cache-control': 'no-store',
  });
  createReadStream(filePath).pipe(response);
}).listen(PORT, '127.0.0.1', () => {
  console.log(`serving dist/ at http://127.0.0.1:${PORT}`);
});
