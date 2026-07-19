# Phase 2A Setup — Supabase + Auth + Bookings + Contact + Admin

## What this phase adds

- Supabase database, auth, and Row Level Security
- Secure `/admin` login (no public sign-up)
- Admin Dashboard: total bookings, total contact inquiries, latest bookings, latest messages
- Booking form now saves to the database, shows a success message, and blocks duplicate submits
- Admin can view, search, mark completed, and delete bookings
- Contact form now saves to the database
- Admin can view, search, and delete contact inquiries
- Logout

The public site's UI, layout, colors, fonts, spacing, and animations are all
unchanged — this phase only adds backend functionality.

---

## Step 1 — Create your Supabase project

1. Go to https://supabase.com and create a new project.
2. In **Project Settings → API**, copy:
   - `Project URL`
   - `anon public` key
3. Copy `.env.example` to `.env.local` and fill these in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```

## Step 2 — Run the database schema

1. Open **SQL Editor** in your Supabase dashboard.
2. Paste the full contents of `supabase/schema.sql` and run it.

This creates:
- `admins` — whitelist of who can log into `/admin`
- `appointments` — bookings from the Book Appointment form
- `contact_messages` — enquiries from the Contact form
- Row Level Security policies: anyone can submit a booking or message;
  only admins can view, search, update, or delete them.

## Step 3 — Create your admin login

There is no public sign-up. Admin accounts are created manually:

1. In Supabase Dashboard → **Authentication → Users**, click **Add user**
   and create your admin's email + password (mark email as confirmed).
2. Copy that user's **UID**.
3. In the SQL Editor, run:
   ```sql
   insert into public.admins (id, email, full_name)
   values ('paste-the-uid-here', 'you@example.com', 'Your Name');
   ```
4. You can now sign in at `/admin/login`.

## Step 4 — Run locally

```bash
npm install
npm run dev
```

- Public site: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin/login`

## Step 5 — Deploy

This project is no longer a static export (the admin panel needs a real
server for auth and middleware), so deploy it anywhere that runs Next.js
(Vercel, Netlify, etc.). Add the two environment variables
(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in your
hosting provider's dashboard.

---

## Admin Panel Overview (Phase 2A)

- **Dashboard** (`/admin`) — total bookings, total contact inquiries, latest 5 bookings, latest 5 messages
- **Bookings** (`/admin/bookings`) — search, mark completed/pending, delete
- **Contact Inquiries** (`/admin/contacts`) — search, delete
- **Logout** — in the sidebar

## What's next (Phase 2B / 2C)

Services, Products, Gallery, Offers, Reviews, and Settings management are
intentionally out of scope for this phase, as agreed — they'll be added in
the next phase(s) on top of this same codebase.
