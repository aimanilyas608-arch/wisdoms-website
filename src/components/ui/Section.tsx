import { cn } from '@/lib/cn'
import { BackgroundDecor } from './BackgroundDecor'

export function Section({
  children,
  className,
  bg = 'default',
  id,
  decor,
}: {
  children: React.ReactNode
  className?: string
  bg?: 'default' | 'ivory' | 'purple' | 'teal' | 'charcoal'
  id?: string
  decor?: 'hero' | 'section' | 'subtle' | false
}) {
  const bgCls = {
    default: 'bg-white',
    ivory: 'bg-ivory',
    purple: 'bg-purple text-white',
    teal: 'bg-purple text-white',
    charcoal: 'bg-charcoal text-white',
  }[bg]

  // Auto-decorate ivory sections; opt out by passing decor={false}
  const decorate = decor === undefined ? bg === 'ivory' : decor

  return (
    <section id={id} className={cn('relative isolate py-16 md:py-24', bgCls, className)}>
      {decorate && <BackgroundDecor variant={typeof decorate === 'string' ? decorate : 'subtle'} />}
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  )
}