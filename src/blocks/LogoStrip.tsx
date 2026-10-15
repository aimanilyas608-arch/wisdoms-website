import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getPayloadClient } from '@/lib/payload'

type Props = {
  heading?: string
  intro?: string
  source?: 'collection' | 'manual'
  clients?: any[]
  showCity?: boolean
}

export default async function LogoStrip({
  heading, intro, source = 'collection', clients: manual = [], showCity = true,
}: Props) {
  let items: any[] = []
  if (source === 'collection') {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'clients',
      where: { consentOnFile: { equals: true } },
      sort: 'name',
      limit: 60,
      depth: 1,
    })
    items = docs
  } else {
    items = manual
  }

  if (!items.length) return null

  return (
    <Section>
      {heading && <SectionHeading heading={heading} intro={intro} align="center" />}
      <ul className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((c, i) => (
          <li key={i}>
            <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-ivory p-6 text-center">
              {c.logo?.url ? (
                <Image
                  src={c.logo.url}
                  alt={c.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className="text-sm font-semibold text-purple">{c.name}</span>
              )}
              <div>
                <div className="text-sm font-medium text-charcoal">{c.name}</div>
                {showCity && c.city && <div className="text-xs text-charcoal/50">{c.city}</div>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}