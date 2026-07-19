# Do Bhai Hair Wig Salon — Website (Phase 2A: Supabase Backend)

A premium, luxury frontend built with Next.js 14 (App Router), React, Tailwind CSS,
Framer Motion and Lucide Icons — now with a Supabase backend for bookings, contact
enquiries, and a secure admin panel. See `SUPABASE_SETUP.md` for setup instructions.

## What's included
- 8 public pages: Home, About, Services, Hair Wig Collection, Gallery, Reviews, Contact, Book Appointment
- Sticky navbar, mobile menu, floating WhatsApp button, back-to-top button
- Custom gold cursor ring (desktop), luxury loading screen, page transitions
- Animated statistics, scroll reveals (fade up/left/right/zoom), masonry gallery with lightbox
- Testimonial slider, pricing/service cards, product cards for the hair wig collection
- Contact form and Booking form — both save to Supabase, with success states and
  duplicate-submission protection
- `/admin` panel — secure login, dashboard (total bookings, total inquiries, latest
  activity), bookings management (search / mark completed / delete), contact
  inquiries management (search / delete), logout
- Fully responsive (mobile / tablet / desktop), SEO metadata, self-hosted fonts (no external
  network calls needed at runtime)

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

## Project structure

```
app/                     routes — app/(site)/ = public pages, app/admin/ = admin panel
components/              reusable UI components (Navbar, Footer, cards, forms, admin/, etc.)
lib/data.ts               static business info/content
lib/supabase/              Supabase client/server/middleware helpers
middleware.ts             protects /admin routes, refreshes auth session
supabase/schema.sql         run this in Supabase SQL editor to set up the database
public/images/             your uploaded salon photos, renamed for clarity
.env.example               copy to .env.local and fill in your Supabase keys
SUPABASE_SETUP.md          full backend setup walkthrough
package.json
next.config.mjs
tsconfig.json
postcss.config.js
tailwind.config.ts
netlify.toml
```

## Editing content
Almost everything text-based (phone numbers, prices, services, reviews, address) lives in
`lib/data.ts` — update it there and it will flow through the whole site.

## Deploying to Netlify
This repo includes a `netlify.toml` using the official `@netlify/plugin-nextjs` runtime, so
Netlify auto-detects and builds it correctly. Connect the repo (or drag-and-drop the project
after removing `node_modules`/`.next`) — build command `npm run build`, no other configuration
needed.

## Phase 2 (not included, by design)
Backend, database, authentication, real appointment booking, admin panel, payments and
analytics were intentionally left out of this phase, as requested. The Contact and Book
Appointment forms are fully styled and interactive on the frontend, and are ready to be
wired up to a backend/API in Phase 2 — the WhatsApp deep-link on both forms already works
today as an interim booking channel.
