import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getPayloadClient } from '@/lib/payload'

type Props = {
  eyebrow?: string
  heading: string
  intro?: string
  testimonials?: any[]
}

export default async function TestimonialSlider({
  eyebrow, heading, intro, testimonials,
}: Props) {
  const payload = await getPayloadClient()
  const ids = (testimonials ?? [])
    .map((t: any) => (typeof t === 'object' ? t.id : t))
    .filter(Boolean)

  const { docs } = await payload.find({
    collection: 'testimonials',
    where: ids.length
      ? { and: [{ id: { in: ids } }, { approved: { equals: true } }] }
      : { approved: { equals: true } },
    sort: 'order',
    limit: 20,
    depth: 2,
  })

  if (!docs.length) return null

  return (
    <Section bg="ivory">
      <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} align="center" />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((t: any, i: number) => (
          <figure
            key={i}
            className="flex h-full flex-col rounded-2xl bg-white p-8 ring-1 ring-charcoal/5"
          >
            <blockquote className="flex-1 text-charcoal/85">
              <p className="text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4 border-t border-charcoal/10 pt-6">
              {t.photo?.url && (
                <Image
                  src={t.photo.url}
                  alt={t.author}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-semibold text-charcoal">{t.author}</div>
                {(t.role || t.school) && (
                  <div className="text-sm text-charcoal/60">
                    {[t.role, t.school].filter(Boolean).join(', ')}
                  </div>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}