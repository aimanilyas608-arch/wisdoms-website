import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

type HeroProps = {
  eyebrow?: string
  heading: string
  subheading?: string
  backgroundImage?: any
  overlay?: 'none' | 'light' | 'dark' | 'gradient-purple'
  buttons?: { label: string; href: string; variant?: 'primary' | 'secondary' | 'ghost' }[]
  align?: 'left' | 'center'
  size?: 'compact' | 'medium' | 'large'
}

export default function Hero({
  eyebrow,
  heading,
  subheading,
  backgroundImage,
  overlay = 'none',
  buttons = [],
  align = 'left',
  size = 'large',
}: HeroProps) {
  const hasBg = backgroundImage && typeof backgroundImage === 'object'
  const sizeCls = {
    compact: 'py-16 md:py-20',
    medium: 'py-24 md:py-32',
    large: 'py-28 md:py-40 lg:py-48',
  }[size]

  const overlayCls = {
    none: '',
    light: 'bg-white/70',
    dark: 'bg-charcoal/60',
    'gradient-purple': 'bg-gradient-to-br from-purple/95 via-purple/85 to-charcoal/70',
  }[overlay]

  const tone = hasBg && (overlay === 'dark' || overlay === 'gradient-purple')
  const alignCls = align === 'center' ? 'text-center items-center mx-auto' : ''

  return (
    <section
      className={cn('relative isolate overflow-hidden', !hasBg && 'bg-ivory', sizeCls)}
    >
      {hasBg && (
        <>
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt ?? ''}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className={cn('absolute inset-0', overlayCls)} aria-hidden />
        </>
      )}
      <div className="relative mx-auto flex max-w-6xl flex-col px-5 md:px-8">
        <div className={cn('flex max-w-3xl flex-col', alignCls)}>
          {eyebrow && (
            <p
              className={cn(
                'mb-4 text-sm font-semibold uppercase tracking-widest',
                tone ? 'text-gold' : 'text-purple',
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              'text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl',
              tone ? 'text-white' : 'text-charcoal',
            )}
          >
            {heading}
          </h1>
          {subheading && (
            <p
              className={cn(
                'mt-6 text-lg leading-relaxed md:text-xl',
                tone ? 'text-white/90' : 'text-charcoal/75',
              )}
            >
              {subheading}
            </p>
          )}
          {buttons.length > 0 && (
            <div
              className={cn(
                'mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap',
                align === 'center' && 'justify-center',
              )}
            >
              {buttons.map((b, i) => (
                <Button
                  key={i}
                  href={b.href}
                  label={b.label}
                  variant={tone && b.variant === 'ghost' ? 'secondary' : b.variant ?? 'primary'}
                  size="lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}