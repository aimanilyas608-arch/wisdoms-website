import type { Block } from 'payload'

export const KPIList: Block = {
  slug: 'kpiList',
  labels: { singular: 'KPI List', plural: 'KPI Lists' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'number', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'numbered',
      options: [
        { label: 'Numbered', value: 'numbered' },
        { label: 'Plain', value: 'plain' },
        { label: 'Cards', value: 'cards' },
      ],
    },
  ],
}