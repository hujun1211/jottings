import { AuthSignupForm } from '@/components/auth/auth-signup-form'
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
      <h1 className="text-2xl font-medium">Sign Up</h1>
      <p className="py-5 text-sm text-foreground">
        Already have an account?
        {' '}
        <Link className="font-medium text-foreground underline" href="/signin">
          Sign in
        </Link>
      </p>
      <AuthSignupForm />
    </div>
  )
}
