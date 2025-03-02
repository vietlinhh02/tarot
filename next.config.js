/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Không có API routes trong triển khai tĩnh
};

module.exports = nextConfig; 