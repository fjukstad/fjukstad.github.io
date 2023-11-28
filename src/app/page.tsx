import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="text-gray-600 dark:text-gray-300 font-light">
      <p className="pb-4 font-bold"> Hey, I&apos;m Bjørn! </p>
      <p className=""> I&apos;m a product manager at <Link className="font-bold" href="https://www.dips.com" target="_blank">DIPS</Link>,
        currently focusing on enabling everyone
        to collaborate on building the future of Norwegian health care.</p>

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

      <p className="py-4"> I have a PhD in Computer Science from the
        <Link className="font-bold" target="_blank" href="https://uit-hdl.github.io/"> Health Data Lab </Link>
        at the Arctic University of Norway in Tromsø.
      </p>

      <div className="py-6">
        <ul className="flex flex-wrap -ml-4">
          <li className="ml-4"><Link target="_blank" href="https://twitter.com/fjukstad">twitter</Link></li>
          <li className="ml-4"><Link target="_blank" href="https://www.linkedin.com/in/bjornfjukstad/">linkedin</Link></li>
          <li className="ml-4"><Link target="_blank" href="https://www.github.com/fjukstad/">github</Link></li>
          <li className="ml-4"><Link target="_blank" href="mailto:bjornfjukstad@gmail.com">bjornfjukstad@gmail.com</Link></li>
        </ul>
      </div>


    </div >
  )
}
