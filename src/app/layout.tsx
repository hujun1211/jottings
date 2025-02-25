import { ThemeProvider } from '@/components/theme-provider'
import { ReactQueryProvider } from '@/provider/react-query-provider'
import { Toaster } from '@/shadcn/ui/toaster'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { VercelToolbar } from '@vercel/toolbar/next'

import '~/globals.css'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const shouldInjectToolbar = process.env.NODE_ENV === 'development'

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <Analytics />
            <SpeedInsights />
            {shouldInjectToolbar && <VercelToolbar />}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
