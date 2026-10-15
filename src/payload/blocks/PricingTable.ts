import type { Block } from 'payload'

export const PricingTable: Block = {
  slug: 'pricingTable',
  labels: { singular: 'Pricing Table', plural: 'Pricing Tables' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'single',
      options: [
        { label: 'Single offer', value: 'single' },
        { label: 'Tiered plans', value: 'tiered' },
        { label: 'Bundle offer', value: 'bundle' },
      ],
    },
    { name: 'price', type: 'text', admin: { condition: (_, s) => s?.style !== 'tiered' } },
    { name: 'period', type: 'text', admin: { condition: (_, s) => s?.style !== 'tiered' } },
    { name: 'totalNote', type: 'text', admin: { condition: (_, s) => s?.style === 'single' } },
    {
      name: 'features',
      type: 'array',
      admin: { condition: (_, s) => s?.style !== 'tiered' },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'tiers',
      type: 'array',
      admin: { condition: (_, s) => s?.style === 'tiered' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        { name: 'period', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'features', type: 'array', fields: [{ name: 'text', type: 'text' }] },
        { name: 'highlighted', type: 'checkbox', defaultValue: false },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaHref', type: 'text' },
      ],
    },
    { name: 'originalPrice', type: 'text', admin: { condition: (_, s) => s?.style === 'bundle' } },
    { name: 'savings', type: 'text', admin: { condition: (_, s) => s?.style === 'bundle' } },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
    { name: 'disclaimer', type: 'textarea' },
  ],
}