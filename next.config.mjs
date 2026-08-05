/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.29.192'],
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
