import Navbar from '@/components/navbar'
import { createClient } from '@/utils/supabase/server'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user ?? undefined} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
