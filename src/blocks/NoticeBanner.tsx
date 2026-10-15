import Link from 'next/link'
import { cn } from '@/lib/cn'

type Props = {
  text: string
  variant?: 'info' | 'warning' | 'success' | 'neutral'
  cta?: { label?: string; href?: string }
}

export default function NoticeBanner({ text, variant = 'info', cta }: Props) {
  const styles = {
    info: 'bg-purple/10 text-purple-dark ring-purple/20',
    warning: 'bg-gold/15 text-charcoal ring-gold/30',
    success: 'bg-emerald-50 text-emerald-900 ring-emerald-200',
    neutral: 'bg-ivory text-charcoal ring-charcoal/10',
  }[variant]

  const icons = { info: 'ⓘ', warning: '⚠', success: '✓', neutral: '•' }[variant]

  return (
    <div className="mx-auto my-6 max-w-6xl px-5 md:px-8">
      <div className={cn('flex flex-col items-start gap-3 rounded-2xl p-5 ring-1 sm:flex-row sm:items-center', styles)}>
        <span aria-hidden className="text-lg leading-none">{icons}</span>
        <p className="flex-1 text-sm leading-relaxed">{text}</p>
        {cta?.label && cta.href && (
          <Link
            href={cta.href}
            className="shrink-0 rounded-lg bg-white/70 px-4 py-2 text-sm font-semibold hover:bg-white"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  )
}