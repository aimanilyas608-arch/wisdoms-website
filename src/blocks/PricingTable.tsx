import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

type Props = {
  eyebrow?: string
  heading: string
  intro?: string
  style?: 'single' | 'tiered' | 'bundle'
  price?: string
  period?: string
  totalNote?: string
  features?: { text: string }[]
  tiers?: any[]
  originalPrice?: string
  savings?: string
  primaryCta?: { label?: string; href?: string }
  secondaryCta?: { label?: string; href?: string }
  disclaimer?: string
}

export default function PricingTable(p: Props) {
  return (
    <Section bg="purple">
      <SectionHeading eyebrow={p.eyebrow} heading={p.heading} intro={p.intro} align="center" tone="light" />

      {p.style === 'single' && (
        <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-white p-8 shadow-xl md:p-10">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-purple md:text-5xl">{p.price}</span>
            {p.period && <span className="text-charcoal/60">{p.period}</span>}
          </div>
          {p.totalNote && <p className="mt-2 text-sm text-charcoal/60">{p.totalNote}</p>}
          {p.features && (
            <ul className="mt-8 space-y-3">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="mt-1 h-5 w-5 shrink-0 text-gold" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-charcoal/80">{f.text}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {p.primaryCta?.label && p.primaryCta.href && (
              <Button href={p.primaryCta.href} label={p.primaryCta.label} variant="primary" size="lg" />
            )}
            {p.secondaryCta?.label && p.secondaryCta.href && (
              <Button href={p.secondaryCta.href} label={p.secondaryCta.label} variant="ghost" size="lg" />
            )}
          </div>
        </div>
      )}

      {p.style === 'tiered' && p.tiers && (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {p.tiers.map((t, i) => (
            <div
              key={i}
              className={cn(
                'flex flex-col rounded-3xl p-8 shadow-lg',
                t.highlighted ? 'bg-white ring-4 ring-gold' : 'bg-white/95',
              )}
            >
              {t.highlighted && (
                <span className="mb-3 inline-block w-fit rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-charcoal">
                  Recommended
                </span>
              )}
              <h3 className="text-xl font-bold text-charcoal">{t.name}</h3>
              {t.description && <p className="mt-1 text-sm text-charcoal/60">{t.description}</p>}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-purple">{t.price}</span>
                {t.period && <span className="text-sm text-charcoal/50">{t.period}</span>}
              </div>
              {t.features && (
                <ul className="mt-6 flex-1 space-y-2">
                  {t.features.map((f: any, j: number) => (
                    <li key={j} className="text-sm text-charcoal/75">• {f.text}</li>
                  ))}
                </ul>
              )}
              {t.ctaLabel && t.ctaHref && (
                <Button
                  href={t.ctaHref}
                  label={t.ctaLabel}
                  variant={t.highlighted ? 'primary' : 'ghost'}
                  className="mt-6 w-full"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {p.style === 'bundle' && (
        <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-white p-8 shadow-xl md:p-10">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-4xl font-bold text-purple md:text-5xl">{p.price}</span>
            {p.originalPrice && (
              <span className="text-lg text-charcoal/40 line-through">{p.originalPrice}</span>
            )}
            {p.savings && (
              <span className="rounded-full bg-gold/20 px-3 py-1 text-sm font-bold text-charcoal">
                {p.savings}
              </span>
            )}
          </div>
          {p.features && (
            <ul className="mt-8 space-y-3">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-gold" aria-hidden>✓</span>
                  <span className="text-charcoal/80">{f.text}</span>
                </li>
              ))}
            </ul>
          )}
          {p.primaryCta?.label && p.primaryCta.href && (
            <Button
              href={p.primaryCta.href}
              label={p.primaryCta.label}
              variant="primary"
              size="lg"
              className="mt-8 w-full"
            />
          )}
        </div>
      )}

      {p.disclaimer && (
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-white/60">{p.disclaimer}</p>
      )}
    </Section>
  )
}