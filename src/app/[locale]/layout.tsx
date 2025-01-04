import type { Metadata } from 'next/types'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'

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
  // 客户端使用
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
