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
      <body className="font-sans">
        <main className="grid grid-cols-12 w-full py-12">
          <div className="col-start-4 col-span-2">
            <div className="grid grid-cols-3 gap-1">
              <Link href="/">Home</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>
        </main>
        {children}
      </body>
    </html>
  )
}
