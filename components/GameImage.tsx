import Image from 'next/future/image'
import clsx from 'clsx'
import { StaticImageData } from 'next/image'

type GameImage = {
  image: StaticImageData,
  imageIndex: number
}
export function GameImage({ image, imageIndex }: GameImage) {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
  return (
    <div
      key={image.src}
      className={clsx(
        'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl mr-6',
        rotations[imageIndex % rotations.length]
      )}
    >
      <Image
        src={image}
        alt=""
        sizes="(min-width: 640px) 18rem, 11rem"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>)
}