/** @type {import('next').NextConfig} */

const nextConfig: import("next").NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.moviik.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dayschedule.com",
      },
      {
        protocol: "https",
        hostname: "www.emedhealthtech.com",
      },
      {
        protocol: "https",
        hostname: "www.quytech.com",
      },
    ],
  },
};

export default nextConfig;
