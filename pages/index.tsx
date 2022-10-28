import type { NextPage } from 'next'
import Image from 'next/future/image'
import image6 from '../images/games/hwl.jpeg'
import planning from '../images/planning.png'
import { Link, animateScroll as scroll } from "react-scroll";
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { arrayBuffer } from 'stream/consumers';

type videoDataType = {
  id: string,
  stream_id: string,
  user_id: string,
  user_login: string,
  user_name: string,
  title: string,
  description: string,
  created_at: string,
  published_at: string,
  url: string,
  thumbnail_url: string,
  viewable: string,
  view_count: number,
  language: string,
  type: string,
  duration: string,
  image_url: string,
  muted_segments: [
    {
      duration: number,
      offset: number
    }
  ]
}
const Home: NextPage = () => {
  const socialNetworks = [
    { icon: "ri-twitter-fill", href: "https://twitter.com/ZeyldaStream" },
    { icon: "ri-instagram-fill", href: "https://www.instagram.com/zeylda13" },
    { icon: "ri-youtube-fill", href: "https://www.youtube.com/channel/UCQnE0xuiOMGw95tZrNOdzsw" },
    { icon: "ri-mail-send-fill", href: "mailto:zeylda.stream@gmail.com" },
  ]
  const moderators = [
    { name: "Petitsablet", description: "First modo, first follower, first tout court !", avatar: require('../images/moderators/sabli.png') },
    { name: "Jahno", description: "Modo, createur du site et gros raleur", avatar: require('../images/moderators/korin2.jpeg') },
    { name: "Fafafox", description: "Modo, voisine et demone du stream", avatar: require('../images/moderators/fafa.png') },
    { name: "Devilman", description: "Modo toujours present, qui ban plus vite que son ombre", avatar: require('../images/moderators/devil.jpg') }
  ]
  const [bearer, setBearer] = useState<string>('')
  const [status, setStatus] = useState<string>('offline')
  const [totalView, setTotalView] = useState<string>('en cours de calcul')
  const [totalFollower, setTotalFollower] = useState<string>('en cours de calcul')
  const [lastVideos, setLastVideos] = useState<videoDataType[]>([])
  const [loading, isLoading] = useState<boolean>(false)
  const fetchData = async () => {
    axios.post('https://id.twitch.tv/oauth2/token?client_id=5pc7pjbfvo2tm964nyjv5795uk328s&client_secret=vqiqhqa1w944choph1zo5j9la0zh50&grant_type=client_credentials')
      .then(async response => {
        let api = axios.create({
          headers: {
            'Client-ID': '5pc7pjbfvo2tm964nyjv5795uk328s',
            'Authorization': `Bearer ${response.data.access_token}`
          }
        })

        // get streamer status
        await api.get('https://api.twitch.tv/helix/streams?user_login=zeylda')
          .then(response => {
            if (response.data.data[0] != undefined) {
              setStatus(response.data.data[0].type)
            }
            else {
              setStatus('offline')
            }
          })

        // get streamer view count
        await api.get('https://api.twitch.tv/helix/users?login=zeylda')
          .then(response => {
            setTotalView(response.data.data[0].view_count)
          })

        // get streamer total follower
        await api.get('https://api.twitch.tv/helix/users/follows?to_id=421475350')
          .then(response => {
            setTotalFollower(response.data.total)
          })
        // get streamer last videos
        const fetchedApi = await api.get('https://api.twitch.tv/helix/videos?user_id=421475350&first=6').then(response => response.data.data)
        // get all videos pictures url => ici le résultat nous renvoie un array avec tous les url
        if (fetchedApi.length > 0) {
          const getAllVideosUrl = await Promise.all(fetchedApi.map(async (el: videoDataType) => {
            return await api.get(`https://api.twitch.tv/helix/games?name=${el.description}`)
              .then(response => {
                let urlFinal = (response.data.data[0].box_art_url.replace('{width}', 1200)).replace('{height}', 1200)
                return urlFinal
              })
          })).then((response) => response)

          // function to format an object passing the data (lastVideos) and an array of link (getAllVideosUrl) => on ajoute simplement une propriété image_url dans un nouvel objet, en "déversant" toutes les propriétés de l'objet en parametre
          const formatDataForState = (data: videoDataType[], url: string[]) => {
            return data.map((el: videoDataType, index: number) => {
              return {
                ...el,
                image_url: url[index]
              }
            })
          }
          // stock the new formatted data => on stock juste ici dans newData le résultat de notre fonction en passant en parametre : lastVideos et getAllVideosUrl => 
          const newData = formatDataForState(fetchedApi, getAllVideosUrl);
          // update the states => j'update mon states avec mon nouveau tableau d'objet mis a jour avec image_url
          setLastVideos(newData);
        }
        // pas sur que le loading soit nécessaire mais ça peut généralement être mieux d'en avoir un pour pas trop casser l'affichage

      })
  };
  const transformDateToFr = (date: string) => {
    return new Date(date).toLocaleDateString("fr")
  }
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <div className='font-wbz'>
      <main className="mx-auto">
        {/* home */}
        <div className="text-center relative w-screen h-screen">
          <video className='w-full h-full object-cover' autoPlay loop muted >
            <source src='/hobbit.mp4' />
          </video>
          <div className='absolute top-0 left-0 w-full h-full'>
            <div className='h-full flex flex-col justify-center items-center'>
              <div className='bg-slate-700 bg-opacity-80 rounded-3xl py-4 lg:py-8 px-2 mx-2 my-4'>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 ">
                  <span className="block xl:inline text-slate-200">Hellooooow ! </span>
                  <span className="block text-slate-200 xl:inline">Bienvenue dans la taverne !</span>
                </h1>
                <p className="mx-auto mt-3 max-w-md text-lg sm:text-xl text-slate-200 md:mt-5 md:max-w-4xl lg:text-2xl">
                  Je suis Zeylda, passionnee par les jeux videos depuis le plus jeune age. J'aime partager mon univers, qui est fait de fantaisie, d'humour, de bonne humeur et d'un brin de folie
                  <br />
                  Mon reve est de pouvoir streamer a plein temps, et je compte bien y arriver !
                  <br />
                  Je joue principalement a World of Warcraft cependant j'aime m'aventurer sur d'autres styles de jeu.
                  <br />
                  Je stream en general cinq fois par semaine.
                  Nous sommes une communaute +18.
                </p>
                <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <a href='https://www.twitch.tv/zeylda' target="_blank" className='justify-center heartbeat'>
                      <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-xl lg:text-2xl font-medium text-slate-200 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <i className="ri-twitch-fill mr-2"></i>
                        <span className='flex'>
                          <span className="">Mon Live</span>
                          {status === 'live' &&
                            <div id="center-div">
                              <div className="bubble">
                                <span className="bubble-outer-dot">
                                  <span className="bubble-inner-dot"></span>
                                </span>
                              </div>
                            </div>
                          }
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='absolute top-0'>
            <Header />
          </div>
          <div className="absolute bottom-10 left-0 sm:animate-bounce w-full h-40">
            <div className='h-full flex flex-col justify-end items-center text-4xl sm:text-6xl text-white cursor-pointer'>
              <Link activeClass="active"
                to="stat"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                <i className="ri-arrow-down-circle-fill"></i>
              </Link>
            </div>
          </div>
        </div>
        {/* stats and planning */}
        <div id='the-stream' className=' font-twitch bg-twitch h-screen w-screen'>
          {/* planning */}
          <div id="planning" className="mx-auto py-4 px-4 sm:px-6 lg:px-8 h-1/2 sd:h-2/3">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Planning</h2>
            </div>
            <div className="mt-6 lg:mt-20 mx-auto max-w-3xl">
              <Image className="h-full w-full rounded-3xl lg:hover:scale-125 planning-png" src={planning} alt="" />
            </div>
          </div>
          {/* stats */}
          <div id="stat" className="lg:mt-20 h-1/2 sd:h-1/3">
            <div className="mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-3xl">Le stream en chiffre !</h2>
              </div>
              <dl className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
                <div className="flex flex-col">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">Nombre total de vue</dt>
                  <dd className="order-1 text-2xl lg:text-3xl font-bold tracking-tight text-white">{totalView}</dd>
                </div>
                <div className="mt-10 flex flex-col sm:mt-0">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">Nombre total de followers</dt>
                  <dd className="order-1 text-2xl lg:text-3xl font-bold tracking-tight text-white">{totalFollower}</dd>
                </div>
                <div className="mt-10 flex flex-col sm:mt-0">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-indigo-200">1er live</dt>
                  <dd className="order-1 text-2xl lg:text-3xl font-bold tracking-tight text-white">03/11/2020</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        {/* replay */}
        <div id='replays' className="h-screen w-screen bg-replay bg-cover">
          <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <p className="text-center text-3xl font-semibold text-slate-300">Mes replays</p>
            <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
              {lastVideos && lastVideos.map((el, index) => (
                <div key={index} className="relative">
                  <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    <Image src={el.image_url} width={800} height={800} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                    <button type="button" className="absolute inset-0 focus:outline-none">
                      <span className="sr-only">View details for IMG_4985.HEIC</span>
                    </button>
                  </div>
                  <p className="pointer-events-none mt-2 block truncate font-sans font-medium text-gray-900">{el.title}</p>
                  <p className="pointer-events-none block text-sm font-sans font-medium text-gray-500">Publié le : {transformDateToFr(el.published_at)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WOW */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-red-700">
          WOW
        </div>
        {/* Modos */}
        <div id="moderator" className="bg-tb bg-cover bg-no-repeat">
          <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              <div className="space-y-5 sm:space-y-4">
                <h2 className="text-3xl text-center font-bold tracking-tight sm:text-4xl text-amber-400 bg-opacity-90 bg-slate-900 rounded-3xl p-2">Les gardiens de la taverne</h2>
              </div>
              <div className="lg:col-span-2">
                <ul role="list" className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
                  {moderators.map((moderator, index) => (
                    <li key={index}>
                      <div className="flex items-center space-x-4 lg:space-x-6 bg-slate-900 bg-opacity-90 rounded-3xl p-2">
                        <Image className="h-16 w-16 rounded-full lg:h-20 lg:w-20" src={moderator.avatar} alt="" />
                        <div className="space-y-1 text-2xl font-medium leading-6 text-amber-400">
                          <h3>{moderator.name}</h3>
                          <p className="text-amber-400 text-lg">{moderator.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}

                </ul>
              </div>
            </div>
          </div>
        </div>
      </main >
      <footer className="bg-slate-900">
        <div className="mx-auto max-w-7xl py-4 px-2 sm:px-4 md:flex md:items-center md:justify-between lg:px-6">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-white hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>

            <a href="#" className="text-white hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>

            <a href="#" className="text-white hover:text-gray-500">
              <span className="sr-only">Youtube</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>

            <a href="#" className="text-white hover:text-gray-500">
              <span className="sr-only">Mail</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-base text-white">&copy; 2022 Zeylda, tous droits reserves, by Jahno</p>
          </div>
        </div>
      </footer>

    </div >
  )
}

export default Home
