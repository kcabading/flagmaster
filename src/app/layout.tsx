import './global.css'
import Navigation from '../components/layouts/Nav'
import Footer from '../components/layouts/Footer'

import Providers from "@/components/Providers";

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
      <body className={`${monserrat.variable} font-mont dark h-full`}>
        <Providers>
          <Navigation />
          <main className="flex flex-col items-center w-full m-auto dark:bg-slate-900 dark:text-white pt-32">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
