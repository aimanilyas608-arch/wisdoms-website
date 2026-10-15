import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const revalidate = 60

type Params = { params: Promise<{ category: string }> }

async function getCategory(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'training-categories',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return docs[0]
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params
  const c: any = await getCategory(category)
  if (!c) return {}
  return {
    title: c.seo?.metaTitle || c.title,
    description: c.seo?.metaDescription || c.heroSubheading,
  }
}

export default async function TrainingCategoryPage({ params }: Params) {
  const { category } = await params
  const c: any = await getCategory(category)
  if (!c) notFound()

  const payload = await getPayloadClient()
  const { docs: workshops } = await payload.find({
    collection: 'workshops',
    where: { category: { equals: c.id } },
    sort: 'order',
    limit: 100,
  })

  return (
    <>
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Training Category
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            {c.heroHeading}
          </h1>
          {c.heroSubheading && (
            <p className="mt-6 max-w-2xl text-lg text-charcoal/75">{c.heroSubheading}</p>
          )}
          {c.priceSummary && (
            <p className="mt-6 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-purple">
              {c.priceSummary}
            </p>
          )}
        </div>
      </section>

      {c.flagshipPrograms?.length > 0 && (
        <Section>
          <SectionHeading heading="Flagship Programs" />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {c.flagshipPrograms.map((p: any, i: number) => (
              <div key={i} className="rounded-2xl bg-ivory p-6">
                <h3 className="font-semibold text-charcoal">{p.title}</h3>
                {p.duration && <p className="mt-1 text-sm text-charcoal/60">{p.duration}</p>}
                {p.price && <p className="mt-3 text-lg font-bold text-purple">{p.price}</p>}
                {p.description && <p className="mt-3 text-sm text-charcoal/75">{p.description}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {workshops.length > 0 && (
        <Section bg="ivory">
          <SectionHeading heading="Workshop Catalog" />
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workshops.map((w: any, i: number) => (
              <li key={w.id} className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-charcoal/5">
                <span className="font-mono text-sm text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-medium text-charcoal">{w.title}</h3>
                  {w.description && <p className="mt-1 text-sm text-charcoal/70">{w.description}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {c.whatParticipantsReceive && (
        <Section>
          <SectionHeading heading="What Participants Receive" intro={c.whatParticipantsReceive} />
        </Section>
      )}

      <Section bg="purple">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to book this training?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact-us" label="Register for Workshop" size="lg" />
            <Button href="/contact-us" label="Book Training for Your School" variant="secondary" size="lg" />
          </div>
        </div>
      </Section>
    </>
  )
}