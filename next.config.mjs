import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts',
)

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  devIndicators: {
    appIsrStatus: true, // 静态路由指示器
    buildActivityPosition: 'bottom-right', // 编译指示器
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

export default withNextIntl(withMDX(nextConfig))
