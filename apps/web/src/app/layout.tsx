import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-cream text-stone-800 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
