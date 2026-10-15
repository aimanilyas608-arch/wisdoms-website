import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'

type Props = {
  eyebrow?: string
  heading: string
  intro?: string
  items: { number?: string; title: string; description?: string }[]
  columns?: '2' | '3' | '4'
  style?: 'numbered' | 'plain' | 'cards'
}

export default function KPIList({ eyebrow, heading, intro, items, columns = '3', style = 'numbered' }: Props) {
  const cols = {
    '2': 'sm:grid-cols-2',
    '3': 'sm:grid-cols-2 lg:grid-cols-3',
    '4': 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} align="center" />
      <ol className={cn('mt-12 grid grid-cols-1 gap-5', cols)}>
        {items.map((item, i) => {
          const num = item.number ?? String(i + 1).padStart(2, '0')
          if (style === 'cards') {
            return (
              <li key={i} className="rounded-2xl bg-ivory p-6">
                <span className="text-sm font-bold text-gold">{num}</span>
                <h3 className="mt-2 font-semibold text-charcoal">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-charcoal/70">{item.description}</p>
                )}
              </li>
            )
          }
          if (style === 'plain') {
            return (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 font-mono text-sm text-purple">{num}</span>
                <div>
                  <h3 className="font-semibold text-charcoal">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-charcoal/70">{item.description}</p>
                  )}
                </div>
              </li>
            )
          }
          return (
            <li key={i} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                {num}
              </span>
              <div className="pt-1">
                <h3 className="font-semibold text-charcoal">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-charcoal/70">{item.description}</p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}