import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

// 此处可以配置 [locale]，也可以选择不用动态路由
export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
})

// en | zh
export type Locale = typeof routing.locales[number]
export const locales = routing.locales
export const localeMap = {
  en: 'English',
  zh: '中文',
}

export const { Link, redirect, usePathname, useRouter, getPathname }
  = createNavigation(routing)
