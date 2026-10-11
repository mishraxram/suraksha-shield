/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Dangerously allow production builds to complete even if project has type errors
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    'themes-gotten-fundamentals-club.trycloudflare.com',
    '*.trycloudflare.com',
    '*.loca.lt',
    'localhost',
    '127.0.0.1',
  ],
};

module.exports = nextConfig;

