# ThinkHub Website + Admin Portal

React (Vite) frontend with a zero-dependency Node API. Public site at `/`, admin portal at `/admin`.
Node 18+.

## Setup

    npm install

## Run

Development (Vite dev server on :5173 with hot reload, API on :3000, `/api` proxied):

    npm run dev

Production:

    npm run build     # bundles the React app into dist/
    npm start         # serves dist/ + the API on :3000

`npm start` warns if `dist/` is missing, so run the build first.

## Configuration

| Variable | Default | Notes |
| --- | --- | --- |
| `PORT` | `3000` | API + static server port. Vite proxies `/api` to it in dev. |
| `ADMIN_PASSWORD` | `thinkhub-admin` | **CHANGE before going live.** |
| `ADMIN_SECRET` | derived from the password | Long random string. Rotating it invalidates existing sessions. |
| `DATA_DIR` | `./data` | Must be a persistent path so `content.json` survives redeploys. |
| `DIST_DIR` | `./dist` | Built frontend location. |

## Editing content

Sign in at `/admin` and use the tabs, then press **Save changes**:

- **Site details** — headline, about, contact and social links
- **Numbers / Values / Spaces / Programs / Team** — add, edit, remove and reorder
- **Messages** — visitor messages from the contact form; delete unwanted ones

Empty email, phone or social links are hidden on the public site automatically. Social links must
start with `https://`. The Spaces tab has a searchable icon picker (Lucide); spaces saved with an
old emoji value still render that emoji.

## Project layout

    server.js              Node HTTP API + static host (no npm deps)
    index.html             Vite entry; server.js rewrites <title>/meta and inlines content
    src/
      main.jsx             createRoot + BrowserRouter
      App.jsx              React Router routes: / , /admin , * (404)
      content/             ContentProvider: reads server-inlined data, else GET /api/content
      lib/                 api client, session token, helpers, head/meta hooks, icon registry
      components/          ScrollManager + public site components
      pages/               Home, Admin, NotFound
      admin/               Login, ListEditor, IconPicker, Field, Messages
      styles/              site.css, admin.css
    data/content.json      live content (git-tracked; back this up)

## Routing

React Router owns the page routes (`/`, `/admin`, `*`). `/admin` serves `noindex` meta plus an
`X-Robots-Tag` header, and is disallowed in `robots.txt`. Within `/`, the nav uses same-page
anchors (`/#programs`); `ScrollManager` handles deep links and restores scroll on navigation.

The public site is server-rendered for crawlers in the sense that `server.js` injects the live
content into `index.html` as `window.__THINKHUB__`, so the first paint has real text in the title
and meta tags and React renders with no loading flash. In the Vite dev server that injection is
absent, so the client fetches `GET /api/content` instead.

## API

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/content` | no | Public site content (no messages, no secrets) |
| POST | `/api/contact` | no | Contact form; honeypot field `website`, rate limited |
| POST | `/api/admin/login` | no | Password -> HMAC-signed token (24h) |
| GET | `/api/admin/content` | token | Full content + messages + field schema |
| PUT | `/api/admin/content` | token | Save content (length-capped server side) |
| DELETE | `/api/admin/messages/:id` | token | Delete a message |

## Deploy

Any Node host (Render, Railway, Fly.io, VPS). Build with `npm run build`, start with `npm start`.
Set `ADMIN_PASSWORD`, `ADMIN_SECRET` and `DATA_DIR` (a persistent disk path) so `content.json`
survives redeploys. Put it behind HTTPS and point your domain at it. Back up `data/content.json`
regularly.

## Security notes

All content is rendered as React text nodes (escaped by default), links must start with `http(s)`,
admin login and the contact form are rate limited, the contact form has a spam honeypot, and
`/admin` is excluded from search engines. `server.js` still has no npm dependencies, so the API
attack surface stays small.

Not included: image uploads, separate admin accounts, email notifications.
