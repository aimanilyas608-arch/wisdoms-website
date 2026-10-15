import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'

export const AIPrograms: CollectionConfig = {
  slug: 'ai-programs',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'price'], group: 'Content' },
  versions: { drafts: true },
  access: { read: anyone, create: editorsAndUp, update: editorsAndUp, delete: adminOnly },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'heroHeading', type: 'text', required: true },
    { name: 'heroSubheading', type: 'textarea' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'price', type: 'text', admin: { description: 'e.g. "PKR 150,000 per school"' } },
    { name: 'priceNote', type: 'text' },
    { name: 'format', type: 'text', admin: { description: 'e.g. "Three-day on-site training"' } },
    {
      name: 'dayBreakdown',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Day 1 — Leadership"' } },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'deliverables', type: 'array', fields: [{ name: 'item', type: 'textarea' }] },
    { name: 'learningProgression', type: 'array', fields: [{ name: 'item', type: 'textarea' }] },
    { name: 'modules', type: 'array', fields: [{ name: 'title', type: 'text', required: true }] },
    { name: 'certificationNote', type: 'textarea' },
    {
      name: 'ctas',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: ['primary', 'secondary', 'ghost'],
        },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}