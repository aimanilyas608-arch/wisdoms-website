import type { Block } from 'payload'

export const LogoStrip: Block = {
  slug: 'logoStrip',
  labels: { singular: 'Logo Strip', plural: 'Logo Strips' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'collection',
      options: [
        { label: 'From Clients collection', value: 'collection' },
        { label: 'Manual selection', value: 'manual' },
      ],
    },
    {
      name: 'clients',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'manual' },
    },
    { name: 'showCity', type: 'checkbox', defaultValue: true },
  ],
}