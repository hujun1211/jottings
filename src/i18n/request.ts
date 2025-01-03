import type { Locale } from './routing'
import { getRequestConfig } from 'next-intl/server'
import { locales, routing } from './routing'

// 服务器端使用
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale as Locale | undefined

  if (!locale || !locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
