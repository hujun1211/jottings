import type { Metadata } from 'next/types'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: `${t('title')}`,
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}
