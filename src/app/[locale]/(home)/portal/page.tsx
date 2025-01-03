'use client'

import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations()

  return (
    <div>
      <h1>{t('homepage.title')}</h1>
      <h1>{t('homepage.description')}</h1>
    </div>
  )
}
