import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const revalidate = 60

type Params = { params: Promise<{ slug: string }> }

async function getToolkit(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'toolkits',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return docs[0]
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const t: any = await getToolkit(slug)
  if (!t) return {}
  return {
    title: t.seo?.metaTitle || t.title,
    description: t.seo?.metaDescription || t.shortDescription,
  }
}

export default async function ToolkitPage({ params }: Params) {
  const { slug } = await params
  const t: any = await getToolkit(slug)
  if (!t) notFound()

  return (
    <>
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Toolkit</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            {t.heroHeading}
          </h1>
          {t.heroSubheading && (
            <p className="mt-6 max-w-2xl text-lg text-charcoal/75">{t.heroSubheading}</p>
          )}
        </div>
      </section>

      {t.whatSchoolReceives?.length > 0 && (
        <Section>
          <SectionHeading heading="What the School Receives" />
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.whatSchoolReceives.map((w: any, i: number) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl bg-ivory p-5">
                <span className="mt-1 text-gold" aria-hidden>✓</span>
                <span className="text-charcoal/80">{w.item}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section bg="purple">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center md:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Fee</p>
          <p className="mt-3 text-4xl font-bold text-purple md:text-5xl">
            PKR {Number(t.price).toLocaleString()}
          </p>
          {t.priceLabel && <p className="mt-2 text-sm text-charcoal/60">{t.priceLabel}</p>}
          {t.feeNote && <p className="mt-6 text-charcoal/80">{t.feeNote}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact-us" label="Request Toolkit" size="lg" />
            <Button href="/toolkits" label="Explore Complete Bundle" variant="ghost" size="lg" />
          </div>
        </div>
      </Section>
    </>
  )
}