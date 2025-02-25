import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.enable()
  return new Response('草稿模式已启用')
}
