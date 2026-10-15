import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'

export const Diplomas: CollectionConfig = {
  slug: 'diplomas',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'duration'], group: 'Training' },
  versions: { drafts: true },
  access: { read: anyone, create: editorsAndUp, update: editorsAndUp, delete: adminOnly },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'duration', type: 'text', defaultValue: 'Six months' },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'heroHeading', type: 'text' },
    { name: 'heroSubheading', type: 'textarea' },
    {
      name: 'modules',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'number', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'feeStatus', type: 'text', admin: { description: 'e.g. "Fees to be confirmed"' } },
    { name: 'accreditationNote', type: 'textarea' },
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