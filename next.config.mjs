/** @type {import('next').NextConfig} */
const nextConfig = {
  // Phase 2A: switched from static export to a Node server so /admin auth,
  // middleware, and live Supabase data can run. UI/markup/styling unchanged.
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
export default nextConfig;
