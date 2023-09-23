import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VOCI TRAINER',
  description: 'English <-> German vocabulary trainer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" font-sans>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
