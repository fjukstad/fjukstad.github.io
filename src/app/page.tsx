import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <p className="pb-4"> Hi, I&apos;m Bjørn 👋 </p>
      <p> I&apos;m a product manager at <Link href="http://dips.com">DIPS</Link>,
        currently buidling our developer platform to enable anyone
        to build great systems for Norwegian hospitals.</p>

      <div className="grid grid-cols-3 gap-4 min-w-1/2 py-6 items-start">
        <div className="flex flex-col">
          <Image className="rounded-lg h-auto" src="/images/bjorn-stage.jpg" width="500" height="500" alt="image of me on stage" />
        </div>
        <div className="flex flex-col gap-2">
          <Image className="rounded-lg h-auto" src="/images/bjorn-stage-3.jpg" width="500" height="500" alt="image of me on stage" />
          <Image className="rounded-lg h-auto" src="/images/bjorn-and-the-gang.jpg" width="500" height="500" alt="image of me and hanne and sverre" />
        </div>
        <div className="flex flex-col">
          <Image className="rounded-lg h-auto" src="/images/bjorn-stage-1.jpg" width="500" height="500" alt="image of me on stage" />
        </div>
      </div>

      <div className="py-12">
        <ul className="flex space-x-4">
          <li><Link href="https://twitter.com/fjukstad">twitter</Link></li>
          <li><Link href="https://www.linkedin.com/in/bjornfjukstad/">linkedin</Link></li>
        </ul>
      </div>
    </>
  )
}
