/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be served as plain HTML/CSS/JS
  // from Firebase Hosting. Produces `out/` after `next build`.
  output: 'export',
  images: {
    // Firebase Hosting serves static files; disable Next's image optimizer.
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
