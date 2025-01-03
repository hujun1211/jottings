import { AuthSigninForm } from '@/components/auth/auth-signin-form'
import { Link, redirect } from '@/i18n/routing'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft } from 'lucide-react'
import { getLocale } from 'next-intl/server'

export default async function Page() {
  const locale = await getLocale()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    redirect({ href: '/', locale })
  }

  return (
    <div className="p-10">
      <div className="mb-10">
        <Link href="/">
          <ArrowLeft />
        </Link>
      </div>
      <h1 className="text-2xl  font-medium">Sign in</h1>
      <p className="py-5 text-sm text-foreground">
        Don't have an account?
        {' '}
        <Link className="font-medium text-foreground underline" href="/signup">
          Sign up
        </Link>
      </p>
      <AuthSigninForm />
    </div>
  )
}
