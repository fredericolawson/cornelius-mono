import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.gql$/,
      type: 'asset/source',
    })
    return config
  },
  // Disable Turbopack for now as it doesn't support .gql files
  experimental: {
    turbo: {
      rules: {
        '*.gql': {
          loaders: ['raw-loader'],
          as: '*.js',
        },
      },
    },
  },
}

export default nextConfig

