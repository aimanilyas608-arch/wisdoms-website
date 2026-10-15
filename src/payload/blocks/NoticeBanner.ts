import type { Block } from 'payload'

export const NoticeBanner: Block = {
  slug: 'noticeBanner',
  labels: { singular: 'Notice Banner', plural: 'Notice Banners' },
  fields: [
    { name: 'text', type: 'textarea', required: true },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Success', value: 'success' },
        { label: 'Neutral', value: 'neutral' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}