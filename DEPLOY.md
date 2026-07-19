# Deploying to Netlify (Drag-and-Drop, No GitHub)

This project is configured as a **fully static Next.js export** — there are no API
routes, server actions, or server-only data fetching, so it produces plain HTML/CSS/JS
that Netlify can serve with zero backend. That makes it compatible with Netlify's
"drag and drop" deploy (Sites → Add new site → Deploy manually), which does **not**
run a build — it only serves whatever files you upload.

## Step 1 — Build the static site (one time, on your machine)

You need Node.js 18.18+ installed locally (Netlify's drag-and-drop upload has no
network access, so this step can't be skipped or run in a sandbox without internet).

```bash
npm install
npm run build
```

This produces a fully static `out/` folder containing `index.html` files for every
page, along with `_next/`, `images/`, etc. Nothing in `out/` needs a server.

## Step 2 — Zip the *contents* of `out/`, not the folder itself

```bash
cd out
zip -r ../do-bhai-salon-deploy.zip .
cd ..
```

(On Windows/Mac, select everything **inside** `out/` and compress it — don't zip the
`out` folder so that it appears as a subfolder inside the zip, or Netlify will publish
`/out/index.html` instead of `/index.html`.)

## Step 3 — Drag and drop on Netlify

1. Go to https://app.netlify.com/drop
2. Drag `do-bhai-salon-deploy.zip` (or the unzipped `out` folder) onto the page
3. Netlify assigns a live URL immediately — no GitHub, no CI required

## Alternative: Netlify CLI (also no GitHub required)

If you'd rather have Netlify run the build for you:

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

The included `netlify.toml` already sets `command = "npm run build"` and
`publish = "out"`, so the CLI will build and deploy in one step — still no GitHub
repo needed, just your local files and a Netlify account.

## Why not the `.next` / `@netlify/plugin-nextjs` approach?

That approach turns Next.js into serverless functions on Netlify, which requires
Netlify's build system to run (Git-connected or CLI) — it cannot be drag-and-dropped,
since drag-and-drop never executes a build. Since this site has no server-side
features (no API routes, no server actions, all forms hand off to WhatsApp/tel/mailto
links client-side), a static export is strictly simpler, faster, and cheaper to host,
and is the only option compatible with pure drag-and-drop upload.

## What was fixed for production readiness

- `next.config.mjs`: added `output: 'export'` and `images.unoptimized: true` (required
  for `next/image` to work without Netlify's image server) and `trailingSlash: true`
  (so `/about` reliably resolves to `/about/index.html` on static hosts)
- `netlify.toml`: publish directory changed from `.next` to `out`, removed the
  `@netlify/plugin-nextjs` build plugin (unnecessary for a static export and would
  otherwise conflict with it), added security headers, long-cache headers for
  `/images/*`, and a 404 redirect
- `package.json`: removed the now-unused `@netlify/plugin-nextjs` dev dependency,
  pinned a minimum Node engine version
- Verified all 15 image paths referenced in `lib/data.ts` and components resolve to
  real files in `public/images/`
- Verified no server-only APIs are used anywhere (`useSearchParams` without Suspense,
  route handlers, server actions, `cookies()`/`headers()`, dynamic routes) that would
  break static export
