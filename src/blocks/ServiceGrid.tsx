import Link from 'next/link'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { getPayloadClient } from '@/lib/payload'
import { cn } from '@/lib/cn'

type Props = {
  eyebrow?: string
  heading: string
  intro?: string
  source?: 'services' | 'toolkits' | 'manual'
  services?: any[]
  toolkits?: any[]
  manualItems?: { title: string; description?: string; price?: string; href?: string; icon?: any }[]
  columns?: '2' | '3' | '4'
  cta?: { label?: string; href?: string }
}

export default async function ServiceGrid({
  eyebrow, heading, intro, source = 'services',
  services, toolkits, manualItems = [], columns = '3', cta,
}: Props) {
  const payload = await getPayloadClient()
  let items: { title: string; description?: string; price?: string; href: string; image?: any }[] = []

  if (source === 'services') {
    const ids = (services ?? []).map((s: any) => (typeof s === 'object' ? s.id : s)).filter(Boolean)
    const { docs } = await payload.find({
      collection: 'services',
      where: ids.length ? { id: { in: ids } } : {},
      sort: 'order',
      limit: 20,
      depth: 2,
    })
    items = docs.map((d: any) => ({
      title: d.title,
      description: d.shortDescription,
      price: d.price,
      href: `/services/${d.slug}`,
      image: d.coverImage,
    }))
  } else if (source === 'toolkits') {
    const ids = (toolkits ?? []).map((s: any) => (typeof s === 'object' ? s.id : s)).filter(Boolean)
    const { docs } = await payload.find({
      collection: 'toolkits',
      where: ids.length ? { id: { in: ids } } : {},
      sort: 'order',
      limit: 20,
      depth: 2,
    })
    items = docs.map((d: any) => ({
      title: d.title,
      description: d.shortDescription,
      price: d.price ? `PKR ${Number(d.price).toLocaleString()}` : undefined,
      href: `/toolkits/${d.slug}`,
      image: d.coverImage,
    }))
  } else {
    items = manualItems.map((m) => ({
      title: m.title,
      description: m.description,
      price: m.price,
      href: m.href ?? '#',
      image: m.icon,
    }))
  }

  const cols = {
    '2': 'sm:grid-cols-2',
    '3': 'sm:grid-cols-2 lg:grid-cols-3',
    '4': 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} align="center" />
      <div className={cn('mt-12 grid grid-cols-1 gap-6', cols)}>
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-charcoal/5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            {item.image?.url && (
              <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
                <Image
                  src={item.image.url}
                  alt={item.image.alt ?? item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-charcoal group-hover:text-purple">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/70">
                  {item.description}
                </p>
              )}
              {item.price && (
                <p className="mt-4 text-sm font-semibold text-gold">{item.price}</p>
              )}
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple">
                View <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
      {cta?.label && cta?.href && (
        <div className="mt-12 flex justify-center">
          <Button href={cta.href} label={cta.label} variant="primary" size="lg" />
        </div>
      )}
    </Section>
  )
}