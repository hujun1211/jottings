'use client'

import { signUp } from '@/actions/auth'
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
  name: z.string().min(2, {
    message: 'Name must be at least 2 character.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export type AuthSignupFormType = z.infer<typeof FormSchema>

export function AuthSignupForm() {
  const form = useForm<AuthSignupFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(formdata: z.infer<typeof FormSchema>) {
    setIsSubmitting(true)
    const { error, data } = await signUp(formdata)
    if (error) {
      toast({
        title: 'Signup failed',
        description: error,
      })
    }
    else if (data) {
      toast({
        title: 'Signup successful',
        description: 'You have successfully signed up.',
      })
    }
    else {
      toast({
        title: 'Signup failed',
        description: 'Something went wrong.',
      })
    }
    setIsSubmitting(false)
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
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
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
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          SignUp
        </Button>
      </form>
    </Form>
  )
}
