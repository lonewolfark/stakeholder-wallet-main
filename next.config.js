/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for static export, remove if using Vercel serverless
  },
};

module.exports = nextConfig;
