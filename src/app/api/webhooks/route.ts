import { Webhook } from 'svix'

export const webhook = new Webhook(process.env.RESEND_WEBHOOK_SECRET!)

export async function POST(request: Request) {
  const headers = {
    'svix-id': request.headers.get('svix-id')!,
    'svix-timestamp': request.headers.get('svix-timestamp')!,
    'svix-signature': request.headers.get('svix-signature')!,
  }
  const payload = await request.text()
  const event = webhook.verify(payload, headers)

  console.log(event)

  return new Response('成功！', {
    status: 200,
  })
}
