import Navbar from '@/components/navbar'
import { redirect } from '@/i18n/routing'
import { createClient } from '@/utils/supabase/server'
import { getLocale } from 'next-intl/server'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect({ href: '/', locale })
  }

  return (
    <div>
      <Navbar user={user ?? undefined} />
      {children}
    </div>
  )
}
