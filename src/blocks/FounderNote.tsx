import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

type Props = {
  eyebrow?: string
  heading: string
  quote: string
  photo?: any
  name: string
  role: string
  cta?: { label?: string; href?: string }
  imagePosition?: 'left' | 'right'
}

export default function FounderNote({
  eyebrow, heading, quote, photo, name, role, cta, imagePosition = 'left',
}: Props) {
  return (
    <Section bg="ivory">
      <div
        className={cn(
          'grid items-center gap-10 md:grid-cols-2 md:gap-16',
          imagePosition === 'right' && 'md:[&>*:first-child]:order-2',
        )}
      >
        <div>
          {photo?.url && (
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
              <Image
                src={photo.url}
                alt={photo.alt ?? name}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div>
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-bold tracking-tight text-charcoal md:text-4xl">{heading}</h2>
          <blockquote className="mt-6 border-l-4 border-gold pl-6 text-lg italic leading-relaxed text-charcoal/80">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="mt-6">
            <div className="font-semibold text-charcoal">{name}</div>
            <div className="text-sm text-charcoal/60">{role}</div>
          </div>
          {cta?.label && cta.href && (
            <div className="mt-8">
              <Button href={cta.href} label={cta.label} variant="primary" />
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}