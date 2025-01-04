'use server'

import type { CodeFormSchemaType, EmailFormSchemaType } from '@/components/auth/login-form'
import { createClient } from '@/utils/supabase/server'
// eslint-disable-next-line no-restricted-imports
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
      // 强制每次都重新请求授权
      scopes: 'read:user',
      queryParams: {
        prompt: 'consent',
      },
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

export async function signInWithOTP(formdata: EmailFormSchemaType) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOtp({
    email: formdata.email,
  })
  return {
    data,
    error: error?.message ?? '',
  }
}

export async function verifyOTP(formdata: CodeFormSchemaType & EmailFormSchemaType) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.verifyOtp({
    email: formdata.email,
    token: formdata.code,
    type: 'email',
  })
  return {
    data,
    error: error?.message ?? '',
  }
}
