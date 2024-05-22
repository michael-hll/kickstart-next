/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CAMPAIGN_FACTORY_ADDRESS: process.env.CAMPAIGN_FACTORY_ADDRESS, // pulls from .env file
  },
};

export default nextConfig;
