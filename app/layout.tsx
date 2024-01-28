import './globals.css'
import 'react-select-search/style.css'
import { Inter } from 'next/font/google'
import Provider from '@/components/Provider'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sports Nutrition | GymBeam',
  description:
    'Sports Nutrition is a category of products that covers dozens of different types of dietary supplements for athletes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
