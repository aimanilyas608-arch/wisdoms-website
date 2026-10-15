import type { CollectionConfig } from 'payload'
import { anyone, editorsAndUp, adminOnly } from '../access'

export const Toolkits: CollectionConfig = {
  slug: 'toolkits',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'price', 'order'],
    group: 'Content',
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
    { name: 'shortDescription', type: 'textarea', required: true },
    { name: 'heroHeading', type: 'text', required: true },
    { name: 'heroSubheading', type: 'textarea' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: { description: 'In PKR, no commas — e.g. 50000' },
    },
    { name: 'priceLabel', type: 'text', admin: { description: 'e.g. "One-time toolkit purchase"' } },
    {
      name: 'whatSchoolReceives',
      type: 'array',
      fields: [{ name: 'item', type: 'textarea', required: true }],
    },
    { name: 'feeNote', type: 'textarea' },
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
    {
      name: 'previewImages',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'bundleEligible',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Exclude custom services from the five-toolkit bundle' },
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