import Image from 'next/image'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'

type Props = {
  eyebrow?: string
  heading?: string
  leftType?: 'richText' | 'image' | 'list'
  leftRichText?: any
  leftImage?: any
  leftList?: { text: string }[]
  rightType?: 'richText' | 'image' | 'list'
  rightRichText?: any
  rightImage?: any
  rightList?: { text: string }[]
  ratio?: '50-50' | '60-40' | '40-60'
}

function Column({ type, richText, image, list }: any) {
  if (type === 'image' && image?.url) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image src={image.url} alt={image.alt ?? ''} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
    )
  }
  if (type === 'list' && list) {
    return (
      <ul className="space-y-3">
        {list.map((it: any, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1 text-gold" aria-hidden>✓</span>
            <span className="text-charcoal/80">{it.text}</span>
          </li>
        ))}
      </ul>
    )
  }
  if (richText) {
    return (
      <LexicalRichText
        data={richText}
        className="prose max-w-none prose-headings:font-bold prose-headings:text-charcoal prose-p:text-charcoal/80 prose-a:text-purple"
      />
    )
  }
  return null
}

export default function TwoColumn(p: Props) {
  const gridCols = {
    '50-50': 'md:grid-cols-2',
    '60-40': 'md:grid-cols-[3fr_2fr]',
    '40-60': 'md:grid-cols-[2fr_3fr]',
  }[p.ratio ?? '50-50']

  return (
    <Section>
      {(p.heading || p.eyebrow) && (
        <div className="mx-auto mb-12 max-w-3xl text-center">
          {p.eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">{p.eyebrow}</p>
          )}
          {p.heading && (
            <h2 className="text-3xl font-bold tracking-tight text-charcoal md:text-4xl">{p.heading}</h2>
          )}
        </div>
      )}
      <div className={cn('grid gap-10 md:gap-14', gridCols)}>
        <Column type={p.leftType} richText={p.leftRichText} image={p.leftImage} list={p.leftList} />
        <Column type={p.rightType} richText={p.rightRichText} image={p.rightImage} list={p.rightList} />
      </div>
    </Section>
  )
}