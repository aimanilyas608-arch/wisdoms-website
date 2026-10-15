import { cn } from '@/lib/cn'

export function Section({
  children,
  className,
  bg = 'default',
  id,
}: {
  children: React.ReactNode
  className?: string
  bg?: 'default' | 'ivory' | 'purple' | 'charcoal'
  id?: string
}) {
  const bgCls = {
    default: 'bg-white',
    ivory: 'bg-ivory',
    purple: 'bg-purple text-white',
    charcoal: 'bg-charcoal text-white',
  }[bg]
  return (
    <section id={id} className={cn('py-16 md:py-24', bgCls, className)}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  )
}