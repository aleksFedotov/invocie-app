/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'same-origin' },
];

const nextConfig = {
  pageExtensions:
    process.env.NODE_ENV === 'production'
      ? ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
      : [
          'page.tsx',
          'page.ts',
          'page.jsx',
          'page.js',
          'page.dev.tsx',
          'page.dev.ts',
          'page.dev.jsx',
          'page.dev.js',
        ],
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: { removeViewBox: false },
              },
            },
          ],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  },
};

module.exports = nextConfig;
