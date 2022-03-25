/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'ipfs.fleek.co', 'poignart.infura-ipfs.io']
  }
};

module.exports = nextConfig;
