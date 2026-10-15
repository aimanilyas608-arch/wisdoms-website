import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const montserrat = Montserrat({
  // ...
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  
})

export const metadata: Metadata = {
  title: {
    default: 'Wisdoms International',
    template: '%s — Wisdoms International',
  },
  description:
    'Complete school development solutions from establishment to institutional excellence.',
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="bg-white font-sans text-charcoal antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  )
}