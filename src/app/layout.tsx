import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Bjørn Fjukstad',
  description: 'My personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex bg-white dark:bg-[#171616] text-gray-90 dark:text-white h-screen font-sans" >
        <main className="grid grid-flow-ros auto-rows-max w-full flex py-12 ">
          <div className="grid xl:grid-cols-12 grid-cols-8 w-full h-12">
            <div className="col-start-2 col-span-6 xl:col-span-3 xl:col-start-4">
              <div className="grid grid-cols-3 gap-2 min-w-1/2">
                <Link href="/">home</Link>
                <Link href="/blog">blog</Link>
              </div>
            </div>
          </div>
          <div className="grid xl:grid-cols-12 grid-cols-8 w-full">
            <div className="xl:col-start-4 xl:col-span-6 col-start-2 col-span-6 py-4">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html >
  )
}
