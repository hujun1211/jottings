'use server'
import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
export async function sendEmail() {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: [process.env.RESEND_TO!],
    subject: 'Hello world',
    react: EmailTemplate({ firstName: 'John' }),
  })
  console.log(data)
}
