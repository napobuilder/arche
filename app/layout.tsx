import type { Metadata } from 'next'
import { Cormorant_Garamond, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SoundscapeProvider } from '@/components/SoundscapeProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://proyectoarche.com'),
  title: {
    template: '%s | Arché',
    default: 'Arché — Instituto para la Investigación de la Consciencia',
  },
  description:
    'Un puente riguroso entre la investigación de vanguardia y el misterio humano. Exploramos la neurociencia, el esoterismo, la consciencia y los fenómenos atípicos que la ciencia convencional suele ignorar.',
  keywords: [
    'investigación consciencia', 'esoterismo científico', 'neurociencias y meditación',
    'ocultismo', 'masones ciencia', 'rosacruces', 'fenómenos atípicos', 'ciencias ocultas',
    'estados alterados consciencia', 'misterio humano', 'hermético', 'instituto investigación'
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Arché — Instituto de Investigación de la Consciencia',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${spaceMono.variable}`}>
      <body className="bg-[#050505] text-[#E8E6E1] selection:bg-[#2C4A3B] selection:text-white overflow-x-hidden">
        <SoundscapeProvider>
          <Navbar />
          {children}
          <Footer />
        </SoundscapeProvider>
      </body>
    </html>
  )
}
