import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { BlockRenderer } from '@/components/BlockRenderer'

export const revalidate = 60

export default async function HomePage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 3,
  })

  const page = docs[0]

  if (!page) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">
          Wisdoms International
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-charcoal">
          Building Future-Ready Schools.
        </h1>
        <p className="mt-6 text-lg text-charcoal/70">
          Create a Page with slug <code>home</code> in <a href="/admin" className="text-purple underline">/admin</a> to edit this homepage.
        </p>
      </section>
    )
  }

  return <BlockRenderer blocks={(page as any).layout ?? []} />
}