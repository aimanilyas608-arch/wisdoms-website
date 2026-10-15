import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'

type Props = {
  eyebrow?: string
  heading?: string
  intro?: string
  items: { title: string; description?: string; icon?: any }[]
  style?: 'cards' | 'numbered-list' | 'icon-grid' | 'checklist'
  columns?: '2' | '3' | '4'
}

export default function FeatureCards({
  eyebrow, heading, intro, items, style = 'cards', columns = '3',
}: Props) {
  const cols = {
    '2': 'sm:grid-cols-2',
    '3': 'sm:grid-cols-2 lg:grid-cols-3',
    '4': 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <Section bg="ivory">
      {(heading || eyebrow) && (
        <SectionHeading eyebrow={eyebrow} heading={heading ?? ''} intro={intro} align="center" />
      )}
      {style === 'cards' && (
        <div className={cn('mt-12 grid grid-cols-1 gap-6', cols)}>
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-charcoal/5">
              {item.icon?.url && (
                <Image src={item.icon.url} alt="" width={40} height={40} className="mb-4" />
              )}
              <h3 className="text-lg font-semibold text-charcoal">{item.title}</h3>
              {item.description && (
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      {style === 'numbered-list' && (
        <ol className={cn('mt-12 grid grid-cols-1 gap-6', cols)}>
          {items.map((item, i) => (
            <li key={i} className="flex gap-4 rounded-2xl bg-white p-6 ring-1 ring-charcoal/5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-charcoal">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-charcoal/70">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
      {style === 'icon-grid' && (
        <div className={cn('mt-12 grid grid-cols-1 gap-8', cols)}>
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              {item.icon?.url && (
                <Image src={item.icon.url} alt="" width={32} height={32} className="mt-1 shrink-0" />
              )}
              <div>
                <h3 className="font-semibold text-charcoal">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-charcoal/70">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {style === 'checklist' && (
        <ul className={cn('mt-12 grid grid-cols-1 gap-3', cols)}>
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 shrink-0 text-purple" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium text-charcoal">{item.title}</span>
                {item.description && <p className="text-sm text-charcoal/70">{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}