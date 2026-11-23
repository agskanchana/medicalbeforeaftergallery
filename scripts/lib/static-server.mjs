// A tiny static file server with GitHub Pages rules (no dependencies):
// "/x/" is x/index.html, "/x" is the file x, x.html, or a redirect to "/x/" for a folder;
// anything else is 404.html with status 404. Query strings are ignored.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.mp4': 'video/mp4', '.webm': 'video/webm',
};
export function serveStatic(dir, port, host = '127.0.0.1') {
  const root = path.resolve(dir);
  const stat = (f) => { try { return fs.statSync(f); } catch { return null; } };
  const server = http.createServer((req, res) => {
    let rel;
    try { rel = decodeURIComponent(req.url.split('?')[0]); } catch { rel = '/'; }
    let file = path.join(root, rel);
    const send = (status, f) => {
      res.writeHead(status, { 'Content-Type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(f).pipe(res);
    };
    const notFound = () => {
      const f = path.join(root, '404.html');
      if (stat(f)) return send(404, f);
      res.writeHead(404); res.end('Not found');
    };
    if (!file.startsWith(root)) return notFound();
    if (rel.endsWith('/')) { file = path.join(file, 'index.html'); return stat(file) ? send(200, file) : notFound(); }
    const s = stat(file);
    if (s && s.isFile()) return send(200, file);
    if (s && s.isDirectory()) { res.writeHead(301, { Location: rel + '/' }); return res.end(); }
    if (stat(file + '.html')) return send(200, file + '.html');
    notFound();
  });
  return new Promise((resolve) => server.listen(port, host, () => resolve(server)));
}

