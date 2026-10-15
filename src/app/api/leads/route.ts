import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body?.formSlug || typeof body.data !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'forms',
    where: { slug: { equals: body.formSlug } },
    limit: 1,
  })
  const form = docs[0]
  if (!form) return NextResponse.json({ error: 'Unknown form' }, { status: 404 })

  const reference = `WI-${Date.now().toString(36).toUpperCase()}`
  const lead = await payload.create({
    collection: 'leads',
    data: {
      reference,
      formSlug: form.slug,
      data: body.data,
      status: 'new',
      source: req.headers.get('referer') ?? undefined,
    } as any,
  })

  return NextResponse.json({ ok: true, reference: lead.reference }, { status: 201 })
}