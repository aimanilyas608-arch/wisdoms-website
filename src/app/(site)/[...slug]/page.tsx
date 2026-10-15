import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { BlockRenderer } from '@/components/BlockRenderer'

export const revalidate = 60

type Params = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const path = slug.join('/')
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: path }, status: { equals: 'published' } },
    limit: 1,
  })
  const page = docs[0]
  if (!page) return {}

  const seo = (page as any).seo ?? {}
  return {
    title: seo.metaTitle || (page as any).title,
    description: seo.metaDescription,
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function DynamicPage({ params }: Params) {
  const { slug } = await params
  const path = slug.join('/')

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: path }, status: { equals: 'published' } },
    limit: 1,
    depth: 3,
  })

  const page = docs[0]
  if (!page) notFound()

  if ((page as any).status === 'pending-content') {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">
          Coming Soon
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-charcoal">
          {(page as any).title}
        </h1>
        <p className="mt-6 text-lg text-charcoal/70">
          This page is being prepared. Please check back soon.
        </p>
      </section>
    )
  }

  return <BlockRenderer blocks={(page as any).layout ?? []} />
}