import { cn } from '@/lib/cn'

type Props = {
  variant?: 'hero' | 'section' | 'subtle'
  className?: string
}

export function BackgroundDecor({ variant = 'section', className }: Props) {
  if (variant === 'subtle') {
    return (
      <div
        className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
        aria-hidden
      >
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/5 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-purple/5 blur-3xl animate-float-medium" />
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div
        className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
        aria-hidden
      >
        <div className="absolute inset-0 bg-linear-to-br from-ivory via-white to-purple-light/40 animate-gradient-shift" />

        <div
          className="absolute inset-0 animate-grid-fade"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(91, 44, 142, 0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-purple/15 blur-3xl animate-float-slow" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-gold/15 blur-3xl animate-float-medium" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple/10 blur-3xl animate-drift" />

        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent animate-pulse-soft" />

        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white to-transparent" />
      </div>
    )
  }

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <div className="absolute inset-0 bg-linear-to-b from-white via-purple-light/20 to-white" />

      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(91, 44, 142, 0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-purple/8 blur-3xl animate-float-slow" />
      <div className="absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-gold/8 blur-3xl animate-float-medium" />

      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-purple/30 to-transparent" />
    </div>
  )
}