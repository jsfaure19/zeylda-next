import type { NextPage } from 'next'
import Image from 'next/future/image'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Header } from '../components/Header'

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
    { icon: "ri-twitch-fill", href: "https://www.twitch.tv/zeylda", title: 'Mon live', color: 'bg-indigo-600' },
    { icon: "ri-twitter-fill", href: "https://twitter.com/ZeyldaStream", title: 'Twitter', color: 'bg-blue-400' },
    { icon: "ri-instagram-fill", href: "https://www.instagram.com/zeylda13", title: 'Instagram', color: 'bg-pink-700' },
    { icon: "ri-youtube-fill", href: "https://www.youtube.com/channel/UCQnE0xuiOMGw95tZrNOdzsw", title: 'Youtube', color: 'bg-red-600' },
    { icon: "ri-discord-fill", href: "https://discord.com/invite/cVKwp928VA", title: 'Discord', color: 'bg-indigo-700' },
    { icon: "ri-tiktok-fill", href: "https://www.tiktok.com/@zeyldastream", title: 'Tiktok', color: 'bg-pink-500'}
  ]
  const moderators = [
    { name: "Petitsablet", avatar: require('../images/moderators/sabli.gif') },
    { name: "Jahno", avatar: require('../images/moderators/geng.gif') },
    { name: "Fafafox", avatar: require('../images/moderators/fafa.gif') },
    { name: "Devilman", avatar: require('../images/moderators/devil.gif') },
  ]
  const [status, setStatus] = useState<string>('offline')
  const [totalFollower, setTotalFollower] = useState<string>('en cours de calcul')
  const [lastVideos, setLastVideos] = useState<videoDataType[]>([])
  const [hoursWatched, setHoursWatched] = useState<string>('en cours de calcul')
  const fetchData = async () => {
    axios.get('https://twitchtracker.com/api/channels/summary/zeylda')
      .then(response => {
        setHoursWatched(response.data.hours_watched)
      })
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

        // get streamer total follower
        await api.get('https://api.twitch.tv/helix/channels/followers?broadcaster_id=421475350')
          .then(response => {
            setTotalFollower(response.data.total)
          })
        // get streamer last videos
        const fetchedApi = await api.get('https://api.twitch.tv/helix/videos?user_id=421475350&first=3').then(response => response.data.data)
        // get all videos pictures url => ici le résultat nous renvoie un array avec tous les url
        if (fetchedApi.length > 0) {
          const getAllVideosUrl = await Promise.all(fetchedApi.map(async (el: videoDataType) => {
            return await api.get(`https://api.twitch.tv/helix/games?name=${el.description}`)
              .then(response => {
                let urlFinal = (response.data.data[0].box_art_url.replace('{width}', 800)).replace('{height}', 800)
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
    <div className='tracking-wide'>
      <main className="mx-auto">
        {/* background */}
        <div className="text-center fixed w-screen h-screen font-nature">
          <video className='w-full h-full object-cover 2xl:object-fill' autoPlay muted loop>
            <source src='EnchantedRetreat.mp4' />
          </video>
        </div>
        <div className='absolute '>
          {/* home */}
          <div className='w-screen mt-20 sm:mt-64 font-nature'>
            <div className='w-full h-full'>
              <div className='h-full flex flex-col justify-center items-center'>
                <div className='bg-green-700 bg-opacity-80 rounded-3xl py-4 lg:py-8 px-4 my-4'>
                  <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-gray-900 ">
                    <span className="block xl:inline text-slate-200 tracking-wide">Hellooooow ! </span>
                    <span className="block text-slate-200 xl:inline tracking-wide">Bienvenue dans la taverne !</span>
                  </h1>
                  <p className=" text-justify mx-auto font-basic mt-3 max-w-md text-lg sm:text-xl text-slate-200 md:mt-5 md:max-w-4xl lg:text-2xl">
                    Je suis Zeylda, passionnée par les jeux vidéos depuis le plus jeune age. J&apos;aime partager mon univers, qui est fait de fantaisie, d&apos;humour, de bonne humeur et d&apos;un brin de folie
                    <br />
                    Mon rêve est de pouvoir streamer à plein temps, et je compte bien y arriver !
                    <br />
                    Je joue principalement à World of Warcraft cependant j&apos;aime m&apos;aventurer sur d&apos;autres styles de jeu.
                    <br />
                    Je stream en général cinq fois par semaine.
                  </p>
                  <div className="mx-auto mt-5 grid grid-cols-2 sm:grid-cols-3 sm:justify-items-center md:mt-8">
                    {socialNetworks.map((sn, index) => (
                      <div key={index} className="mx-2 my-2 rounded-md sd:shadow">
                        <a href={sn.href} target="_blank" rel="noreferrer" className='justify-center heartbeat'>
                          <button type="button" className={sn.color + " w-44 inline-flex items-center rounded-md border border-transparent px-6 py-3 text-xl lg:text-2xl font-medium text-slate-200 shadow-sm hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"}>
                            <i className={sn.icon + ' mr-2'}></i>
                            <span className='flex'>
                              <span className="font-basic -mt-2">{sn.title}</span>
                              {sn.title === 'Mon live' && status === 'live' &&
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='absolute top-0 text-slate-200'>
              <Header />
            </div>
          </div>
          {/* stats and planning */}
          <div id='the-stream' className='font-nature mt-10 sm:mt-40 w-screen'>
            {/* planning */}
            {/* <div id="planning" className="mx-auto py-4 px-4 sm:px-6 lg:px-8 hd-1/2 sd:h-2/3">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl pt-10 font-bold tracking-wide text-white sm:text-4xl">Planning</h2>
              </div>
              <div className="mt-4 lg:mt-20 mx-auto max-w-3xl">
                <Image className="h-full w-full rounded-3xl planning-png" src={planning} alt="" />
              </div>
            </div> */}
            {/* stats */}
            <div id="stat" className="h-1/2 sd:h-1/3">
              <div className="mx-auto px-4 sm:py-1 sm:px-6 lg:px-8 ">
                <div className="mx-auto max-w-4xl text-center">
                  <h2 className="text-2xl font-bold tracking-wide neonText sm:text-4xl">Le stream en chiffres !</h2>
                </div>
                <dl className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8 bg-green-700 bg-opacity-80 rounded-xl p-2">
                  <div className="flex flex-col">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-slate-200">Heures regardées</dt>
                    <dd className="font-serif order-1 text-2xl lg:text-3xl font-bold tracking-wide text-slate-200">{hoursWatched}</dd>
                  </div>
                  <div className="mt-10 flex flex-col sm:mt-0">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-slate-200">Nombre total de followers</dt>
                    <dd className="font-serif order-1 text-2xl lg:text-3xl font-bold tracking-wide text-slate-200">{totalFollower}</dd>
                  </div>
                  <div className="mt-10 flex flex-col sm:mt-0">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-slate-200">Premier live</dt>
                    <dd className="font-serif order-1 text-2xl lg:text-3xl font-bold tracking-wide text-slate-200">03/11/2020</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          {/* replay */}
          <div id='replays' className=" w-screen mt-10 sm:mt-40 font-nature">
            <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
              <p className="text-center text-2xl sm:text-4xl font-semibold  neonText">Mes derniers streams</p>
              <div className="flex items-center flex-col mt-6 lg:mt-8 font-sans">
                {lastVideos && lastVideos.map((el, index) => (
                  <a key={index} href={el.url} target="_blank" rel="noreferrer" className="opacity-90 w-full my-4 flex flex-row md:items-center bg-green-800 rounded-lg border shadow-md md:flex-row md:w-3/4 hover:bg-gray-100 dark:border-green-700 dark:bg-green-800 dark:hover:bg-green-700">
                    <Image className="opacity-100 sd:object-cover h-auto w-36 rounded-t-lg rounded-bl-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={el.image_url} width={800} height={800} alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 md:text-xl font-bold tracking-wide text-gray-900 dark:text-white">{el.title}</h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Publié le : {transformDateToFr(el.published_at)}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Modos */}
          <div id="moderator" className=" w-screen mt-10 sm:mt-40 font-nature">
            <div className="mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
              <div className="space-y-12">
                <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                  <h2 className="text-2xl sm:text-4xl neonText">Les modos</h2>
                </div>
                <ul role="list" className="mx-auto grid grid-cols-3 sm:gap-16 lg:max-w-5xl lg:grid-cols-3">
                  {moderators.map((moderator, index) => (
                    <li key={index} className='mt-5'>
                      <div className="space-y-6">
                        <Image className="mx-auto h-20 sm:h-40 w-20 sm:w-40 rounded-full" src={moderator.avatar} alt="" />
                        <div className="space-y-2">
                          <div className="space-y-1 text-3xl sd:text-3xl font-medium leading-6 neonText">
                            <h3>{moderator.name}</h3>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
          <footer className="font-nature">
            <div className="mx-auto max-w-7xl py-4 px-2 sm:px-4 md:flex md:items-center md:justify-between lg:px-6">
              <div className="mt-8 md:order-1 md:mt-0">
                <p className="text-center text-base text-white"><span className='font-serif'>&copy;{new Date().getFullYear()}</span> Zeylda, tous droits reserves, by Jahno</p>
              </div>
            </div>
          </footer>
        </div>
      </main >
    </div >
  )
}

export default Home
