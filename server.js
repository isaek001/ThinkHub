// ThinkHub API + static host for the React frontend. Zero dependencies (Node >= 18).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.ADMIN_PASSWORD || 'thinkhub-admin'; // CHANGE via env
const SECRET = process.env.ADMIN_SECRET || crypto.createHash('sha256').update(PASSWORD + 'thwebsite').digest('hex');
const DATA = process.env.DATA_DIR || path.join(ROOT, 'data');
const DB = path.join(DATA, 'content.json');
const DIST = process.env.DIST_DIR || path.join(ROOT, 'dist');

const SECTIONS = { stats: ['label', 'value'], pillars: ['title', 'text'], spaces: ['icon', 'title', 'text'], programs: ['title', 'dates', 'status', 'text', 'link'], team: ['name', 'role'] };
const SITE = ['name', 'tagline', 'heroTitle', 'heroText', 'about', 'mission', 'email', 'phone', 'address', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube'];
const PUBLIC_SECTIONS = ['site', 'stats', 'pillars', 'spaces', 'programs', 'team'];

const seed = () => ({ site: { name: 'Think Hub', tagline: 'Create. Collaborate. Chill.', heroTitle: 'Where young creatives in Jos bring ideas to life',
  heroText: 'Think Hub gives young creatives a platform to turn ideas into content that travels beyond Jos to the world.',
  about: 'Think Hub provides young people a platform to bring their creative ideas to life, whatever the constraints. Serving the city of Jos, we broaden the perspective of talented youth and help them create content that transcends their locality.',
  mission: 'Young creatives often lack affordable hands-on training and professional equipment. We bring both under one roof: workshops, online courses, and a well-equipped space to practise and produce.',
  email: '', phone: '', address: 'Jos, Plateau State, Nigeria', instagram: '', twitter: '', linkedin: '', tiktok: '', youtube: '' },
  stats: [{ label: 'Creatives in the community', value: '80' }, { label: 'Partnerships', value: '4' }, { label: 'Talents trained', value: '10' }],
  pillars: [{ title: 'Create', text: 'A platform to brainstorm, develop and refine creative ideas, regardless of limitations.' }, { title: 'Collaborate', text: 'We bring young creatives together to share ideas, learn from each other and build a creative community in Jos.' }, { title: 'Chill', text: 'Creating should be fun. Games, activities and a supportive atmosphere keep people motivated.' }],
  spaces: [{ icon: 'Rocket', title: 'Incubator', text: 'Programs, mentorship and demo days that help startups grow.' }, { icon: 'Monitor', title: 'Coworking Space', text: 'Daily, monthly and yearly access, dedicated desks and event space.' }, { icon: 'Palette', title: 'Art Gallery (Web3)', text: 'Exhibitions, artist talks and digital art sold as NFTs.' }, { icon: 'MicVocal', title: 'Recording Studio', text: 'Studio rental, production, mixing, mastering and music classes.' }, { icon: 'Lightbulb', title: 'Consulting', text: 'Business strategy, web, app and blockchain consulting, plus training.' }],
  programs: [{ title: 'She Creates', dates: '8th – 25th June', status: 'Past edition', text: 'A free two-week workshop training women in content creation: content strategy, writing that converts, and production (voice-over, video and editing). Every participant finishes with a real content project.', link: '' }],
  team: [{ name: 'Shamsiyyah', role: 'Chief Operating Officer' }, { name: 'Iyanuoluwa', role: 'Creative Director, Incubation & Training' }, { name: 'Victor', role: 'Art Gallery Lead' }, { name: 'Simon', role: 'Social Media Lead' }, { name: 'Daniel', role: 'Recording Studio Lead' }, { name: 'Arron', role: 'Video Editor' }],
  messages: [], seq: 0 });

fs.mkdirSync(DATA, { recursive: true });
let db = fs.existsSync(DB) ? JSON.parse(fs.readFileSync(DB, 'utf8')) : seed();
const persist = () => { const t = DB + '.tmp'; fs.writeFileSync(t, JSON.stringify(db, null, 2)); fs.renameSync(t, DB); };
persist();

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const url = (u) => (/^https?:\/\//i.test(u) ? esc(u) : '');
const str = (v, n = 1000) => String(v ?? '').slice(0, n);

const sign = (e) => { const p = String(e); return p + '.' + crypto.createHmac('sha256', SECRET).update(p).digest('hex'); };
function authed(req) {
  const [p, s] = (req.headers.authorization || '').replace('Bearer ', '').split('.');
  if (!p || !s) return false;
  const g = crypto.createHmac('sha256', SECRET).update(p).digest('hex');
  return s.length === g.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(g)) && Date.now() < +p;
}

const hits = {};
const limited = (k, max, ms) => { const n = Date.now(), a = (hits[k] || []).filter((t) => n - t < ms); a.push(n); hits[k] = a; return a.length > max; };
const send = (r, c, o) => { r.writeHead(c, { 'Content-Type': 'application/json' }); r.end(JSON.stringify(o)); };
const body = (req) => new Promise((ok, no) => { let b = ''; req.on('data', (c) => { b += c; if (b.length > 2e5) req.destroy(); }); req.on('end', () => { try { ok(b ? JSON.parse(b) : {}); } catch (e) { no(e); } }); });
const ip = (req) => (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();

// ---------------------------------------------------------------- static app
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.map': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json' };
const H = { 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'strict-origin-when-cross-origin' };

const hasBuild = () => fs.existsSync(path.join(DIST, 'index.html'));

// Rewrite the built index.html: dynamic <title>/meta for crawlers + inlined content
// so the first React paint already has data (no loading flash, no extra round trip).
const beforeHead = (html, tag) => html.replace(/<\/head>/i, () => `${tag}\n</head>`);
const upsertMeta = (html, attr, value) => {
  // attr is the identifying pair, e.g. 'name="description"' or 'property="og:title"'
  const re = new RegExp(`<meta\\s+${attr}\\s+content="[^"]*"\\s*/?>`, 'i');
  return re.test(html) ? html.replace(re, () => value) : beforeHead(html, value);
};
const setTitle = (html, value) => {
  const re = /<title>[\s\S]*?<\/title>/i;
  return re.test(html) ? html.replace(re, () => `<title>${value}</title>`) : beforeHead(html, `<title>${value}</title>`);
};
const jsonForScript = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

const publicContent = () => Object.fromEntries(PUBLIC_SECTIONS.map((k) => [k, db[k]]));

function renderApp({ admin = false } = {}) {
  const s = db.site;
  let html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  html = setTitle(html, esc(admin ? `${s.name} Admin` : `${s.name} | ${s.tagline}`));

  if (admin) {
    html = upsertMeta(html, 'name="robots"', '<meta name="robots" content="noindex, nofollow">');
  } else {
    const desc = esc(str(s.heroText, 300));
    html = upsertMeta(html, 'name="description"', `<meta name="description" content="${desc}">`);
    html = upsertMeta(html, 'property="og:title"', `<meta property="og:title" content="${esc(s.name)}">`);
    html = upsertMeta(html, 'property="og:description"', `<meta property="og:description" content="${desc}">`);
    const boot = `window.__THINKHUB__=${jsonForScript({ ...publicContent(), siteFields: SITE, schema: SECTIONS })}`;
    html = html.includes('window.__THINKHUB__=null') ? html.replace('window.__THINKHUB__=null', () => boot) : beforeHead(html, `<script>${boot}</script>`);
  }
  return html;
}

function sendApp(req, res, admin) {
  if (!hasBuild()) {
    res.writeHead(503, { ...H, 'Content-Type': 'text/html; charset=utf-8' });
    return res.end('<!doctype html><meta charset="utf-8"><title>Build required</title><h1>Frontend not built</h1><p>Run <code>npm run build</code> first, or use <code>npm run dev</code> for the Vite dev server.</p>');
  }
  const headers = { ...H, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' };
  if (admin) headers['X-Robots-Tag'] = 'noindex, nofollow';
  res.writeHead(200, headers);
  res.end(renderApp({ admin }));
}

function sendStatic(req, res, pathname) {
  const ext = path.extname(pathname).toLowerCase();
  const type = MIME[ext];
  if (!type) return false;
  const file = path.join(DIST, decodeURIComponent(pathname));
  if (path.relative(DIST, file).startsWith('..') || !fs.existsSync(file) || !fs.statSync(file).isFile()) return false;
  const immutable = pathname.startsWith('/assets/');
  res.writeHead(200, { ...H, 'Content-Type': type, 'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=3600' });
  fs.createReadStream(file).pipe(res);
  return true;
}

// ---------------------------------------------------------------- server
http.createServer(async (req, res) => {
  const u = req.url.split('?')[0];
  try {
    if (u === '/robots.txt') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('User-agent: *\nDisallow: /admin\n'); }
    if (!u.startsWith('/api/')) {
      if ((req.method === 'GET' || req.method === 'HEAD') && sendStatic(req, res, u)) return;
      return sendApp(req, res, u === '/admin' || u.startsWith('/admin/'));
    }

    // public: read-only content for the React site (no messages, no secrets)
    if (u === '/api/content' && req.method === 'GET') return send(res, 200, { ...publicContent(), siteFields: SITE, schema: SECTIONS });

    if (u === '/api/contact' && req.method === 'POST') { const b = await body(req);
      if (b.website) return send(res, 200, { ok: true }); // honeypot: bots fill this
      if (limited('c' + ip(req), 5, 36e5)) return send(res, 429, { error: 'Too many messages, try later.' });
      if (!str(b.name).trim() || !str(b.email).trim() || !str(b.message).trim()) return send(res, 400, { error: 'Please fill every field.' });
      db.messages.unshift({ id: ++db.seq, name: str(b.name, 100), email: str(b.email, 120), message: str(b.message, 2000), at: new Date().toISOString() });
      db.messages = db.messages.slice(0, 500); persist(); return send(res, 200, { ok: true });
    }
    if (u === '/api/admin/login' && req.method === 'POST') { if (limited('l' + ip(req), 10, 9e5)) return send(res, 429, { error: 'Too many attempts, wait 15 minutes.' });
      const b = await body(req); if (b.password !== PASSWORD) return send(res, 401, { error: 'Wrong password' }); return send(res, 200, { token: sign(Date.now() + 864e5) });
    }
    if (!authed(req)) return send(res, 401, { error: 'Login required' });
    if (u === '/api/admin/content' && req.method === 'GET') return send(res, 200, { ...db, schema: SECTIONS, siteFields: SITE });
    if (u === '/api/admin/content' && req.method === 'PUT') { const b = await body(req), n = { site: {} };
      for (const k of SITE) n.site[k] = str(b.site?.[k], k === 'about' || k === 'mission' || k === 'heroText' ? 1500 : 200);
      for (const [sec, f] of Object.entries(SECTIONS)) { if (!Array.isArray(b[sec])) return send(res, 400, { error: 'Bad ' + sec }); n[sec] = b[sec].slice(0, 50).map((i) => Object.fromEntries(f.map((k) => [k, str(i[k], k === 'text' ? 1500 : 200)]))); }
      Object.assign(db, n); persist(); return send(res, 200, { ok: true });
    }
    const m = u.match(/^\/api\/admin\/messages\/(\d+)$/);
    if (m && req.method === 'DELETE') { db.messages = db.messages.filter((x) => x.id !== +m[1]); persist(); return send(res, 200, { ok: true }); }

    send(res, 404, { error: 'Not found' });
  } catch (e) { send(res, 400, { error: 'Bad request' }); }
}).listen(PORT, () => {
  console.log(`ThinkHub website on http://localhost:${PORT}  (admin: /admin)`);
  if (!hasBuild()) console.log('No dist/ found - run "npm run build" for production, or "npm run dev" for the dev server.');
});
