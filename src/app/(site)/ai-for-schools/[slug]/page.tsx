import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export const revalidate = 60

type Params = { params: Promise<{ slug: string }> }

async function getProgram(slug: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'ai-programs',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return docs[0]
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const p: any = await getProgram(slug)
  if (!p) return {}
  return {
    title: p.seo?.metaTitle || p.title,
    description: p.seo?.metaDescription || p.shortDescription,
  }
}

export default async function AIProgramPage({ params }: Params) {
  const { slug } = await params
  const p: any = await getProgram(slug)
  if (!p) notFound()

  return (
    <>
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            AI for Schools
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            {p.heroHeading}
          </h1>
          {p.heroSubheading && (
            <p className="mt-6 max-w-2xl text-lg text-charcoal/75">{p.heroSubheading}</p>
          )}
        </div>
      </section>

      {p.dayBreakdown?.length > 0 && (
        <Section>
          <SectionHeading heading="Program Breakdown" />
          <ol className="mt-10 space-y-6">
            {p.dayBreakdown.map((d: any, i: number) => (
              <li key={i} className="rounded-2xl bg-ivory p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  {d.label}
                </span>
                <p className="mt-2 text-charcoal/80">{d.description}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {p.deliverables?.length > 0 && (
        <Section bg="ivory">
          <SectionHeading heading="Complete Program Deliverables" />
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {p.deliverables.map((d: any, i: number) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl bg-white p-5">
                <span className="mt-1 text-gold" aria-hidden>✓</span>
                <span className="text-charcoal/80">{d.item}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {p.modules?.length > 0 && (
        <Section>
          <SectionHeading heading="Modules" />
          <ol className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {p.modules.map((m: any, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="font-mono text-sm text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-charcoal/80">{m.title}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section bg="purple">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center md:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Investment</p>
          <p className="mt-3 text-3xl font-bold text-purple md:text-4xl">{p.price}</p>
          {p.priceNote && <p className="mt-2 text-sm text-charcoal/60">{p.priceNote}</p>}
          {p.certificationNote && (
            <p className="mt-6 text-sm text-charcoal/75">{p.certificationNote}</p>
          )}
          {p.ctas?.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {p.ctas.map((b: any, i: number) => (
                <Button key={i} href={b.href} label={b.label} variant={b.variant} size="lg" />
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  )
}