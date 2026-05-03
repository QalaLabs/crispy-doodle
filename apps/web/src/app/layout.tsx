import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Lato } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-body', display: 'swap' })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    template: '%s | Aumveda',
    default: 'Aumveda — Your Digital Healing Companion',
  },
  description:
    'A privacy-first platform combining daily healing practices, AI-guided insights, and mindful e-commerce to support your wellbeing journey.',
  keywords: ['healing', 'wellness', 'meditation', 'mindfulness', 'journalling', 'daily dose'],
  authors: [{ name: 'Aumveda' }],
  openGraph: {
    type: 'website',
    siteName: 'Aumveda',
    title: 'Aumveda — Your Digital Healing Companion',
    description: 'Daily practices. Deep healing. Guided by Archana & Sejal Jain.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aumveda',
    description: 'Daily practices. Deep healing.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${lato.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
