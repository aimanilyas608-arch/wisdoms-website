import type { Block } from 'payload'

export const ImpactStrip: Block = {
  slug: 'impactStrip',
  labels: { singular: 'Impact Strip', plural: 'Impact Strips' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Manual entries', value: 'manual' },
        { label: 'From Impact Stats collection', value: 'collection' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      admin: { condition: (_, s) => s?.source === 'manual' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    { name: 'disclaimer', type: 'textarea' },
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
