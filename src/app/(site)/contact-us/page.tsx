import { getPayloadClient } from '@/lib/payload'
import { DynamicForm } from '@/components/forms/DynamicForm'
import { Section } from '@/components/ui/Section'

export const revalidate = 60

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'forms',
    where: { slug: { equals: 'general-inquiry' } },
    limit: 1,
  })
  const form = docs[0]

  return (
    <>
      <section className="bg-ivory py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Contact Us
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-charcoal md:text-5xl">
            Let's Build a Stronger School Together.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-charcoal/75">
            Tell us what your school needs. We'll route your inquiry to the right team.
          </p>
        </div>
      </section>

      <Section>
        {form ? (
          <DynamicForm form={form} />
        ) : (
          <p className="text-charcoal/60">
            No contact form configured yet. Create one in{' '}
            <a className="text-purple underline" href="/admin">/admin</a> under Forms
            with slug <code>general-inquiry</code>.
          </p>
        )}
      </Section>
    </>
  )
}