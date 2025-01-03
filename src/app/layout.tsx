import { ThemeProvider } from '@/components/theme-provider'
import { ReactQueryProvider } from '@/provider/react-query-provider'
import { Toaster } from '@/shadcn/ui/toaster'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import '~/globals.css'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // 客户端使用
  const messages = await getMessages()

  return (
    <html suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
