'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FieldRenderer } from './FieldRenderer'

export function DynamicForm({ form }: { form: any }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [reference, setReference] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  async function onSubmit(data: Record<string, unknown>) {
    setStatus('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formSlug: form.slug, data }),
      })
      if (!res.ok) throw new Error()
      const json = await res.json()
      setReference(json.reference)
      setStatus('done')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl bg-ivory p-8 text-center">
        <h3 className="text-xl font-semibold text-purple">Thank you — we received your request.</h3>
        <p className="mt-2 text-charcoal/70">
          Your reference number is <strong>{reference}</strong>. Our team will contact you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {(form.fields ?? []).map((f: any) => (
        <div key={f.name} className={f.width === 'half' ? 'md:col-span-1' : 'md:col-span-2'}>
          <FieldRenderer field={f} register={register} error={errors[f.name]?.message as string} />
        </div>
      ))}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-xl bg-purple px-6 py-3 font-semibold text-white transition hover:bg-purple-dark disabled:opacity-50 md:w-auto"
        >
          {status === 'sending' ? 'Sending…' : form.submitLabel || 'Submit'}
        </button>
      </div>
      {status === 'error' && (
        <p className="md:col-span-2 text-sm text-red-600">
          Something went wrong. Please try again or WhatsApp us at +92 307 6480890.
        </p>
      )}
    </form>
  )
}