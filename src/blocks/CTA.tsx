import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

type Props = {
  heading: string
  body?: string
  buttons?: { label: string; href: string; variant?: 'primary' | 'secondary' | 'ghost' }[]
  style?: 'solid' | 'ivory' | 'bordered'
}

export default function CTABlock({ heading, body, buttons = [], style = 'solid' }: Props) {
  const wrap = {
    solid: 'bg-purple text-white',
    ivory: 'bg-ivory text-charcoal',
    bordered: 'bg-white text-charcoal border-2 border-purple',
  }[style]

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className={cn('rounded-3xl p-10 text-center md:p-14', wrap)}>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
          {body && (
            <p
              className={cn(
                'mx-auto mt-4 max-w-2xl text-lg',
                style === 'solid' ? 'text-white/85' : 'text-charcoal/75',
              )}
            >
              {body}
            </p>
          )}
          {buttons.length > 0 && (
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {buttons.map((b, i) => (
                <Button key={i} href={b.href} label={b.label} variant={b.variant ?? 'primary'} size="lg" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}