import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Let phones on the local network use dev resources (HMR) when testing via the LAN IP.
  allowedDevOrigins: ['10.0.0.*'],
  // Stop `next dev` from generating AGENTS.md / CLAUDE.md in the repo root.
  agentRules: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  // Turbopack is default in Next 16. Empty config silences the "webpack + no turbopack" error
  // while keeping the custom webpack hook for --webpack builds and AI Studio dev (DISABLE_HMR).
  turbopack: {},
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
