'use client'

import { resetPassword } from '@/actions/auth'
import { useRouter } from '@/i18n/routing'
import { toast } from '@/shadcn/hooks/use-toast'
import { Button } from '@/shadcn/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'The two passwords are different',
  path: ['confirmPassword'],
})

export type AuthResetPasswordFormType = z.infer<typeof FormSchema>

export function Page() {
  const form = useForm<AuthResetPasswordFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  async function onSubmit(formdata: z.infer<typeof FormSchema>) {
    const { password } = formdata
    const { error } = await resetPassword(password)
    if (error) {
      toast({
        title: 'Reset password failed',
        description: error,
      })
    }
    toast({
      title: 'Reset password successful',
      description: 'You have been signed in.',
    })
    router.push('/')
  }

  return (
    <div>
      <h1 className="text-2xl  font-medium">Reset Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-3">
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
                    placeholder="new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirmPassword</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="focus-visible:ring-transparent"
                    placeholder="confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Reset password
          </Button>
        </form>
      </Form>
    </div>
  )
}
