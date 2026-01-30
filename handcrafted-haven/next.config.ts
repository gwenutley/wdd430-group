import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'cdn.example.com'], // add your image host here
  },
};

module.exports = nextConfig;
