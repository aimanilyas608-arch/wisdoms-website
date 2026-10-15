import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { getPayloadClient } from '@/lib/payload'

type Props = {
  eyebrow?: string
  heading: string
  intro?: string
  source?: 'manual' | 'collection'
  stats?: { value: string; label: string }[]
  disclaimer?: string
  cta?: { label?: string; href?: string }
}

export default async function ImpactStrip({
  eyebrow, heading, intro, source = 'manual', stats: manualStats = [], disclaimer, cta,
}: Props) {
  let stats = manualStats
  if (source === 'collection') {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'impact-stats',
      where: { verified: { equals: true } },
      sort: 'order',
      limit: 12,
    })
    stats = docs.map((d: any) => ({ value: d.value, label: d.label }))
  }

  return (
    <Section bg="ivory">
      <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} align="center" />
      <dl className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-charcoal/5">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block text-3xl font-bold text-purple md:text-4xl">{s.value}</span>
              <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-charcoal/60">
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {disclaimer && <p className="mt-8 text-center text-xs text-charcoal/50">{disclaimer}</p>}
      {cta?.label && cta?.href && (
        <div className="mt-10 flex justify-center">
          <Button href={cta.href} label={cta.label} variant="secondary" />
        </div>
      )}
    </Section>
  )
}