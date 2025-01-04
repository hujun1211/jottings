import type { NextRequest } from 'next/server'
import { redirect } from '@/i18n/routing'
import { createClient } from '@/utils/supabase/server'
import { getLocale } from 'next-intl/server'

export async function GET(request: NextRequest) {
  const locale = await getLocale()
  const { searchParams } = new URL(request.url)
  const next = searchParams.get('next') ?? '/'
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return redirect({ href: `${next}`, locale })
    }
  }

  return redirect({
    href: '/',
    locale,
  })
}
