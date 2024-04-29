import '@/styles/globals.css'
import { ThemeProvider } from "catalyst-ui"
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
