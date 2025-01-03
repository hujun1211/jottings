'use client'

import type { Locale } from '@/i18n/routing'
import { localeMap, locales, usePathname } from '@/i18n/routing'
import { Button } from '@/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import { Languages } from 'lucide-react'
// eslint-disable-next-line no-restricted-imports
import { useRouter } from 'next/navigation'

export function LanguageToggle() {
  const router = useRouter()
  const pathname = usePathname()

  function changLocale(locale: Locale) {
    router.push(`/${locale}/${pathname}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-transparent">
        <Button variant="ghost">
          <Languages />
          <span className="sr-only"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div>
          {locales.map((locale) => {
            return (
              <DropdownMenuItem key={locale} onClick={() => changLocale(locale)}>
                <span>{localeMap[locale]}</span>
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
