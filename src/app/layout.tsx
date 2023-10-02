import './globals.css'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Bjørn Fjukstad',
    template: '%s | Bjørn Fjukstad',
  },
  description: "I'm a product manager at DIPS, currently buidling our developer platform to enable everyone to collaborate on the future of Norwegian health care.",
  openGraph: {
    title: 'Bjørn Fjukstad',
    description: "I'm a product manager at DIPS, currently buidling our developer platform to enable everyone to collaborate on the future of Norwegian health care.",
    url: 'https://fjukstad.github.io',
    siteName: 'Bjørn Fjukstad',
    images: [
      {
        url: 'https://fjukstad.github.io/images/bjorn-stage-3.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex bg-white dark:bg-[#171616] text-gray-90 dark:text-white h-screen font-sans justify-center" >
        <main className="mx-auto flex flex-col items-center py-12 w-full md:max-w-screen-xl ">
          <div className="grid grid-cols-12 w-full h-12">
            <div className="col-start-2 col-span-10 md:col-span-3 md:col-start-4">
              <div className="flex space-x-4">
                <Link href="/">home</Link>
                <Link href="/blog">blog</Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 w-full">
            <div className="md:col-start-4 md:col-span-6 col-start-2 col-span-10 py-4">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html >
  )
}
