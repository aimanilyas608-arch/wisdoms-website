import type { Block } from 'payload'

export const ServiceGrid: Block = {
  slug: 'serviceGrid',
  labels: { singular: 'Service Grid', plural: 'Service Grids' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'services',
      options: [
        { label: 'Services collection', value: 'services' },
        { label: 'Toolkits collection', value: 'toolkits' },
        { label: 'Manual items', value: 'manual' },
      ],
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'services' },
    },
    {
      name: 'toolkits',
      type: 'relationship',
      relationTo: 'toolkits',
      hasMany: true,
      admin: { condition: (_, s) => s?.source === 'toolkits' },
    },
    {
      name: 'manualItems',
      type: 'array',
      admin: { condition: (_, s) => s?.source === 'manual' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'price', type: 'text' },
        { name: 'href', type: 'text' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
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