export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = 'left',
  tone = 'dark',
}: {
  eyebrow?: string
  heading: string
  intro?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : ''
  const eyebrowCls = tone === 'light' ? 'text-gold' : 'text-purple'
  const headingCls = tone === 'light' ? 'text-white' : 'text-charcoal'
  const introCls = tone === 'light' ? 'text-white/80' : 'text-charcoal/70'
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && (
        <p className={`mb-3 text-sm font-semibold uppercase tracking-widest ${eyebrowCls}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${headingCls}`}>
        {heading}
      </h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${introCls}`}>{intro}</p>}
    </div>
  )
}