'use client'
import type { UseFormRegister } from 'react-hook-form'

export function FieldRenderer({
  field,
  register,
  error,
}: {
  field: any
  register: UseFormRegister<any>
  error?: string
}) {
  const base =
    'w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20'

  const label = (
    <label className="mb-2 block text-sm font-medium text-charcoal">
      {field.label}
      {field.required && <span className="text-gold"> *</span>}
    </label>
  )

  const err = error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null

  if (field.type === 'textarea') {
    return (
      <div>
        {label}
        <textarea {...register(field.name)} placeholder={field.placeholder} rows={5} className={base} />
        {err}
      </div>
    )
  }

  if (field.type === 'select') {
    return (
      <div>
        {label}
        <select {...register(field.name)} className={base}>
          <option value="">Select…</option>
          {(field.options ?? []).map((o: any, i: number) => (
            <option key={i} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {err}
      </div>
    )
  }

  if (field.type === 'checkbox') {
    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={field.name}
          {...register(field.name)}
          className="mt-1 h-5 w-5 rounded border-charcoal/20 text-purple focus:ring-purple"
        />
        <label htmlFor={field.name} className="text-sm text-charcoal">
          {field.label}
          {field.required && <span className="text-gold"> *</span>}
        </label>
        {err}
      </div>
    )
  }

  return (
    <div>
      {label}
      <input
        type={field.type}
        {...register(field.name)}
        placeholder={field.placeholder}
        className={base}
      />
      {err}
    </div>
  )
}