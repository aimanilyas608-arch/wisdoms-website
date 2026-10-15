import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

type Props = {
  eyebrow?: string
  heading?: string
  content: any
  maxWidth?: 'prose' | 'wide' | 'full'
}

export default function RichTextBlock({ eyebrow, heading, content, maxWidth = 'prose' }: Props) {
  const width = {
    prose: 'max-w-3xl mx-auto',
    wide: 'max-w-5xl mx-auto',
    full: 'w-full',
  }[maxWidth]

  return (
    <Section>
      {(heading || eyebrow) && (
        <SectionHeading eyebrow={eyebrow} heading={heading ?? ''} />
      )}
      <div className={`${width} mt-8`}>
        <LexicalRichText
          data={content}
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-charcoal prose-p:text-charcoal/80 prose-a:text-purple prose-a:underline prose-strong:text-charcoal"
        />
      </div>
    </Section>
  )
}
