import type { Metadata } from 'next'
import { Inter, EB_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Sorelle | Luxury Jewelry',
  description: 'Royal, sleek, ultra-minimal luxury jewelry design.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ebGaramond.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}