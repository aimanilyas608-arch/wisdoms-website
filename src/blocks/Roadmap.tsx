import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'

type Props = {
  eyebrow?: string
  heading: string
  intro?: string
  steps: { label: string; title: string; description?: string }[]
  layout?: 'horizontal' | 'vertical' | 'timeline'
}

export default function Roadmap({ eyebrow, heading, intro, steps, layout = 'horizontal' }: Props) {
  return (
    <Section bg="ivory">
      <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} align="center" />
      {layout === 'horizontal' && (
        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={i} className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/5">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">{s.label}</span>
              <h3 className="mt-3 font-semibold text-charcoal">{s.title}</h3>
              {s.description && (
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{s.description}</p>
              )}
            </li>
          ))}
        </ol>
      )}
      {layout === 'vertical' && (
        <ol className="mt-12 space-y-6">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-4 rounded-2xl bg-white p-6 ring-1 ring-charcoal/5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold">{s.label}</span>
                <h3 className="mt-1 font-semibold text-charcoal">{s.title}</h3>
                {s.description && <p className="mt-1 text-sm text-charcoal/70">{s.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}
      {layout === 'timeline' && (
        <div className="relative mt-12">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-purple/20 md:left-1/2" aria-hidden />
          <ol className="space-y-8">
            {steps.map((s, i) => (
              <li
                key={i}
                className={cn('relative flex flex-col md:flex-row', i % 2 === 0 ? 'md:justify-start' : 'md:justify-end')}
              >
                <div className="ml-12 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold">{s.label}</span>
                  <h3 className="mt-1 font-semibold text-charcoal">{s.title}</h3>
                  {s.description && <p className="mt-1 text-sm text-charcoal/70">{s.description}</p>}
                </div>
                <span
                  className="absolute left-2 top-1 h-5 w-5 rounded-full border-4 border-ivory bg-purple md:left-1/2 md:-translate-x-1/2"
                  aria-hidden
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </Section>
  )
}