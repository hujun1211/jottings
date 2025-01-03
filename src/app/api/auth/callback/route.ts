import type { EmailOtpType } from '@supabase/supabase-js'
import type { NextRequest } from 'next/server'
import { redirect } from '@/i18n/routing'
import { createClient } from '@/utils/supabase/server'
import { getLocale } from 'next-intl/server'

export async function GET(request: NextRequest) {
  const locale = await getLocale()
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  const code = searchParams.get('code')

  console.log(code)

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      return redirect({ href: `${next}`, locale })
    }
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return redirect({ href: `${next}`, locale })
    }
  }

  return redirect({
    href: {
      pathname: '/signup/error',
      query: { next },
    },
    locale,
  })
}
