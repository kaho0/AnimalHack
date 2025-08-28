/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async rewrites() {
    return [
      {
        source: "/api/chatbot/:path*",
        destination: "http://localhost:8000/api/chatbot/:path*",
      },
    ];
  },
};

export default nextConfig;
