import Image from 'next/future/image'
import pumpkin from "../public/pumpkin.png";
import { Link, animateScroll as scroll } from "react-scroll";
const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Replays', to: "replays" },
  { name: 'Moderateurs', to: 'moderator' }
]

export function Header() {

  return (
    <header className="p-2">
      <nav className="neonText px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex flex-wrap space-x-2 sm:hidden nav-items mt-6">
          {navigation.map((link, index) => {
            if (link.name === 'Wishlist') {
              return <a key={index} href={link.to} target='_blank' rel="noreferrer" className='cursor-pointer nav-item text-sm font-medium text-slate-200 hover:underline'>{link.name}</a>
            } else {
              return <Link key={link.name} className="text-sm cursor-pointer nav-item mb-2 font-medium text-slate-200 hover:underline"
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
              {/* <Image className="h-10 w-auto" src={pumpkin} alt="" /> */}
            </div>
            <div className="ml-10 hidden space-x-8 sm:block nav-items">
              {navigation.map((link, index) => {
                if (link.name === 'Wishlist') {
                  return <a key={index} href={link.to} target='_blank' rel="noreferrer" className='cursor-pointer nav-item text-2xl font-medium text-slate-200 hover:underline'>{link.name}</a>
                } else {
                  return <Link key={index} className="cursor-pointer nav-item text-2xl font-medium text-slate-200 hover:underline"
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
