import './globals.css'
import Navigation from './components/Nav'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { Montserrat } from 'next/font/google'

const monserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont'
})

export const metadata = {
  title: 'Guess the Flag',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${monserrat.variable} font-mont dark bg-white h-full`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
