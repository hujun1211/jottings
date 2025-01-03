'use client'

import { signInWithOTP } from '@/actions/auth'
import { useRouter } from '@/i18n/routing'
import { toast } from '@/shadcn/hooks/use-toast'
import { Button } from '@/shadcn/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/shadcn/ui/input-otp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  email: z.string().trim().email({
    message: 'Please enter a valid email address.',
  }),
})

export type LoginFormType = z.infer<typeof FormSchema>

export function LoginForm() {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  })
  const router = useRouter()

  async function onSubmit(formdata: z.infer<typeof FormSchema>) {
    const { data, error } = await signInWithOTP(formdata)
    if (error) {
      toast({
        title: 'Login failed',
        description: error,
      })
    }
    else if (data) {
      // router.push('/')
    }
    else {
      toast({
        title: 'Login failed',
        description: 'Something went wrong.',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <div className="flex items-center justify-between">
                <FormControl>
                  <Input className="w-[240px] focus-visible:ring-transparent" placeholder="email" {...field} />
                </FormControl>
                <Button>Verify Code</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

// <FormField
// control={form.control}
// name="password"
// render={({ field }) => (
//   <FormItem>
//     <FormLabel>password</FormLabel>
//     <FormControl>
//       <InputOTP maxLength={6} {...field}>
//         <InputOTPGroup>
//           <InputOTPSlot index={0} />
//           <InputOTPSlot index={1} />
//           <InputOTPSlot index={2} />
//           <InputOTPSlot index={3} />
//           <InputOTPSlot index={4} />
//           <InputOTPSlot index={5} />
//         </InputOTPGroup>
//       </InputOTP>
//     </FormControl>
//     <FormMessage />
//   </FormItem>
// )}
// />
