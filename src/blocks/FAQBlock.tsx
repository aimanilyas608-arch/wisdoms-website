'use client'
import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'

type Props = {
  heading: string
  intro?: string
  items: { question: string; answer: string }[]
}

export default function FAQBlock({ heading, intro, items }: Props) {
  const [open, setOpen] = useState<number | null>(0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  }

  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeading heading={heading} intro={intro} align="center" />
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-charcoal/10 rounded-2xl bg-white ring-1 ring-charcoal/5">
        {items.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-charcoal">{item.question}</span>
                <svg
                  className={cn('h-5 w-5 shrink-0 text-purple transition', isOpen && 'rotate-45')}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
              </button>
              <div className={cn('grid overflow-hidden transition-all duration-300', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-charcoal/75">{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}