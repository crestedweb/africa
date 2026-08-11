import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import MobileTabBar from '@/components/MobileTabBar'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'AfriStyle — African Fashion, Global Reach',
  description: 'Connecting African fashion designers, fabric sellers, and buyers worldwide',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable}`}
        style={{
          fontFamily: 'var(--font-inter)',
          background: '#F7F3ED',
          color: '#171714',
          maxWidth: '100%',
          overflowX: 'hidden',
        }}
      >
        <Navbar />
        <div className="page-body">{children}</div>
        <MobileTabBar />
        <style>{`
          .page-body { padding-bottom: 0; }
          @media (max-width: 767px) {
            .page-body { padding-bottom: calc(64px + env(safe-area-inset-bottom)); }
          }
        `}</style>
      </body>
    </html>
  )
}