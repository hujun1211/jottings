'use client'

import { signInWithPassword } from '@/actions/auth'
import { useRouter } from '@/i18n/routing'
import { toast } from '@/shadcn/hooks/use-toast'
import { Button } from '@/shadcn/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export type AuthSigninFormType = z.infer<typeof FormSchema>

export function AuthSigninForm() {
  const form = useForm<AuthSigninFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function onSubmit(formdata: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    const { data, error } = await signInWithPassword(formdata)
    if (error) {
      toast({
        title: 'Sign in failed',
        description: error,
      })
      setIsSubmitting(false)
    }
    else if (data) {
      router.push('/')
    }
    else {
      toast({
        title: 'Sign in failed',
        description: 'Something went wrong.',
      })
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-transparent" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="focus-visible:ring-transparent"
                  placeholder="Your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Sign in
        </Button>
      </form>
    </Form>
  )
}
