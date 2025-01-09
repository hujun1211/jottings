'use client'

import type { User } from '@supabase/supabase-js'
import { LoginModal } from '@/components/auth/login-modal'
import { LanguageToggle } from '@/components/language-toggle'
import { ModeToggle } from '@/components/mode-toggle'
import { UserAccountNav } from '@/components/user-account-nav'
import { Link } from '@/i18n/routing'
import { Button } from '@/shadcn/ui/button'

export default function Navbar({ user }: { user: User | undefined }) {
  return (
    <header className="h-16">
      <div className="grid h-full grid-cols-[auto_1fr_auto] gap-10">
        <div className="flex items-center pl-5">
          <Link href="/portal">Jottings</Link>
        </div>
        <div className="flex items-center gap-5">
          <Button variant="link" asChild>
            <Link href="/docs">Documentation</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/mdx-page">MDX</Link>
          </Button>
        </div>
        <div className="flex items-center pr-2">
          <LanguageToggle />
          <ModeToggle />
          {
            user
              ? (
                  <UserAccountNav user={user} />
                )
              : (
                  <LoginModal>
                    <Button variant="link">
                      Login
                    </Button>
                  </LoginModal>
                )
          }
        </div>
      </div>
    </header>
  )
}
