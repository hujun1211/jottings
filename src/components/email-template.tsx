import { Button, Html } from '@react-email/components'

export function EmailTemplate({ firstName }: { firstName: string }) {
  return (
    <Html>
      <Button
        href="https://example.com"
        style={{ background: '#000', color: '#fff', padding: '12px 20px' }}
      >
        {firstName}
      </Button>
    </Html>
  )
}
