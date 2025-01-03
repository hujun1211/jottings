'use client'

import { signInWithOTP, verifyOTP } from '@/actions/auth'
import { toast } from '@/shadcn/hooks/use-toast'
import { Button } from '@/shadcn/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/shadcn/ui/input-otp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const emailFormSchema = z.object({
  email: z.string().trim().email({
    message: 'Please enter a valid email address.',
  }),
})
const codeFormSchema = z.object({
  code: z.string().regex(/^\d{6}$/, {
    message: '验证码必须是六位数字',
  }),
})

export type EmailFormSchemaType = z.infer<typeof emailFormSchema>
export type CodeFormSchemaType = z.infer<typeof codeFormSchema>

export function LoginForm() {
  const [isCodeSent, setCodeSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')

  const emailForm = useForm<EmailFormSchemaType>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
    },
  })
  const codeForm = useForm<CodeFormSchemaType>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      code: '',
    },
  })

  async function sendVerifyCode(formdata: EmailFormSchemaType) {
    setCodeSent(true)
    const { error } = await signInWithOTP(formdata)
    setEmail(formdata.email)
    if (error) {
      setCodeSent(false)
      toast({
        title: 'Login failed',
        description: error,
      })
    }
  }

  async function login(formdata: CodeFormSchemaType) {
    setIsSubmitting(true)
    const { error } = await verifyOTP({
      ...formdata,
      email,
    })
    if (error) {
      toast({
        title: 'Login failed',
        description: error,
      })
    }
    setIsSubmitting(false)
  }

  if (!isCodeSent) {
    return (
      <Form {...emailForm} key="email">
        <form onSubmit={emailForm.handleSubmit(sendVerifyCode)} className="space-y-3">
          <FormField
            control={emailForm.control}
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
  else {
    return (
      <Form {...codeForm} key="code">
        <form onSubmit={codeForm.handleSubmit(login)} className="space-y-3">
          <FormField
            control={codeForm.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>verify code</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-between">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <Button type="submit" disabled={isSubmitting}>Submit</Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }
}
