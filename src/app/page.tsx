import Link from 'next/link'

export default function Home() {
  return (
    <>
      <p className="pb-4"> Hi, I&apos;m Bjørn 👋 </p>
      <p> I&apos;m a product manager at <Link href="http://dips.com">DIPS</Link>,
        currently buidling our developer platform to enable anyone
        to build great systems for Norwegian hospitals.</p>
    </>
  )
}
