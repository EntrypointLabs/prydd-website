/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Prydd's checkout app is served at prydd.co/pay because passkeys made in the
  // Prydd app belong to prydd.co, and browsers only offer them on that host.
  async rewrites() {
    return [
      { source: "/pay", destination: "https://prydd-pay.vercel.app/pay" },
      {
        source: "/pay/:path*",
        destination: "https://prydd-pay.vercel.app/pay/:path*",
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ]
  },
}

export default nextConfig
