'use server'

import type { LoginFormType } from '@/components/auth/login-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  return {
    error: error?.message ?? '',
  }
}

export async function signInWithGithub() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
    },
  })
  if (data.url) {
    redirect(data.url)
  }
  if (error) {
    return {
      error: error?.message ?? '',
    }
  }
}

export async function signInWithOTP(formdata: LoginFormType) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOtp({
    email: formdata.email,
    options: {
      shouldCreateUser: true,
    },
  })
  return {
    data,
    error: error?.message ?? '',
  }
}
