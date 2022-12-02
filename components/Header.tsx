import Image from 'next/future/image'
import navy from "../public/navy.png";
import { Link, animateScroll as scroll } from "react-scroll";
const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Planning', to: 'the-stream' },
  { name: 'Replays', to: "replays" },
  { name: 'Moderateurs', to: 'moderator' },
  { name: 'Wishlist', to: 'https://www.amazon.fr/hz/wishlist/ls/QQ1CJ21WHSMG?ref_=wl_share' },
]

export function Header() {

  return (
    <header className="">
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex flex-wrap space-x-2 sm:hidden nav-items mt-6">
          {navigation.map((link, index) => {
            if (link.name === 'Wishlist') {
              return <a key={index} href={link.to} target='_blank' rel="noreferrer" className='cursor-pointer nav-item text-sm font-medium text-slate-200 hover:text-red-800'>{link.name}</a>
            } else {
              return <Link key={link.name} className="text-sm cursor-pointer nav-item mb-2 font-medium text-slate-200 hover:text-red-600"
                to={link.to}
                spy={true}
                smooth={true}
                offset={0}
                duration={500} >{link.name}</Link>
            }
          })}
        </div>
        <div className="flex w-full items-center justify-center sm:justify-between py-6">
          <div className="sm:flex items-center hidden">
            <div>
              <span className="sr-only">La taverne de Zeylda</span>
              <Image className="h-10 w-auto" src={navy} alt="" />
            </div>
            <div className="ml-10 hidden space-x-8 sm:block nav-items">
              {navigation.map((link, index) => {
                if (link.name === 'Wishlist') {
                  return <a key={index} href={link.to} target='_blank' rel="noreferrer" className='cursor-pointer nav-item text-2xl font-medium text-slate-200 hover:text-red-800'>{link.name}</a>
                } else {
                  return <Link key={index} className="cursor-pointer nav-item text-2xl font-medium text-slate-200 hover:text-red-800"
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500} >{link.name}</Link>
                }
              })}

            </div>
          </div>
        </div>
      </nav>
    </header >
  )
}
