'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'

type Props = {
  eyebrow?: string
  heading?: string
  intro?: string
  items: { image: any; caption?: string; alt: string }[]
  columns?: '2' | '3' | '4'
}

export default function Gallery({ eyebrow, heading, intro, items, columns = '3' }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const cols = {
    '2': 'sm:grid-cols-2',
    '3': 'sm:grid-cols-2 lg:grid-cols-3',
    '4': 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <Section>
      {(heading || eyebrow) && (
        <SectionHeading eyebrow={eyebrow} heading={heading ?? ''} intro={intro} align="center" />
      )}
      <div className={cn('mt-12 grid grid-cols-1 gap-4', cols)}>
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative block w-full overflow-hidden rounded-2xl bg-ivory focus:outline-none focus-visible:ring-4 focus-visible:ring-purple/40"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image.url}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            {item.caption && (
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4 text-left text-sm text-white opacity-0 transition group-hover:opacity-100">
                {item.caption}
              </span>
            )}
          </button>
        ))}
      </div>
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-full max-w-5xl">
            <Image
              src={items[lightbox].image.url}
              alt={items[lightbox].alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
            {items[lightbox].caption && (
              <p className="mt-3 text-center text-sm text-white/80">{items[lightbox].caption}</p>
            )}
          </div>
        </div>
      )}
    </Section>
  )
}