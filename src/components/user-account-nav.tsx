'use client'

import type { User } from '@supabase/supabase-js'
import { signOut } from '@/actions/auth'
import { useRouter } from '@/i18n/routing'
import { toast } from '@/shadcn/hooks/use-toast'
import { Button } from '@/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import { User as Avatar, LogOut, Settings } from 'lucide-react'

export function UserAccountNav({ user }: { user: User }) {
  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast({
        title: 'Sign out failed',
        description: error,
      })
    }
    else {
      toast({
        title: 'Sign out success',
      })
    }
  }

  const router = useRouter()
  const gotoProfiles = async () => {
    router.push('/profiles')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-transparent">
        <Button variant="ghost" size="icon">
          <Avatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        <DropdownMenuLabel>
          <div>{user.user_metadata.name}</div>
          <div>{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={gotoProfiles}>
          <Avatar />
          <span>Profiles</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
