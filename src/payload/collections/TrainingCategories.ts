import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'

export const TrainingCategories: CollectionConfig = {
  slug: 'training-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'priceSummary', 'order'],
    group: 'Training',
  },
  versions: { drafts: true },
  access: {
    read: anyone,
    create: editorsAndUp,
    update: editorsAndUp,
    delete: adminOnly,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'audience', type: 'text', admin: { description: 'e.g. "School Leaders & Principals"' } },
    { name: 'heroHeading', type: 'text', required: true },
    { name: 'heroSubheading', type: 'textarea' },
    { name: 'priceSummary', type: 'text', admin: { description: 'e.g. "12 one-day topics · PKR 4,900/person"' } },
    {
      name: 'pricing',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "One-Day Seat"' } },
        { name: 'price', type: 'text', required: true },
        { name: 'note', type: 'text' },
      ],
    },
    {
      name: 'flagshipPrograms',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'duration', type: 'text' },
        { name: 'price', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'workshops',
      type: 'relationship',
      relationTo: 'workshops',
      hasMany: true,
      admin: { description: 'Assign individual workshop records to this category' },
    },
    { name: 'whatParticipantsReceive', type: 'textarea' },
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