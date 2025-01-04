import { ThemeProvider } from '@/components/theme-provider'
import { ReactQueryProvider } from '@/provider/react-query-provider'
import { Toaster } from '@/shadcn/ui/toaster'
import '~/globals.css'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
