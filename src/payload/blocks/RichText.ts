import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich Text', plural: 'Rich Text' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'content', type: 'richText', editor: lexicalEditor(), required: true },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'prose',
      options: ['prose', 'wide', 'full'],
    },
  ],
}