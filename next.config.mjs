/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable CSS chunk splitting in dev. Next.js splits CSS into per-route
    // chunks, but during HMR the chunk boundaries can cause Tailwind's
    // generated classes to be dropped from the active stylesheet.
    // This keeps all CSS in a single chunk during development.
    cssChunking: "loose",
  },
};

export default nextConfig;
