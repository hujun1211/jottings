import { redirect } from '@/i18n/routing'
import { createClient } from '@/utils/supabase/server'
import { getLocale } from 'next-intl/server'

export default async function RootLayout(
  { children }:
  { children: React.ReactNode },
) {
  const locale = await getLocale()
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect({ href: '/signin', locale })
  }
  return (
    <div>
      { children }
    </div>
  )
}
