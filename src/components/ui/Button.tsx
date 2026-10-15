import Link from 'next/link'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

const styles: Record<Variant, string> = {
  primary: 'bg-purple text-white hover:bg-purple-dark focus-visible:outline-purple',
  secondary: 'bg-gold text-white hover:bg-gold/90 focus-visible:outline-gold',
  ghost: 'bg-transparent text-purple border border-purple/30 hover:bg-purple/5 focus-visible:outline-purple',
}

export function Button({
  href,
  label,
  variant = 'primary',
  size = 'md',
  className,
}: {
  href: string
  label: string
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeCls =
    size === 'lg' ? 'px-8 py-4 text-base' : size === 'sm' ? 'px-4 py-2 text-sm' : 'px-6 py-3'
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2',
        styles[variant],
        sizeCls,
        className,
      )}
    >
      {label}
    </Link>
  )
}