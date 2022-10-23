import Image from 'next/future/image'
import navy from "../public/navy.png";
import { Link, animateScroll as scroll } from "react-scroll";
const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Les chiffres', to: 'stat' },
  { name: 'Planning', to: 'planning' },
  { name: 'Replays', to: "my-games" },
  { name: 'World of Warcraft', to: 'wow' },
  { name: 'Moderateurs', to: 'moderator' },
  { name: 'Wishlist', to: 'https://www.amazon.fr/hz/wishlist/ls/QQ1CJ21WHSMG?ref_=wl_share' },
]

export function Header() {

  return (
    <header className="">
      <nav className="max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-center sm:justify-between py-6">
          <div className="sm:flex items-center hidden">
            <a href="/">
              <span className="sr-only">La taverne de Zeylda</span>
              <Image className="h-10 w-auto" src={navy} alt="" />
            </a>
            <div className="ml-10 hidden space-x-8 sm:block nav-items">
              {navigation.map((link) => (
                <Link key={link.name} activeClass="active"
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500} ><a target={link.name === "Wishlist" ? "_blank" : ""} className="nav-item text-2xl font-medium text-white hover:text-indigo-600">{link.name}</a></Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-2 py-4 sm:hidden nav-items">
          {navigation.map((link) => (
            <Link key={link.name} activeClass="active"
              to={link.to}
              spy={true}
              smooth={true}
              offset={0}
              duration={500} ><a target={link.name === "Wishlist" ? "_blank" : ""} className="nav-item text-xl mb-2 font-medium text-white hover:text-indigo-600">{link.name}</a></Link>
          ))}
        </div>
      </nav>
    </header >
  )
}
