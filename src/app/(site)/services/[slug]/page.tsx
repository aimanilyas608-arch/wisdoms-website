import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const revalidate = 60

type Params = { params: Promise<{ slug: string }> }

async function getService(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return docs[0]
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const s: any = await getService(slug)
  if (!s) return {}
  return {
    title: s.seo?.metaTitle || s.title,
    description: s.seo?.metaDescription || s.shortDescription,
  }
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params
  const s: any = await getService(slug)
  if (!s) notFound()

  return (
    <>
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Service
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            {s.heroHeading}
          </h1>
          {s.heroSubheading && (
            <p className="mt-6 max-w-2xl text-lg text-charcoal/75">{s.heroSubheading}</p>
          )}
          {s.ctas?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {s.ctas.map((b: any, i: number) => (
                <Button key={i} href={b.href} label={b.label} variant={b.variant} size="lg" />
              ))}
            </div>
          )}
        </div>
      </section>

      {s.whatWeDo?.length > 0 && (
        <Section>
          <SectionHeading heading="What We Do" />
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {s.whatWeDo.map((w: any, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 text-gold" aria-hidden>✓</span>
                <span className="text-charcoal/80">{w.item}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {s.howItWorks?.length > 0 && (
        <Section bg="ivory">
          <SectionHeading heading="How It Works" />
          <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {s.howItWorks.map((step: any, i: number) => (
              <li key={i} className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-charcoal">{step.title}</h3>
                {step.description && (
                  <p className="mt-2 text-sm text-charcoal/70">{step.description}</p>
                )}
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section bg="purple">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Investment & Scope
          </p>
          <p className="mt-3 text-3xl font-bold text-purple md:text-4xl">
            {s.price || 'Custom proposal'}
          </p>
          {s.priceNote && <p className="mt-2 text-sm text-charcoal/60">{s.priceNote}</p>}
          {s.scopeNote && <p className="mt-6 text-charcoal/80">{s.scopeNote}</p>}
        </div>
      </Section>

      {s.whoThisIsFor && (
        <Section>
          <SectionHeading heading="Who This Is For" intro={s.whoThisIsFor} />
        </Section>
      )}

      <Section bg="ivory">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">Start Your Project</h2>
          <p className="mt-4 text-charcoal/75">
            Share your school details and what you want to achieve.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact-us" label="Request a Proposal" size="lg" />
            <Button href="/contact-us" label="Book Consultation" variant="ghost" size="lg" />
          </div>
        </div>
      </Section>
    </>
  )
}