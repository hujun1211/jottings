import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts',
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: true,
    buildActivityPosition: 'bottom-right',
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withNextIntl(nextConfig)
